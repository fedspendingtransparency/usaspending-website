/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { isCancel } from 'axios';
import { difference } from 'lodash';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';
import * as SearchHelper from 'helpers/searchHelper';

import { awardTypeGroups } from 'dataMapping/search/awardType';

import { availableColumns, defaultColumns, defaultSort } from
    'dataMapping/search/awardTableColumns';
import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';
import { measureTableHeader } from 'helpers/textMeasurement';

import ResultsTableSection from 'components/search/table/ResultsTableSection';

import SearchActions from 'redux/actions/searchActions';

const propTypes = {
    filters: PropTypes.object,
    rows: PropTypes.instanceOf(Immutable.List),
    meta: PropTypes.object,
    batch: PropTypes.instanceOf(Immutable.Record),
    searchOrder: PropTypes.object,
    setSearchTableType: PropTypes.func,
    setSearchPageNumber: PropTypes.func,
    setSearchOrder: PropTypes.func,
    clearRecords: PropTypes.func,
    bulkInsertRecordSet: PropTypes.func,
    setSearchResultMeta: PropTypes.func,
    setSearchInFlight: PropTypes.func,
    triggerBatchSearchUpdate: PropTypes.func,
    triggerBatchQueryUpdate: PropTypes.func,
    columnVisibility: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    reorderColumns: PropTypes.func,
    populateAvailableColumns: PropTypes.func
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

export class ResultsTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchParams: new SearchAwardsOperation(),
            page: 0,
            downloadParams: {},
            counts: {}
        };

        this.tabCountRequest = null;
        this.searchRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.toggleColumnVisibility = this.toggleColumnVisibility.bind(this);
        this.reorderColumns = this.reorderColumns.bind(this);
    }

    componentDidMount() {
        // set some default columns to look at while the initial tab-picker API calls are in flight
        // we can't hide the table entirely because the viewport is required to calculate the
        // row rendering
        this.loadColumns();
        this.pickDefaultTab();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters !== this.props.filters) {
            // filters changed, update the search object
            this.pickDefaultTab();
        }
        else if (prevProps.meta.tableType !== this.props.meta.tableType) {
            // table type has changed
            this.updateFilters();
        }
        else if (prevProps.searchOrder !== this.props.searchOrder) {
            // the sort order changed
            this.updateFilters();
        }
        else if (prevProps.meta.page.page_number !==
            this.props.meta.page.page_number && this.props.meta.page.page_number) {
            // page number has changed
            if (this.props.meta.page.page_number !== this.state.page) {
                // this check prevents duplicated API calls that result from Redux updating the
                // page number prop back to 1 after a filter/order/tab change (which already
                // triggers a page 1 search)
                this.performSearch();
            }
        }
        else if (prevProps.columnVisibility[prevProps.meta.tableType].visibleOrder !==
            this.props.columnVisibility[this.props.meta.tableType].visibleOrder) {
            // Visible columns have changed
            // we don't need to reload the table columns because the Redux store is the source
            // of truth for which columns are visible
            if (prevProps.columnVisibility[prevProps.meta.tableType].visibleOrder.count() > 0) {
                // if the previous visible column count was 0, then that just meant the initial
                // column set hadn't loaded yet, we don't need to do a new search in that case (bc
                // it means we're still loading the page)
                this.performSearch(true);
            }
        }
    }

    pickDefaultTab() {
        // get the award counts for the current filter set
        if (this.tabCountRequest) {
            this.tabCountRequest.cancel();
        }

        this.props.setSearchInFlight(true);

        const searchParams = new SearchAwardsOperation();
        searchParams.fromState(this.props.filters);

        this.tabCountRequest = SearchHelper.performSpendingByAwardTabCountSearch({
            filters: searchParams.toParams(),
            auditTrail: 'Award Table - Tab Counts'
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
        const newSearch = new SearchAwardsOperation();
        newSearch.fromState(this.props.filters);
        this.setState({
            searchParams: newSearch,
            page: 1
        }, () => {
            this.performSearch(true);
        });
    }

    loadColumns() {
        // in the future, this will be an API call, but for now, read the local data file
        // load every possible table column up front, so we don't need to deal with this when
        // switching tabs
        const columns = {};
        tableTypes.forEach((type) => {
            const allColumns = availableColumns(type.internal);
            const visibleOrder = defaultColumns(type.internal);
            const hiddenOrder = difference(allColumns, visibleOrder);

            const parsedColumns = {};
            allColumns.forEach((title) => {
                parsedColumns[title] = this.createColumn(title);
            });

            columns[type.internal] = {
                visibleOrder,
                hiddenOrder,
                data: parsedColumns
            };
        });

        // save the values to redux
        this.props.populateAvailableColumns(columns);
    }

    createColumn(title) {
        // create an object that integrates with the expected column data structure used by
        // the table component
        const dataType = awardTableColumnTypes[title];
        let direction = 'asc';
        if (dataType === 'number' || dataType === 'currency') {
            direction = 'desc';
        }

        const column = {
            columnName: title,
            displayName: title,
            width: measureTableHeader(title),
            defaultDirection: direction
        };

        return column;
    }

    performSearch(newSearch = false) {
        if (this.searchRequest) {
            // a request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        const tableType = this.props.meta.tableType;

        // append the table type to the current search params
        const searchParams = Object.assign(new SearchAwardsOperation(), this.state.searchParams);
        searchParams.awardType = awardTypeGroups[tableType];


        // indicate the request is about to start
        this.props.setSearchInFlight(true);

        let pageNumber = this.props.meta.page.page_number;
        if (newSearch) {
            // a new search (vs just getting more pages of an existing search) requires resetting
            // the page number
            pageNumber = 1;
        }
        const resultLimit = 60;

        const requestFields = ['Award ID'];

        // Request fields for visible columns only
        const columnVisibility = this.props.columnVisibility[tableType].visibleOrder;

        columnVisibility.forEach((field) => {
            if (!requestFields.includes(field)) {
                // Prevent duplicates in the list of fields to request
                requestFields.push(field);
            }
        });

        // parse the redux search order into the API-consumable format
        const searchOrder = this.props.searchOrder.toJS();
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
            order: sortDirection
        };

        this.searchRequest = SearchHelper.performSpendingByAwardSearch(params);
        this.searchRequest.promise
            .then((res) => {
                this.props.setSearchInFlight(false);

                // don't clear records if we're appending (not the first page)
                if (pageNumber <= 1 || newSearch) {
                    this.props.clearRecords();
                }

                // parse the response
                const data = res.data;
                this.parseData(data.results);

                this.props.setSearchResultMeta({
                    page: data.page_metadata,
                    total: data.total_metadata
                });

                // Set the params needed for download API call
                this.setState({
                    downloadParams: {
                        filters: searchParams.toParams(),
                        order: searchOrder,
                        sort: searchOrder.field,
                        fields: requestFields
                    }
                });

                // request is done
                this.searchRequest = null;
                // trigger a batch update
                if (newSearch) {
                    this.props.triggerBatchSearchUpdate();
                }
                else {
                    this.props.triggerBatchQueryUpdate();
                    this.setState({
                        page: data.page_metadata.page_number
                    });
                }
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

    parseData(data) {
        // write all records into Redux
        this.props.bulkInsertRecordSet({
            data,
            type: 'awards'
        });
    }

    switchTab(tab) {
        this.props.setSearchTableType(tab);
        const currentSortField = this.props.searchOrder.field;

        // check if the current sort field is available in the table type
        const availableFields = this.props.columnVisibility[tab].data;
        if (!availableFields.has(currentSortField)) {
            // the sort field doesn't exist, use the table type's default field
            const field = defaultSort(tab);
            const fieldType = awardTableColumnTypes[field];
            let direction = 'desc';
            if (fieldType === 'number') {
                direction = 'asc';
            }

            this.props.setSearchOrder({
                field,
                direction
            });
        }
    }

    loadNextPage() {
        // check if request is already in-flight
        if (this.props.meta.inFlight) {
            // in-flight, ignore this request
            return;
        }
        // check if more pages are available
        if (this.props.meta.page.hasNext) {
            // more pages are available, load them
            this.props.setSearchPageNumber(this.props.meta.page.page + 1);
        }
    }

    toggleColumnVisibility(column) {
        const tableType = this.props.meta.tableType;
        this.props.toggleColumnVisibility({
            column,
            tableType
        });
    }

    reorderColumns(dragIndex, hoverIndex) {
        const tableType = this.props.meta.tableType;
        this.props.reorderColumns({
            tableType,
            dragIndex,
            hoverIndex
        });
    }

    render() {
        const tableType = this.props.meta.tableType;
        return (
            <ResultsTableSection
                batch={this.props.batch}
                inFlight={this.props.meta.inFlight}
                results={this.props.rows.toArray()}
                resultsMeta={this.props.meta}
                columns={this.props.columnVisibility[tableType]}
                counts={this.state.counts}
                toggleColumnVisibility={this.toggleColumnVisibility}
                reorderColumns={this.reorderColumns}
                tableTypes={tableTypes}
                currentType={this.props.meta.tableType}
                switchTab={this.switchTab}
                loadNextPage={this.loadNextPage}
                downloadParams={this.state.downloadParams} />
        );
    }
}

ResultsTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        filters: state.filters,
        rows: state.records.awards,
        meta: state.resultsMeta.toJS(),
        batch: state.resultsBatch,
        searchOrder: state.searchOrder,
        columnVisibility: state.columnVisibility
    }),
    (dispatch) => bindActionCreators(SearchActions, dispatch)
)(ResultsTableContainer);
