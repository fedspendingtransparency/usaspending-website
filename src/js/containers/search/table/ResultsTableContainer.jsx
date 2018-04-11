/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId, intersection } from 'lodash';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';
import * as SearchHelper from 'helpers/searchHelper';
import Analytics from 'helpers/analytics/Analytics';

import { awardTypeGroups, subawardTypeGroups } from 'dataMapping/search/awardType';

import { defaultColumns, defaultSort } from
    'dataMapping/search/awardTableColumns';
import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import { measureTableHeader } from 'helpers/textMeasurement';

import ResultsTableSection from 'components/search/table/ResultsTableSection';

import searchActions from 'redux/actions/searchActions';
import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';

const propTypes = {
    filters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool
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

export class ResultsTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchParams: new SearchAwardsOperation(),
            page: 0,
            lastPage: true,
            counts: {},
            tableType: 'contracts',
            columns: {},
            sort: {
                field: 'Award Amount',
                direction: 'desc'
            },
            inFlight: true,
            error: false,
            results: [],
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
        this.pickDefaultTab();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters !== this.props.filters && !this.props.noApplied) {
            // filters changed, update the search object
            this.pickDefaultTab();
        }
        else if (prevProps.subaward !== this.props.subaward && !this.props.noApplied) {
            // subaward toggle changed, update the search object
            this.pickDefaultTab();
        }
    }

    loadColumns() {
        // in the future, this will be an API call, but for now, read the local data file
        // load every possible table column up front, so we don't need to deal with this when
        // switching tabs
        const columns = tableTypes.concat(subTypes).reduce((cols, type) => {
            const visibleColumns = defaultColumns(type.internal);
            const parsedColumns = {};
            visibleColumns.forEach((title) => {
                parsedColumns[title] = this.createColumn(title);
            });

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

    createColumn(title) {
        // create an object that integrates with the expected column data structure used by
        // the table component
        // const dataType = awardTableColumnTypes[title];
        // let direction = 'asc';
        // if (dataType === 'number' || dataType === 'currency') {
        //     direction = 'desc';
        // }

        // BODGE: Temporarily only allow descending columns
        const direction = 'desc';

        const column = {
            columnName: title,
            displayName: title,
            width: measureTableHeader(title),
            defaultDirection: direction
        };

        return column;
    }

    pickDefaultTab() {
        // get the award counts for the current filter set
        if (this.tabCountRequest) {
            this.tabCountRequest.cancel();
        }

        this.props.setAppliedFilterCompletion(false);

        this.setState({
            inFlight: true,
            error: false
        });

        const searchParams = new SearchAwardsOperation();
        searchParams.fromState(this.props.filters);

        this.tabCountRequest = SearchHelper.performSpendingByAwardTabCountSearch({
            filters: searchParams.toParams(),
            subawards: this.props.subaward,
            auditTrail: 'Award Table - Tab Counts'
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
                    this.props.setAppliedFilterCompletion(true);

                    console.log(err);
                }
            });
    }

    parseTabCounts(data) {
        const awardCounts = data.results;
        let firstAvailable = '';
        let i = 0;

        const availableTabs = this.props.subaward ? subTypes : tableTypes;

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
            this.updateFilters();
        });
    }

    updateFilters() {
        const newSearch = new SearchAwardsOperation();
        newSearch.fromState(this.props.filters);
        this.setState({
            searchParams: newSearch,
            page: 1
        }, () => {
            this.performSearch(true);
        });
    }

    performSearch(newSearch = false) {
        if (this.searchRequest) {
            // a request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        this.props.setAppliedFilterCompletion(false);

        const tableType = this.state.tableType;

        // Append the current tab's award types to the search params if the Award Type filter
        // isn't populated. If it is, perform a search on the intersection of the current tab's
        // award types and the Award Type filter's content
        const searchParams = Object.assign(new SearchAwardsOperation(), this.state.searchParams);
        // generate an array of award type codes representing the current table tab we're showing
        // and use a different mapping if we're showing a subaward table vs a prime award table
        const groupsFromTableType =
            this.props.subaward ? subawardTypeGroups[tableType] : awardTypeGroups[tableType];

        if (this.state.searchParams.awardType.length === 0) {
            searchParams.awardType = groupsFromTableType;
        }
        else {
            let intersectingTypes = intersection(groupsFromTableType,
                this.state.searchParams.awardType);
            if (!intersectingTypes || intersectingTypes.length === 0) {
                // the filtered types and the table type do not align
                // in this case, send an array of non-existant types because the endpoint requires
                // an award type parameter
                intersectingTypes = ['no intersection'];
            }
            searchParams.awardType = intersectingTypes;
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
        const resultLimit = 60;

        const requestFields = [];

        // Request fields for visible columns only
        const columnVisibility = this.state.columns[tableType].visibleOrder;

        columnVisibility.forEach((field) => {
            if (!requestFields.includes(field)) {
                // Prevent duplicates in the list of fields to request
                requestFields.push(field);
            }
        });

        // parse the redux search order into the API-consumable format
        const searchOrder = this.state.sort;
        let sortDirection = searchOrder.direction;
        if (!sortDirection) {
            sortDirection = 'desc';
        }

        const params = {
            filters: searchParams.toParams(),
            fields: requestFields,
            page: pageNumber,
            limit: resultLimit,
            sort: searchOrder.field,
            order: sortDirection,
            subawards: this.props.subaward
        };

        // Set the params needed for download API call
        this.searchRequest = SearchHelper.performSpendingByAwardSearch(params);
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

                this.props.setAppliedFilterCompletion(true);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false,
                        error: true
                    });
                    this.props.setAppliedFilterCompletion(true);

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
            Analytics.event({
                category: 'Advanced Search - Table Tab',
                action: tab
            });
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
        const tableType = this.state.tableType;
        if (!this.state.columns[tableType]) {
            return null;
        }

        const availableTypes = this.props.subaward ? subTypes : tableTypes;

        return (
            <ResultsTableSection
                error={this.state.error}
                inFlight={this.state.inFlight}
                results={this.state.results}
                columns={this.state.columns[tableType]}
                counts={this.state.counts}
                sort={this.state.sort}
                tableTypes={availableTypes}
                currentType={tableType}
                tableInstance={this.state.tableInstance}
                switchTab={this.switchTab}
                updateSort={this.updateSort}
                loadNextPage={this.loadNextPage}
                subaward={this.props.subaward} />
        );
    }
}

ResultsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        filters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(Object.assign({}, searchActions, appliedFilterActions), dispatch)
)(ResultsTableContainer);
