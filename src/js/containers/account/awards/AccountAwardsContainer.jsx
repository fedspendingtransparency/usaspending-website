/**
 * AccountAwardsContainer.jsx
 * Created by Kevin Li 4/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import Immutable from 'immutable';
import { intersection, uniqueId } from 'lodash';

import { measureTableHeader } from 'helpers/textMeasurement';

import TableSearchFields from 'dataMapping/search/tableSearchFields';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import * as SearchHelper from 'helpers/searchHelper';

import AccountAwardSearchOperation from 'models/account/queries/AccountAwardSearchOperation';
import SearchSortOrder from 'models/search/SearchSortOrder';
import AwardSummary from 'models/results/award/AwardSummary';

import AccountAwardsSection from 'components/account/awards/AccountAwardsSection';

import * as accountActions from 'redux/actions/account/accountActions';

const propTypes = {
    account: PropTypes.object,
    awards: PropTypes.instanceOf(Immutable.OrderedSet),
    meta: PropTypes.object,
    filters: PropTypes.object,
    order: PropTypes.object,
    setAccountAwardType: PropTypes.func,
    setAccountAwards: PropTypes.func,
    appendAccountAwards: PropTypes.func,
    setAccountAwardOrder: PropTypes.func
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

export class AccountAwardsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            hasNext: false,
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
            this.updateFilters();
        });
    }

    updateFilters() {
        const newSearch = new AccountAwardSearchOperation();
        newSearch.fromState(this.props.filters);
        this.setState({
            searchParams: newSearch,
            page: 1
        }, () => {
            this.performSearch(true);
        });
    }

    loadColumns() {
        const columns = {};
        for (const table of tableTypes) {
            // calculate the column metadata to display for each table type
            const tableType = table.internal;
            const typeColumns = [];
            let sortOrder = TableSearchFields.defaultSortDirection;

            if (tableType === 'loans') {
                sortOrder = TableSearchFields.loans.sortDirection;
            }

            const tableSettings = TableSearchFields[tableType];

            tableSettings._order.forEach((col) => {
                const column = {
                    columnName: col,
                    displayName: tableSettings[col],
                    width: measureTableHeader(tableSettings[col]),
                    defaultDirection: sortOrder[col]
                };
                typeColumns.push(column);
            });

            columns[tableType] = typeColumns;
        }

        this.setState({
            columns
        }, () => {
            this.pickDefaultTab();
        });
    }

    performSearch(newSearch = false) {
        if (this.searchRequest) {
            // a request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        const tableType = this.state.tableType;

        // create a search operation instance from the Redux filters using the account ID
        const searchOperation = new AccountAwardSearchOperation(this.props.account.id);
        searchOperation.fromState(this.props.filters);
        searchOperation.awardType = awardTypeGroups[this.state.tableType];

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

        // Request fields for the current table type
        const requestFields = this.state.columns[tableType].map((column) => column.columnName);

        let sortModifier = '';
        if (this.state.sort.direction === 'desc') {
            sortModifier = '-';
        }
        const searchOrder = [`${sortModifier}${this.state.sort.field}`];

        const params = {
            filters: searchOperation.toParams(),
            page: pageNumber,
            limit: resultLimit,
            order: searchOrder
        };

        // Set the params needed for download API call
        this.searchRequest = SearchHelper.performSearch(params);
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
                newState.hasNext = !res.data.page_metadata.has_next_page;

                this.setState(newState);
            })
            .catch((err) => {
                if (isCancel(err)) {
                    // the request was cancelled
                }
                else if (err.response) {
                    // server responded with something
                    console.log(err);
                    this.searchRequest = null;
                }
                else {
                    // request never made it out
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
        const availableFields = TableSearchFields[tab]._mapping;
        if (!availableFields[currentSortField]) {
            // the sort field doesn't exist, use the table type's default field
            const field = TableSearchFields[tab]._defaultSortField;
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

        return null;
        /*
            <AccountAwardsSection
                inFlight={this.state.inFlight}
                results={this.state.results}
                columns={this.state.columns}
                counts={this.state.counts}
                sort={this.state.sort}
                tableTypes={tableTypes}
                currentType={this.state.tableTypes}
                tableInstance={this.state.tableInstance}
                switchTab={this.switchTab}
                updateSort={this.updateSort}
                loadNextPage={this.loadNextPage} />
        );*/
    }
}

AccountAwardsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        account: state.account.account,
        filters: state.account.filters,
        awards: state.account.awards,
        meta: state.account.awardsMeta,
        order: state.account.awardsOrder
    }),
    (dispatch) => bindActionCreators(accountActions, dispatch)
)(AccountAwardsContainer);
