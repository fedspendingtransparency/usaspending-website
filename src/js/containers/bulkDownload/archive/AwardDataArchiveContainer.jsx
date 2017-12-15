/**
 * AwardDataArchiveContainer.jsx
 * Created by Lizzie Salita 12/14/17
 */

import React from 'react';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';

import AwardDataArchiveContent from 'components/bulkDownload/archive/AwardDataArchiveContent';

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
        // this.resultsRequest = null;

        this.updateFilter = this.updateFilter.bind(this);
        this.setAgencyList = this.setAgencyList.bind(this);
        this.requestResults = this.requestResults.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
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

    updateFilter(name, value) {
        this.setState({
            [name]: value
        });
    }

    requestResults() {
        const mockResults = [
            {
                file_name: "2017_010_Contracts_Full_20171212.zip",
                updated_date: "2017-12-12",
                url: "https://s3-us-gov-west-1.amazonaws.com:443/usaspending-monthly-downloads/2017_010_Contracts_Full_20171212.zip"
            },
            {
                file_name: "2017_010_Contracts_Delta_20171212.zip",
                updated_date: "2017-12-12",
                url: "https://s3-us-gov-west-1.amazonaws.com:443/usaspending-monthly-downloads/2017_010_Contracts_Full_20171212.zip"
            }
        ];

        this.setState({
            results: mockResults
        });

        // TODO - Lizzie: uncomment when API is ready
        // this.setState({
        //    inFlight: true
        // });
        //
        // if (this.resultsRequest) {
        //    this.resultsRequest.cancel();
        // }
        //
        // // perform the API request
        // this.resultsRequest = BulkDownloadHelper.requestArchiveFiles({
        //    agency: this.state.filters.agency.id,
        //    fiscal_year: parseInt(this.state.filters.fy, 10),
        //    type: this.state.filters.type
        // });
        //
        // this.agencyListRequest.promise
        //    .then((res) => {
        //        const results = res.data.monthly_files;
        //        this.setState({results});
        //    })
        //    .catch((err) => {
        //        console.log(err);
        //        this.resultsRequest = null;
        //    });
    }

    render() {
        return (
            <AwardDataArchiveContent
                filters={this.state.filters}
                updateFilter={this.updateFilter}
                agencies={this.state.agencies}
                results={this.state.results}
                requestResults={this.requestResults} />
        );
    }
}

