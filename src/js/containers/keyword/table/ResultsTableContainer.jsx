/**
 * ResultsTableContainer.jsx
 * Created by Lizzie Salita 1/19/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { uniqueId, map } from 'lodash';
import * as KeywordHelper from 'helpers/keywordHelper';
import { availableColumns, defaultSort } from 'dataMapping/keyword/resultsTableColumns';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { measureTableHeader } from 'helpers/textMeasurement';
import TableTabsTooltips from 'dataMapping/shared/TableTabsTooltips';
import Analytics from 'helpers/analytics/Analytics';

import ResultsTableSection from 'components/keyword/table/ResultsTableSection';

const propTypes = {
    keyword: PropTypes.string,
    fetchSummary: PropTypes.func
};

const tableTypes = [
    {
        label: 'Contracts',
        internal: 'contracts'
    },
    {
        label: 'Contract IDVs',
        internal: 'idvs'
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
        internal: 'loans',
        tooltip: TableTabsTooltips('loans')
    },
    {
        label: 'Other',
        internal: 'other'
    }
];

export default class ResultsTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableType: 'contracts',
            page: 1,
            lastPage: true,
            counts: {},
            sort: {
                field: 'Transaction Amount',
                direction: 'desc'
            },
            columns: {},
            inFlight: false,
            error: false,
            results: [],
            tableInstance: `${uniqueId()}` // this will stay constant during pagination but will change when the keyword or table type changes
        };

        this.searchRequest = null;
        this.tabCountRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidMount() {
    // Perform a search for a keyword derived from the url
        if (this.props.keyword) {
            this.loadColumns();
            this.pickDefaultTab();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.keyword !== this.props.keyword) {
            // filters changed, update the search object
            this.loadColumns();
            this.pickDefaultTab();
        }
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
            keyword: this.props.keyword
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

        // Set the first available award type to the first non-zero entry in the
        for (let i = 0; i < tableTypes.length; i++) {
            const tableType = tableTypes[i].internal;

            if (transactionCounts[tableType] > 0) {
                firstAvailable = tableType;
                break;
            }
        }

        // If none of the award types are populated, set the first available tab to be the
        // first tab in the table
        if (!firstAvailable) {
            firstAvailable = tableTypes[0].internal;
        }

        this.setState({
            counts: transactionCounts
        }, () => {
            // select the first available tab
            this.switchTab(firstAvailable);
            this.props.fetchSummary();
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

        const requestFields = map(availableColumns(this.state.tableType), (data) => data.title);
        const tableType = this.state.tableType;

        const params = {
            filters: {
                keyword: this.props.keyword,
                award_type_codes: awardTypeGroups[tableType]
            },
            fields: requestFields,
            page: pageNumber,
            limit: resultLimit,
            sort: this.state.sort.field,
            order: this.state.sort.direction
        };

        this.searchRequest = KeywordHelper.performKeywordSearch(params);
        return this.searchRequest.promise
            .then((res) => {
                const newState = {
                    inFlight: false
                };

                const parsedResults = res.data.results.map((result) => ({
                    ...result,
                    generated_internal_id: encodeURIComponent(result.generated_internal_id)
                }));

                // don't clear records if we're appending (not the first page)
                if (pageNumber <= 1 || newSearch) {
                    newState.tableInstance = `${uniqueId()}`;
                    newState.results = parsedResults;
                }
                else {
                    newState.results = this.state.results.concat(parsedResults);
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
        const availableFields = map(availableColumns(tab), (data) => data.title);
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
            if (this.props.keyword) {
                this.performSearch(true);
                Analytics.event({
                    event: 'keyword',
                    category: 'Keyword Search - Table Tab',
                    action: tab
                });
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
            const allColumns = map(availableColumns(type.internal), (data) => data.title);
            const parsedColumns = availableColumns(type.internal).reduce((result, data) => Object.assign(
                {},
                result,
                {
                    [data.title]: {
                        columnName: data.title,
                        displayName: data.displayName || data.title,
                        width: measureTableHeader(data.displayName || data.title),
                        defaultDirection: 'desc'
                    }
                }),
            {});

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

    render() {
        const tableType = this.state.tableType;
        return (
            <ResultsTableSection
                error={this.state.error}
                keyword={this.props.keyword}
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

ResultsTableContainer.propTypes = propTypes;
