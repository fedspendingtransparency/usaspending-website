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
            keyword: '',
            tableType: 'contracts',
            page: 1,
            lastPage: true,
            sort: {
                field: 'Transaction Amount',
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
        this.searchRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.updateSort = this.updateSort.bind(this);
        this.updateKeyword = this.updateKeyword.bind(this);
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
                }
            });
    }

    switchTab(tab) {
        this.setState({
            tableType: tab
        }, () => {
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

        const params = {
            filters: {
                keyword: this.state.keyword
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

    updateKeyword(keyword) {
        this.setState({
            keyword
        }, () => {
            this.loadColumns();
            this.performSearch(true);
            this.fetchSummary();
        });
    }

    render() {
        const tableType = this.state.tableType;
        return (
            <KeywordPage
                updateKeyword={this.updateKeyword}
                keywordApplied={this.state.keyword !== ''}
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
