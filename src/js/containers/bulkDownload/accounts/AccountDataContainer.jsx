/**
 * AccountDataContainer.jsx
 * Created by Lizzie Salita 4/23/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';

import AccountDataContent from 'components/bulkDownload/accounts/AccountDataContent';

const propTypes = {
    updateDownloadFilter: PropTypes.func,
    clearDownloadFilters: PropTypes.func,
    bulkDownload: PropTypes.object,
    clickedDownload: PropTypes.func
};

export class AccountDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true,
            agencies: {
                cfoAgencies: [],
                otherAgencies: []
            },
            federals: []
        };

        this.agencyListRequest = null;
        this.federalListRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.clearAccountFilters = this.clearAccountFilters.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.setFederalList = this.setFederalList.bind(this);
    }

    componentDidMount() {
        this.setAgencyList();
    }

    setAgencyList() {
        this.setState({
            inFlight: true
        });

        if (this.agencyListRequest) {
            this.agencyListRequest.cancel();
        }

        // perform the API request
        this.agencyListRequest = BulkDownloadHelper.requestAgenciesList({
            agency: 0
        });

        this.agencyListRequest.promise
            .then((res) => {
                const cfoAgencies = res.data.agencies.cfo_agencies;
                const otherAgencies = res.data.agencies.other_agencies;
                this.setState({
                    agencies: {
                        cfoAgencies,
                        otherAgencies
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                this.agencyListRequest = null;
            });
    }

    setFederalList(agencyCode) {
        this.setState({
            inFlight: true
        });

        if (this.federalListRequest) {
            this.federalListRequest.cancel();
        }

        const filters = [];

        const params = {
            field: "agency_identifier",
            operation: "equals",
            value: agencyCode
        };

        filters.push(params);

        this.federalListRequest = BulkDownloadHelper.requestFederalsList({
            filters
        });

        this.federalListRequest.promise
            .then((res) => {
                const federals = res.data.results;
                this.setState({
                    federals
                });
            })
            .catch((err) => {
                console.log(err);
                this.federalListRequest = null;
            });
    }

    updateFilter(name, value) {
        this.props.updateDownloadFilter({
            dataType: 'accounts',
            name,
            value
        });
    }

    clearAccountFilters() {
        this.props.clearDownloadFilters('accounts');
    }

    render() {
        return (
            <AccountDataContent
                accounts={this.props.bulkDownload.accounts}
                federals={this.state.federals}
                setFederalList={this.setFederalList}
                updateFilter={this.updateFilter}
                clearAccountFilters={this.clearAccountFilters}
                agencies={this.state.agencies}
                clickedDownload={this.props.clickedDownload} />
        );
    }
}

AccountDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(AccountDataContainer);

