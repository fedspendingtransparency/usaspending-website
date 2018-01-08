/**
 * KeywordContainer.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
// import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

// import * as KeywordHelper from 'helpers/keywordHelper';
import { availableColumns } from 'dataMapping/keyword/resultsTableColumns';
import { measureTableHeader } from 'helpers/textMeasurement';

import KeywordPage from 'components/keyword/KeywordPage';

require('pages/keyword/keywordPage.scss');

const tableTypes = [
    {
        label: 'Contracts',
        internal: 'contracts'
    },
    {
        label: 'Grants',
        internal: 'grants'
    },
    {
        label: 'Direct Payments',
        internal: 'direct_payments'
    },
    {
        label: 'Loans',
        internal: 'loans'
    },
    {
        label: 'Other',
        internal: 'other'
    }
];

export default class KeywordContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            filters: {
                tableType: 'contracts',
                keyword: ''
            },
            page: 0,
            lastPage: true,
            counts: {},
            sort: {
                field: 'Award ID',
                direction: 'desc'
            },
            columns: {},
            summary: null,
            inFlight: false,
            error: false,
            results: [],
            tableInstance: `${uniqueId()}` // this will stay constant during pagination but will change when the keyword or table type changes
        };

        // this.summaryRequest = null;
        // this.searchRequest = null;
        // this.tabCountRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.updateSort = this.updateSort.bind(this);
        this.updateKeyword = this.updateKeyword.bind(this);
        this.updateSearchString = this.updateSearchString.bind(this);
    }

    pickDefaultTab() {
        // get the award counts for the current filters
        // TODO - Lizzie: uncomment when endpoint is ready
        // if (this.tabCountRequest) {
        //    this.tabCountRequest.cancel();
        // }
        //
        // this.setState({
        //    inFlight: true,
        //    error: false
        // });
        //
        // const filters = this.state.filters;
        //
        // this.tabCountRequest = KeywordHelper.performTabCountSearch({
        //    filters
        // });
        //
        // this.tabCountRequest.promise
        //    .then((res) => {
        //        this.parseTabCounts(res.data);
        //    })
        //    .catch((err) => {
        //        if (!isCancel(err)) {
        //            this.setState({
        //                inFlight: false,
        //                error: true
        //            });
        //
        //            console.log(err);
        //        }
        //    });
        const mockResults = {
            results: {
                contracts: 200,
                grants: 74,
                direct_payments: 28,
                loans: 621,
                other: 17
            }
        };

        this.parseTabCounts(mockResults);
    }

    parseTabCounts(data) {
        const awardCounts = data.results;
        let firstAvailable = '';
        let i = 0;

        // Set the first available award type to the first non-zero entry in the
        while (firstAvailable === '' && i < tableTypes.length) {
            const tableType = tableTypes[i].internal;

            if (awardCounts[tableType] > 0) {
                firstAvailable = tableType;
            }

            i += 1;
        }

        // If none of the award types are populated, set the first available tab to be the
        // first tab in the table
        if (firstAvailable === '') {
            firstAvailable = tableTypes[0].internal;
        }

        this.setState({
            counts: awardCounts
        }, () => {
            // select the first available tab
            this.switchTab(firstAvailable);
            this.performSearch(true);
        });
    }

    performSearch(newSearch = false) {
        // TODO - Lizzie: update when API is ready
        // if (this.searchRequest) {
        //    // a request is currently in-flight, cancel it
        //    this.searchRequest.cancel();
        // }

        // indicate the request is about to start
        this.setState({
            inFlight: true,
            error: false
        });

        let pageNumber = this.state.page;
        if (newSearch) {
            // a new search (vs just getting more pages of an existing search) requires resetting
            // the page number
            pageNumber = 1;
        }
        const resultLimit = 30;

        const requestFields = availableColumns(this.state.filters.tableType);

        const params = {
            filters: {
                keyword: this.state.filters.keyword,
                award_type: this.state.filters.tableType
            },
            fields: requestFields,
            page: pageNumber,
            limit: resultLimit,
            sort: this.state.sort.field,
            order: this.state.sort.direction
        };

        console.log(JSON.stringify(params));

        // this.searchRequest = KeywordHelper.performKeywordSearch(params);
        // this.searchRequest.promise
        //    .then((res) => {
        //        const newState = {
        //            inFlight: false
        //        };
        //
        //        // don't clear records if we're appending (not the first page)
        //        if (pageNumber <= 1 || newSearch) {
        //            newState.tableInstance = `${uniqueId()}`;
        //            newState.results = res.data.results;
        //        }
        //        else {
        //            newState.results = this.state.results.concat(res.data.results);
        //        }
        //
        //        // request is done
        //        this.searchRequest = null;
        //        newState.page = res.data.page_metadata.page;
        //        newState.lastPage = !res.data.page_metadata.hasNext;
        //
        //        this.setState(newState);
        //    })
        //    .catch((err) => {
        //        if (!isCancel(err)) {
        //            this.setState({
        //                inFlight: false,
        //                error: true
        //            });
        //
        //            console.log(err);
        //        }
        //    });

        const mockResponse = {
            limit: 30,
            page_metadata: {
                page: 1,
                hasNext: true
            },
            results: [
                {
                    "Award ID": "ABC123",
                    internal_id: 123456,
                    Mod: 3,
                    "Action Date": "1987-8-31",
                    "Transaction Amount": 300000000,
                    "Award Type": "Definitive Contract",
                    "Recipient Name": "Mock Recipient",
                    "Awarding Agency": "Mock Agency",
                    awarding_agency_internal_id: 1000,
                    "Awarding Sub Agency": "Mock Office"
                },
                {
                    "Award ID": "XYZ123",
                    internal_id: 987654,
                    Mod: 2,
                    "Action Date": "1987-9-31",
                    "Transaction Amount": 200000000,
                    "Award Type": "Definitive Contract",
                    "Recipient Name": "Mock Recipient 2",
                    "Awarding Agency": "Mock Agency 2",
                    awarding_agency_internal_id: 2000,
                    "Awarding Sub Agency": "Mock Office 2"
                },
                {
                    "Award ID": "XYZ234",
                    internal_id: 987655,
                    Mod: 1,
                    "Action Date": "1987-10-31",
                    "Transaction Amount": 200000000,
                    "Award Type": "Definitive Contract",
                    "Recipient Name": "Mock Recipient 3",
                    "Awarding Agency": "Mock Agency 3",
                    awarding_agency_internal_id: 3000,
                    "Awarding Sub Agency": "Mock Office 3"
                }
            ]
        };

        const newState = {
            inFlight: false
        };

        // don't clear records if we're appending (not the first page)
        if (pageNumber <= 1 || newSearch) {
            newState.tableInstance = `${uniqueId()}`;
            newState.results = mockResponse.results;
        }
        else {
            newState.results = this.state.results.concat(mockResponse.results);
        }

        // request is done
        newState.page = mockResponse.page_metadata.page;
        newState.lastPage = !mockResponse.page_metadata.hasNext;

        this.setState(
            newState, () => {
                this.fetchSummary();
            });
    }

    switchTab(tab) {
        const filters = Object.assign({}, this.state.filters, {
            tableType: tab
        });

        this.setState({
            filters
        }, () => {
            this.performSearch(true);
        });
    }

    loadNextPage() {
        // check if request is already in-flight
        if (this.state.inFlight) {
            // in-flight, ignore this request
            return;
        }

        // check if more pages are available
        if (!this.state.lastPage) {
            // more pages are available, load them
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.performSearch();
            });
        }
    }

    updateSort(field, direction) {
        this.setState({
            sort: {
                field,
                direction
            }
        }, () => {
            this.performSearch(true);
        });
    }

    loadColumns() {
        const columns = {};
        tableTypes.forEach((type) => {
            const allColumns = availableColumns(type.internal);

            const parsedColumns = {};
            allColumns.forEach((title) => {
                parsedColumns[title] =
                {
                    columnName: title,
                    displayName: title,
                    width: measureTableHeader(title),
                    defaultDirection: 'desc'
                };
            });

            columns[type.internal] = {
                visibleOrder: allColumns,
                data: parsedColumns
            };
        });

        // save the values to container state
        this.setState({
            columns
        });
    }

    fetchSummary() {
        // TODO - Lizzie: uncomment when API is ready
        // if (this.summaryRequest) {
        //    this.summaryRequest.cancel();
        // }
        //
        // this.summaryRequest = KeywordHelper.fetchSummary();
        // this.summaryRequest.promise
        //    .then((res) => {
        //        this.setState({
        //            summary: {
        //                primeCount: res.results.prime_awards_count,
        //                primeAmount: res.results.prime_awards_obligation_amount
        //            }
        //        });
        //    })
        //    .catch((err) => {
        //        if (!isCancel(err)) {
        //            console.log(err);
        //            this.summaryRequest = null;
        //        }
        //    });

        const mockResults = {
            prime_awards_count: 111111,
            prime_awards_obligation_amount: 222222.22
        };

        this.setState({
            summary: {
                primeCount: mockResults.prime_awards_count,
                primeAmount: mockResults.prime_awards_obligation_amount
            }
        });
    }

    updateKeyword() {
        const filters = Object.assign({}, this.state.filters, {
            keyword: this.state.searchString
        });

        this.setState({
            filters
        }, () => {
            this.loadColumns();
            this.pickDefaultTab();
        });
    }

    updateSearchString(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    render() {
        const tableType = this.state.filters.tableType;
        return (
            <KeywordPage
                updateSearchString={this.updateSearchString}
                searchString={this.state.searchString}
                updateKeyword={this.updateKeyword}
                summary={this.state.summary}
                error={this.state.error}
                inFlight={this.state.inFlight}
                results={this.state.results}
                columns={this.state.columns[tableType]}
                counts={this.state.counts}
                sort={this.state.sort}
                tableTypes={tableTypes}
                currentType={tableType}
                tableInstance={this.state.tableInstance}
                switchTab={this.switchTab}
                updateSort={this.updateSort}
                loadNextPage={this.loadNextPage} />
        );
    }
}
