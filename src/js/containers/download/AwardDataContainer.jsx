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
import * as downloadActions from 'redux/actions/download/bulkDownloadActions';

import AwardDataContent from 'components/download/AwardDataContent';

const awardLevelOptions = [
    {
        name: 'prime_awards',
        label: 'Prime Awards'
    },
    {
        name: 'sub_awards',
        label: 'Sub Awards'
    }
];

const awardTypeOptions = [
    {
        name: 'contracts',
        label: 'Contracts'
    },
    {
        name: 'grants',
        label: 'Grants'
    },
    {
        name: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        name: 'loans',
        label: 'Loans'
    },
    {
        name: 'other_financial_assistance',
        label: 'Other Financial Assistance'
    }
];

const propTypes = {
    updateDownloadFilters: PropTypes.func,
    clearDownloadFilters: PropTypes.func,
    bulkDownload: PropTypes.object,
    setAgencyList: PropTypes.func,
    setSubAgencyList: PropTypes.func
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

        this.parseFilterSelections = this.parseFilterSelections.bind(this);
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

    clearAwardFilters() {
        this.props.clearDownloadFilters('awardData');
    }

    parseFilterSelections(dataType, filterSelections) {
        // Parse selections from the form into filter object
        const awardLevels = [];
        for (let i = 0; i < awardLevelOptions.length; i++) {
            const level = awardLevelOptions[i].name;
            if (filterSelections[level]) {
                awardLevels.push(level);
            }
        }

        const awardTypes = [];
        for (let i = 0; i < awardTypeOptions.length; i++) {
            const type = awardTypeOptions[i].name;
            if (filterSelections[type]) {
                awardTypes.push(type);
            }
        }

        const filters = {
            award_levels: awardLevels,
            filters: {
                award_types: awardTypes,
                agency: filterSelections.agency,
                sub_agency: filterSelections.subAgency,
                date_type: '',
                date_range: {
                    start_date: '',
                    end_date: ''
                }
            },
            columns: [],
            file_format: 'csv'
        };

        console.log(filters);
        this.props.updateDownloadFilters({
            dataType,
            filters
        });
    }

    render() {
        return (
            <AwardDataContent
                awardLevels={awardLevelOptions}
                awardTypes={awardTypeOptions}
                updateDownloadFilters={this.parseFilterSelections}
                clearAwardFilters={this.clearAwardFilters}
                agencies={this.props.bulkDownload.agencies}
                subAgencies={this.props.bulkDownload.subAgencies}
                setSubAgencyList={this.setSubAgencyList} />
        );
    }
}

AwardDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(AwardDataContainer);

