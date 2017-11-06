/**
 * AwardDataContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// import { isCancel } from 'axios';
import { connect } from 'react-redux';

// import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';

import AwardDataContent from 'components/bulkDownload/awards/AwardDataContent';

const propTypes = {
    updateDownloadFilter: PropTypes.func,
    updateDownloadParam: PropTypes.func,
    clearDownloadFilters: PropTypes.func,
    updateAwardDateRange: PropTypes.func,
    bulkDownload: PropTypes.object,
    setAgencyList: PropTypes.func,
    setSubAgencyList: PropTypes.func,
    showModal: PropTypes.func
};

export class AwardDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true
        };

        // this.bulkDownloadRequest = null;
        // this.agencyListRequeset = null;
        // this.downloadStatusRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.updateParam = this.updateParam.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.clearAwardFilters = this.clearAwardFilters.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.setSubAgencyList = this.setSubAgencyList.bind(this);
    }

    componentDidMount() {
        this.setAgencyList();
    }

    setAgencyList() {
        // TODO - Lizzie: uncomment when endpoint is ready
        // this.setState({
        //    inFlight: true
        // });
        //
        // if (this.agencyListRequeset) {
        //    this.agencyListRequeset.cancel();
        // }
        //
        // // perform the API request
        // this.agencyListRequeset = BulkDownloadHelper.requestAgenciesList({
        //    agency: 0
        // });
        //
        // this.agencyListRequeset.promise
        //    .then((res) => {
        //        const agencies = res.data.agencies;
        //        this.props.setAgencyList(agencies);
        //    })
        //    .catch((err) => {
        //        console.log(err);
        //        this.agencyListRequeset = null;
        //    });

        const mockAgencies = [
            {
                name: "Agency 1",
                toptier_agency_id: 212,
                cgac_code: "292"
            },
            {
                name: "Agency 2",
                toptier_agency_id: 435,
                cgac_code: "123"
            }
        ];

        this.props.setAgencyList(mockAgencies);
    }

    setSubAgencyList(id) {
        if (id !== '') {
            // TODO - Lizzie: uncomment when endpoint is ready
            // this.setState({
            //    inFlight: true
            // });
            //
            // if (this.agencyListRequeset) {
            //    this.agencyListRequeset.cancel();
            // }
            //
            // // perform the API request
            // this.agencyListRequeset = BulkDownloadHelper.requestAgenciesList({
            //    agency: id
            // });
            //
            // this.agencyListRequeset.promise
            //    .then((res) => {
            //        const subAgencies = res.data.agencies;
            //        this.props.setSubAgencyList(subAgencies);
            //    })
            //    .catch((err) => {
            //        console.log(err);
            //        this.agencyListRequeset = null;
            //    });

            let mockSubAgencies = [
                {
                    subtier_agency_name: "Subtier Agency 1",
                    subtier_agency_id: 5
                },
                {
                    subtier_agency_name: "Subtier Agency 2",
                    subtier_agency_id: 6
                }
            ];

            if (id === '435') {
                mockSubAgencies = [
                    {
                        subtier_agency_name: "Subtier Agency 3",
                        subtier_agency_id: 7
                    },
                    {
                        subtier_agency_name: "Subtier Agency 4",
                        subtier_agency_id: 8
                    }
                ];
            }

            this.props.setSubAgencyList(mockSubAgencies);
        }
        else {
            this.props.setSubAgencyList([]);
        }
    }

    updateParam(name, value) {
        this.props.updateDownloadParam({
            dataType: 'awards',
            name,
            value
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
            dateType: 'start_date'
        });
    }

    updateEndDate(date) {
        this.props.updateAwardDateRange({
            date,
            dateType: 'end_date'
        });
    }

    clearAwardFilters() {
        this.props.clearDownloadFilters('awards');
    }

    render() {
        return (
            <AwardDataContent
                awards={this.props.bulkDownload.awards}
                updateParam={this.updateParam}
                updateFilter={this.updateFilter}
                updateStartDate={this.updateStartDate}
                updateEndDate={this.updateEndDate}
                clearAwardFilters={this.clearAwardFilters}
                agencies={this.props.bulkDownload.agencies}
                subAgencies={this.props.bulkDownload.subAgencies}
                setSubAgencyList={this.setSubAgencyList}
                showModal={this.props.showModal} />
        );
    }
}

AwardDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(AwardDataContainer);

