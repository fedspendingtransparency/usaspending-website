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
import { defaultColumns, defaultSort } from 'dataMapping/search/awardTableColumns';
import AccountAwardSearchOperation from 'models/v1/account/queries/AccountAwardSearchOperation';
import ResultsTableSection from 'components/search/table/ResultsTableSection';
import { tableTypes, subTypes } from 'containers/search/table/ResultsTableContainer';

const propTypes = {
    account: PropTypes.object,
    filters: PropTypes.object
};

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

        const searchOperation = new AccountAwardSearchOperation(this.props.account.id);
        searchOperation.fromState(this.props.filters);
        searchOperation.awardType = awardTypeGroups[this.state.tableType];
        const searchParams = searchOperation.spendingByAwardTableParams(this.props);
        const filters = { ...searchParams.filters };
        this.tabCountRequest = SearchHelper.performSpendingByAwardTabCountSearch({
            filters,
            subawards: false
        });

        this.tabCountRequest.promise
            .then((res) => {
                this.parseTabCounts(res.data);
                this.tabCountRequest = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    this.tabCountRequest = null;

                    console.log(err);
                }
            });
    }

    parseTabCounts(data) {
        const awardCounts = data.results;
        let firstAvailable = '';
        let i = 0;

        const availableTabs = tableTypes;

        // Set the first available award type to the first non-zero entry in the
        while (firstAvailable === '' && i < availableTabs.length) {
            const tableType = availableTabs[i].internal;

            if (awardCounts[tableType] > 0) {
                firstAvailable = tableType;
            }

            i += 1;
        }

        // If none of the award types are populated, set the first available tab to be the
        // first tab in the table
        if (firstAvailable === '') {
            firstAvailable = availableTabs[0].internal;
        }

        this.setState({
            counts: awardCounts
        }, () => {
            // select the first available tab
            this.switchTab(firstAvailable);
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
                [data.title]: this.createColumn(data)
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

    createColumn(col) {
        const direction = 'desc';
        const width = col.customWidth || measureTableHeader(col.displayName || col.title);

        return {
            columnName: col.title,
            displayName: col.displayName || col.title,
            subtitle: col.subtitle || '',
            width,
            background: col.background || '',
            defaultDirection: direction
        };
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

        requestFields.push('recipient_id');

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
                this.searchRequest = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    this.searchRequest = null;

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
        const tabsWithCounts = tableTypes.map((type) => ({
            ...type,
            count: this.state.counts[type.internal],
            disabled: this.state.inFlight || this.state.counts[type.internal] === 0
        }));
        return (
            <ResultsTableSection
                error={this.state.error}
                inFlight={this.state.inFlight}
                results={this.state.results}
                columns={this.state.columns[this.state.tableType]}
                sort={this.state.sort}
                tableTypes={tabsWithCounts}
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
