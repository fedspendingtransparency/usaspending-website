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
            agencies: {
                cfoAgencies: [],
                otherAgencies: []
            },
            federalAccounts: []
        };

        this.agencyListRequest = null;
        this.federalAccountListRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.clearAccountFilters = this.clearAccountFilters.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.setFederalAccountList = this.setFederalAccountList.bind(this);
    }

    componentDidMount() {
        this.setAgencyList();
    }

    setAgencyList() {
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

    setFederalAccountList(agencyCode) {
        if (this.federalAccountListRequest) {
            this.federalAccountListRequest.cancel();
        }

        // This assures that the federalAccounts state will be disabled
        // when all agency is selected
        if (!agencyCode) {
            this.setState({
                federalAccounts: []
            });
            return;
        }
        const filters = [];

        const params = {
            field: "agency_identifier",
            operation: "equals",
            value: agencyCode
        };

        filters.push(params);

        this.federalAccountListRequest = BulkDownloadHelper.requestFederalAccountList({
            filters
        });

        this.federalAccountListRequest.promise
            .then((res) => {
                const federalAccounts = res.data.results;
                this.setState({
                    federalAccounts
                });
            })
            .catch((err) => {
                console.log(err);
                this.federalAccountListRequest = null;
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
                federalAccounts={this.state.federalAccounts}
                setFederalAccountList={this.setFederalAccountList}
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

