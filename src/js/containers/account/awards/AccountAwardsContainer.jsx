/**
 * AccountAwardsContainer.jsx
 * Created by Kevin Li 4/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import { measureTableHeader } from 'helpers/textMeasurement';

import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import * as SearchHelper from 'helpers/searchHelper';
import { defaultColumns, defaultSort } from
    'dataMapping/search/awardTableColumns';

import AccountAwardSearchOperation from 'models/account/queries/AccountAwardSearchOperation';
import ResultsTableSection from 'components/search/table/ResultsTableSection';

const propTypes = {
    account: PropTypes.object,
    filters: PropTypes.object
};

const tableTypes = [
    {
        label: 'Contracts',
        internal: 'contracts',
        enabled: true
    },
    {
        label: 'Grants',
        internal: 'grants',
        enabled: true
    },
    {
        label: 'Direct Payments',
        internal: 'direct_payments',
        enabled: true
    },
    {
        label: 'Loans',
        internal: 'loans',
        enabled: true
    },
    {
        label: 'Other',
        internal: 'other',
        enabled: true
    }
];

const subTypes = [
    {
        label: 'Sub-Contracts',
        internal: 'subcontracts',
        enabled: true
    },
    {
        label: 'Sub-Grants',
        internal: 'subgrants',
        enabled: true
    }
];

export class AccountAwardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            lastPage: true,
            counts: {},
            tableType: 'contracts',
            sort: {
                field: 'Award Amount',
                direction: 'desc'
            },
            inFlight: true,
            results: [],
            columns: {},
            tableInstance: `${uniqueId()}` // this will stay constant during pagination but will change when the filters or table type changes
        };

        this.tabCountRequest = null;
        this.searchRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidMount() {
        // set some default columns to look at while the initial tab-picker API calls are in flight
        // we can't hide the table entirely because the viewport is required to calculate the
        // row rendering
        this.loadColumns();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters !== this.props.filters) {
            // filters changed, update the search object
            this.pickDefaultTab();
        }
    }

    pickDefaultTab() {
        // get the award counts for the current filter set
        if (this.tabCountRequest) {
            this.tabCountRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        const searchParams = new AccountAwardSearchOperation(this.props.account.id);
        searchParams.fromState(this.props.filters);

        this.tabCountRequest = SearchHelper.fetchAwardCounts({
            aggregate: 'count',
            group: 'type',
            field: 'total_obligation',
            filters: searchParams.toParams()
        });

        this.tabCountRequest.promise
            .then((res) => {
                this.parseTabCounts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    parseTabCounts(data) {
        const availableTypes = {};
        data.results.forEach((type) => {
            const count = parseFloat(type.aggregate);
            if (count > 0) {
                availableTypes[type.type] = count;
            }
        });

        // sum the types up by group
        const availableGroups = {};
        Object.keys(awardTypeGroups).forEach((group) => {
            availableGroups[group] = 0;
            awardTypeGroups[group].forEach((type) => {
                if ({}.hasOwnProperty.call(availableTypes, type)) {
                    availableGroups[group] += availableTypes[type];
                }
            });
        });

        let firstAvailable = 0;
        for (let i = 0; i < tableTypes.length; i++) {
            const type = tableTypes[i].internal;
            if (availableGroups[type] > 0) {
                firstAvailable = i;
                i = tableTypes.length + 1;
            }
        }

        const defaultTab = tableTypes[firstAvailable].internal;

        this.setState({
            counts: availableGroups
        }, () => {
            // select the first available tab
            this.switchTab(defaultTab);
            this.performSearch(true);
        });
    }

    loadColumns() {
        // in the future, this will be an API call, but for now, read the local data file
        // load every possible table column up front, so we don't need to deal with this when
        // switching tabs
        const columns = tableTypes.concat(subTypes).reduce((cols, type) => {
            const visibleColumns = defaultColumns(type.internal).map((data) => data.title);
            const parsedColumns = defaultColumns(type.internal).reduce((parsedCols, data) => Object.assign({}, parsedCols, {
                [data.title]: this.createColumn(data.displayName, data.title)
            }), {});

            return Object.assign({}, cols, {
                [type.internal]: {
                    visibleOrder: visibleColumns,
                    data: parsedColumns
                }
            });
        }, {});
        this.setState({
            columns
        });
    }

    createColumn(displayName, title) {
        // BODGE: Temporarily only allow descending columns
        const direction = 'desc';

        const column = {
            columnName: title,
            displayName: displayName || title,
            width: measureTableHeader(displayName || title),
            defaultDirection: direction
        };

        return column;
    }

    performSearch(newSearch = false) {
        if (this.searchRequest) {
            // a request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        // create a search operation instance from the Redux filters using the account ID
        const searchOperation = new AccountAwardSearchOperation(this.props.account.id);
        searchOperation.fromState(this.props.filters);
        searchOperation.awardType = awardTypeGroups[this.state.tableType];
        const newParams = searchOperation.spendingByAwardTableParams(this.props);
        // indicate the request is about to start
        this.setState({
            inFlight: true
        });

        let pageNumber = this.state.page;
        if (newSearch) {
            // a new search (vs just getting more pages of an existing search) requires resetting
            // the page number
            pageNumber = 1;
        }
        const resultLimit = 60;
        newParams.filters.award_type_codes = awardTypeGroups[this.state.tableType];

        const requestFields = [];

        // Request fields for visible columns only
        const columnVisibility = this.state.columns[this.state.tableType].visibleOrder;

        columnVisibility.forEach((field) => {
            if (!requestFields.includes(field)) {
                // Prevent duplicates in the list of fields to request
                requestFields.push(field);
            }
        });
        newParams.fields = requestFields;
        newParams.limit = resultLimit;
        newParams.order = this.state.sort.direction;
        newParams.page = pageNumber;
        // sort field
        newParams.sort = this.state.sort.field;

        // Set the params needed for download API call
        this.searchRequest = SearchHelper.performSpendingByAwardSearch(newParams);
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

                this.setState(newState);
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
        const newState = {
            tableType: tab
        };

        const currentSortField = this.state.sort.field;
        // check if the current sort field is available in the table type
        const availableFields = this.state.columns[tab].data;
        if (!{}.hasOwnProperty.call(availableFields, currentSortField)) {
            // the sort field doesn't exist, use the table type's default field
            const field = defaultSort(tab);
            const fieldType = awardTableColumnTypes[field];
            let direction = 'desc';
            if (fieldType === 'number') {
                direction = 'asc';
            }

            newState.sort = {
                field,
                direction
            };
        }

        this.setState(newState, () => {
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

    render() {
        if (Object.keys(this.state.columns).length === 0) {
            return null;
        }
        return (
            <ResultsTableSection
                error={this.state.error}
                inFlight={this.state.inFlight}
                results={this.state.results}
                columns={this.state.columns[this.state.tableType]}
                counts={this.state.counts}
                sort={this.state.sort}
                tableTypes={tableTypes}
                currentType={this.state.tableType}
                tableInstance={this.state.tableInstance}
                switchTab={this.switchTab}
                updateSort={this.updateSort}
                loadNextPage={this.loadNextPage}
                subaward={false} />
        );
    }
}

AccountAwardsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        account: state.account.account,
        filters: state.account.filters
    })
)(AccountAwardsContainer);
