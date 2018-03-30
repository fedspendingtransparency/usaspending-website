/**
 * AwardDataContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import { fetchLocationList } from 'helpers/mapHelper';

import AwardDataContent from 'components/bulkDownload/awards/AwardDataContent';

const propTypes = {
    updateDownloadFilter: PropTypes.func,
    updateAwardCheckbox: PropTypes.func,
    clearDownloadFilters: PropTypes.func,
    updateAwardDateRange: PropTypes.func,
    bulkDownload: PropTypes.object,
    clickedDownload: PropTypes.func
};

export class AwardDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true,
            agencies: {
                cfoAgencies: [],
                otherAgencies: []
            },
            subAgencies: [],
            states: []
        };

        this.agencyListRequest = null;
        this.statesRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.clearAwardFilters = this.clearAwardFilters.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.setSubAgencyList = this.setSubAgencyList.bind(this);
        this.loadStates = this.loadStates.bind(this);
    }

    componentDidMount() {
        this.setAgencyList();
        this.loadStates();
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

    setSubAgencyList(id) {
        if (id !== '') {
            this.setState({
                inFlight: true
            });

            if (this.agencyListRequest) {
                this.agencyListRequest.cancel();
            }

            // perform the API request
            this.agencyListRequest = BulkDownloadHelper.requestAgenciesList({
                agency: parseInt(id, 10)
            });

            this.agencyListRequest.promise
                .then((res) => {
                    const subAgencies = res.data.sub_agencies;
                    this.setState({
                        subAgencies
                    }, () => {
                        this.resetSubAgency();
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.agencyListRequest = null;
                });
        }

        else {
            this.setState({
                subAgencies: []
            }, () => {
                this.resetSubAgency();
            });
        }
    }

    loadStates() {
        this.setState({
            inFlight: true
        });

        if (this.statesRequest) {
            this.statesRequest.cancel();
        }

        // perform the API request
        this.statesRequest = fetchLocationList('states');

        this.statesRequest.promise
            .then((res) => {
                this.setState({
                    states: res.data.states
                });
            })
            .catch((err) => {
                console.log(err);
                this.statesRequest = null;
            });
    }

    resetSubAgency() {
        this.updateFilter('subAgency', {
            id: '',
            name: 'Select a Sub-Agency'
        });
    }

    updateFilter(name, value) {
        this.props.updateDownloadFilter({
            dataType: 'awards',
            name,
            value
        });
    }

    updateStartDate(date) {
        this.props.updateAwardDateRange({
            date,
            dateType: 'startDate'
        });
    }

    updateEndDate(date) {
        this.props.updateAwardDateRange({
            date,
            dateType: 'endDate'
        });
    }

    clearAwardFilters() {
        this.props.clearDownloadFilters('awards');
    }

    render() {
        return (
            <AwardDataContent
                awards={this.props.bulkDownload.awards}
                updateAwardCheckbox={this.props.updateAwardCheckbox}
                updateFilter={this.updateFilter}
                updateStartDate={this.updateStartDate}
                updateEndDate={this.updateEndDate}
                clearAwardFilters={this.clearAwardFilters}
                agencies={this.state.agencies}
                subAgencies={this.state.subAgencies}
                setSubAgencyList={this.setSubAgencyList}
                states={this.state.states}
                clickedDownload={this.props.clickedDownload} />
        );
    }
}

AwardDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(AwardDataContainer);

