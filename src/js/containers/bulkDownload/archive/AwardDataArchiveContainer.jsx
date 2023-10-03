/**
 * AwardDataArchiveContainer.jsx
 * Created by Lizzie Salita 12/14/17
 */

import React from 'react';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import * as fiscalYearHelper from 'helpers/fiscalYearHelper';
import AwardDataArchiveContent from 'components/bulkDownload/archive/AwardDataArchiveContent';

const dayjs = require('dayjs');

const currentFY = fiscalYearHelper.currentFiscalYear();

const columns = [
    {
        columnName: 'agency',
        displayName: 'Agency'
    },
    {
        columnName: 'fileName',
        displayName: 'Archive File'
    },
    {
        columnName: 'fy',
        displayName: 'Fiscal Year'
    },
    {
        columnName: 'date',
        displayName: 'Data As Of'
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
                type: {
                    name: 'contracts',
                    display: 'Contracts'
                },
                fy: `${currentFY}`
            },
            results: []

        };

        this.agencyListRequest = null;
        this.resultsRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.requestResults = this.requestResults.bind(this);
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
            type: "award_agencies",
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

        // perform the API request
        this.resultsRequest = BulkDownloadHelper.requestArchiveFiles({
            agency: this.state.filters.agency.id,
            fiscal_year: parseInt(this.state.filters.fy, 10),
            type: this.state.filters.type.name
        });

        this.resultsRequest.promise
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
            const date = dayjs(item.updated_date, "YYYY-MM-DD");
            const formattedDate = date.format("MM/DD/YYYY");

            // Format the Fiscal Year
            let formattedFY;
            if (item.fiscal_year === null) {
                formattedFY = 'N/A';
            }
            else {
                formattedFY = `FY ${item.fiscal_year}`;
            }

            const file = {
                agency: formattedAgency,
                fileName: item.file_name,
                url: item.url,
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
