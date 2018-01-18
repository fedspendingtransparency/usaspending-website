/**
 * KeywordContainer.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import * as KeywordHelper from 'helpers/keywordHelper';
import { availableColumns, defaultSort } from 'dataMapping/keyword/resultsTableColumns';
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
            keyword: '',
            tableType: 'contracts',
            page: 1,
            lastPage: true,
            counts: {},
            sort: {
                field: 'Transaction Amount',
                direction: 'desc'
            },
            columns: {},
            summary: null,
            inFlight: false,
            summaryInFlight: false,
            error: false,
            results: [],
            tableInstance: `${uniqueId()}` // this will stay constant during pagination but will change when the keyword or table type changes
        };

        this.summaryRequest = null;
        this.searchRequest = null;
        this.tabCountRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.updateSort = this.updateSort.bind(this);
        this.updateKeyword = this.updateKeyword.bind(this);
    }

    pickDefaultTab() {
        // get the transaction counts for the current filters
        if (this.tabCountRequest) {
            this.tabCountRequest.cancel();
        }

        this.setState({
            inFlight: true,
            error: false
        });

        const filters = {
            keyword: this.state.keyword
        };

        this.tabCountRequest = KeywordHelper.performTabCountSearch({
            filters
        });

        this.tabCountRequest.promise
            .then((res) => {
                this.parseTabCounts(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });

                    console.log(err);
                }
            });
    }

    parseTabCounts(data) {
        const transactionCounts = data.results;
        let firstAvailable = '';
        let i = 0;

        // Set the first available award type to the first non-zero entry in the
        while (firstAvailable === '' && i < tableTypes.length) {
            const tableType = tableTypes[i].internal;

            if (transactionCounts[tableType] > 0) {
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
            counts: transactionCounts
        }, () => {
            // select the first available tab
            this.switchTab(firstAvailable);
            this.fetchSummary();
        });
    }

    performSearch(newSearch = false) {
        if (this.searchRequest) {
            // a request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

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
        const resultLimit = 35;

        const requestFields = availableColumns(this.state.tableType);
        const tableType = this.state.tableType;

        const params = {
            filters: {
                keyword: this.state.keyword,
                award_type_codes: awardTypeGroups[tableType]
            },
            fields: requestFields,
            page: pageNumber,
            limit: resultLimit,
            sort: this.state.sort.field,
            order: this.state.sort.direction
        };

        this.searchRequest = KeywordHelper.performKeywordSearch(params);
        this.searchRequest.promise
            .then((res) => {
                const newState = {
                    inFlight: false
                };

                // don't clear records if we're appending (not the first page)
                if (pageNumber <= 1 || newSearch) {
                    newState.tableInstance = `${uniqueId()}`;
                    newState.results = res.data.results;
                }
                else {
                    newState.results = this.state.results.concat(res.data.results);
                }

                // request is done
                this.searchRequest = null;
                newState.page = res.data.page_metadata.page;
                newState.lastPage = !res.data.page_metadata.hasNext;

                this.setState(
                    newState
                );
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });

                    console.log(err);
                    this.searchRequest = null;
                }
            });
    }

    switchTab(tab) {
        const newState = {
            tableType: tab
        };
        const currentSortField = this.state.sort.field;

        // check if the current sort field is available in the table type
        const availableFields = availableColumns(tab);
        if (availableFields.indexOf(currentSortField) === -1) {
            // the sort field doesn't exist, use the table type's default field
            const field = defaultSort(tab);
            const direction = 'desc';

            newState.sort = {
                field,
                direction
            };
        }

        this.setState(newState, () => {
            // Don't perform a search yet if user switches tabs before entering a keyword
            if (this.state.keyword !== '') {
                this.performSearch(true);
            }
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

        this.setState({
            summaryInFlight: true
        });

        const params = {
            filters: {
                keyword: this.state.keyword,
                // temporarily hard-code FYs 2015, 2016, & 2017 to match the data in elastic search
                time_period: [
                    {
                        start_date: "2014-10-01",
                        end_date: "2015-09-30"
                    },
                    {
                        start_date: "2015-10-01",
                        end_date: "2016-09-30"
                    },
                    {
                        start_date: "2016-10-01",
                        end_date: "2017-09-30"
                    }
                ]
            }
        };

        this.summaryRequest = KeywordHelper.fetchSummary(params);
        this.summaryRequest.promise
            .then((res) => {
                const results = res.data.results;
                this.setState({
                    summaryInFlight: false,
                    summary: {
                        primeCount: results.prime_awards_count,
                        primeAmount: results.prime_awards_obligation_amount
                    }
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        summaryInFlight: false
                    });
                    console.log(err);
                    this.summaryRequest = null;
                }
            });
    }

    updateKeyword(keyword) {
        this.setState({
            keyword
        }, () => {
            this.loadColumns();
            this.pickDefaultTab();
        });
    }

    render() {
        const tableType = this.state.tableType;
        return (
            <KeywordPage
                updateKeyword={this.updateKeyword}
                keywordApplied={this.state.keyword !== ''}
                summary={this.state.summary}
                summaryInFlight={this.state.summaryInFlight}
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
