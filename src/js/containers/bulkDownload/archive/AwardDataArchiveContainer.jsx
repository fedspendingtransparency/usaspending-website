/**
 * AwardDataArchiveContainer.jsx
 * Created by Lizzie Salita 12/14/17
 */

import React from 'react';
import moment from 'moment';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';

import AwardDataArchiveContent from 'components/bulkDownload/archive/AwardDataArchiveContent';

const columns = [
    {
        columnName: 'agency',
        displayName: 'Agency'
    },
    {
        columnName: 'url',
        displayName: 'Archive File'
    },
    {
        columnName: 'fy',
        displayName: 'Fiscal Year'
    },
    {
        columnName: 'date',
        displayName: 'Date As Of'
    }
];

export default class AwardDataArchiveContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true,
            agencies: {
                cfoAgencies: [],
                otherAgencies: []
            },
            filters: {
                agency: {
                    id: 'all',
                    name: 'All'
                },
                type: 'contracts',
                fy: '2018'
            },
            results: []

        };

        this.agencyListRequest = null;
        this.resultsRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.requestResults = this.requestResults.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentDidMount() {
        this.setAgencyList();
        this.requestResults();
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

    updateFilter(name, value) {
        const filters = Object.assign({}, this.state.filters, {
            [name]: value
        });

        this.setState({
            filters
        });
    }

    requestResults() {
        this.setState({
            inFlight: true
        });

        if (this.resultsRequest) {
            this.resultsRequest.cancel();
        }

        //perform the API request
        if (this.state.filters.id === 'all') {
            // don't include the agency parameter to request all agencies
            this.resultsRequest = BulkDownloadHelper.requestArchiveFiles({
                fiscal_year: parseInt(this.state.filters.fy, 10),
                type: this.state.filters.type
            });
        }
        else {
            this.resultsRequest = BulkDownloadHelper.requestArchiveFiles({
                agency: parseInt(this.state.filters.agency.id, 10),
                fiscal_year: parseInt(this.state.filters.fy, 10),
                type: this.state.filters.type
            });
        }

        this.agencyListRequest.promise
            .then((res) => {
                this.parseResults(res.data.monthly_files);
            })
            .catch((err) => {
                console.log(err);
                this.resultsRequest = null;
            });
    }

    parseResults(data) {
        const results = [];

        data.forEach((item) => {
            // Format Agency String
            let formattedAgency = item.agency_name;
            if (item.agency_acronym) {
                formattedAgency = `${item.agency_name} (${item.agency_acronym})`;
            }

            // Format Updated Date
            const date = moment(item.updated_date);
            const formattedDate = date.format("MM/DD/YYYY");

            // Format the Fiscal Year
            const formattedFY = `FY ${item.fiscal_year}`;

            const file = {
                agency: formattedAgency,
                url: item.file_name,
                fy: formattedFY,
                date: formattedDate
            };
            results.push(file);
        });

        this.setState({
            results
        });
    }

    render() {
        return (
            <AwardDataArchiveContent
                filters={this.state.filters}
                updateFilter={this.updateFilter}
                agencies={this.state.agencies}
                columns={columns}
                results={this.state.results}
                requestResults={this.requestResults} />
        );
    }
}

