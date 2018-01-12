/**
 * KeywordContainer.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import * as KeywordHelper from 'helpers/keywordHelper';
import { availableColumns } from 'dataMapping/keyword/resultsTableColumns';
import { awardTypeGroups } from 'dataMapping/search/awardType';
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
            filters: {
                tableType: 'contracts',
                keyword: ''
            },
            page: 0,
            lastPage: true,
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

        this.summaryRequest = null;
        // this.searchRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.updateSort = this.updateSort.bind(this);
        this.updateKeyword = this.updateKeyword.bind(this);
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
                    internal_id: 1,
                    'Award ID': 'ABC123',
                    'Recipient Name': 'Blerg',
                    'Action Date': '2011-12-31',
                    'Transaction Amount': '123.45',
                    'Award Type': 'Definitive Contract',
                    'Awarding Agency': 'Department of Sandwiches',
                    'Awarding Sub Agency': 'Office of Subs',
                    Mod: '2'
                },
                {
                    internal_id: 4,
                    'Award ID': 'XYZ123',
                    'Recipient Name': 'Mock Recipient 2',
                    'Action Date': '1987-9-31',
                    'Transaction Amount': '200',
                    'Award Type': 'Definitive Contract',
                    'Awarding Agency': 'Mock Agency',
                    'Awarding Sub Agency': 'Mock Office',
                    Mod: '5'
                },
                {
                    internal_id: 7,
                    'Award ID': 'DEF123',
                    'Recipient Name': 'Mock Recipient 3',
                    'Action Date': '1987-10-31',
                    'Transaction Amount': '300',
                    'Award Type': 'Definitive Contract',
                    'Awarding Agency': 'Mock Agency 3',
                    'Awarding Sub Agency': 'Mock Office 3',
                    Mod: '8'
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
        if (this.summaryRequest) {
            this.summaryRequest.cancel();
        }

        const tableType = this.state.filters.tableType;

        const params = {
            filters: {
                keyword: this.state.filters.keyword,
                award_type_codes: awardTypeGroups[tableType]
            }
        };

        this.summaryRequest = KeywordHelper.fetchSummary(params);
        this.summaryRequest.promise
            .then((res) => {
                const results = res.data.results;
                this.setState({
                    summary: {
                        primeCount: results.prime_awards_count,
                        primeAmount: results.prime_awards_obligation_amount
                    }
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.summaryRequest = null;
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
            this.performSearch(true);
        });
    }

    render() {
        const tableType = this.state.filters.tableType;
        return (
            <KeywordPage
                updateKeyword={this.updateKeyword}
                keywordApplied={this.state.filters.keyword !== ''}
                summary={this.state.summary}
                error={this.state.error}
                inFlight={this.state.inFlight}
                results={this.state.results}
                columns={this.state.columns[tableType]}
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
