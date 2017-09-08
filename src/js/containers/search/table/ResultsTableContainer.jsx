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

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';
import * as SearchHelper from 'helpers/searchHelper';
import ResultsTableAward from 'models/results/award/ResultsTableAward';

import AwardTableSearchFields from 'dataMapping/search/awardTableSearchFields';
import { awardTypeGroups } from 'dataMapping/search/awardType';

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
    reorderColumns: PropTypes.func
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
            columns: [],
            searchParams: new SearchAwardsOperation(),
            page: 0,
            downloadParams: {},
            hiddenColumns: [],
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
        this.showColumns('contracts');
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
            this.showColumns(this.props.meta.tableType);
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
        else if (prevProps.columnVisibility !== this.props.columnVisibility) {
            // Visible columns have changed
            this.performSearch(true);
            this.showColumns(this.props.meta.tableType);
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
            this.showColumns(firstAvailable);
        });
    }

    showColumns(tableType) {
        // calculate the column metadata to display in the table
        const columns = [];
        const hiddenColumns = [];
        let sortOrder = AwardTableSearchFields.defaultSortDirection;
        const columnVisibility = this.props.columnVisibility[tableType];

        if (tableType === 'loans') {
            sortOrder = AwardTableSearchFields.loans.sortDirection;
        }

        const tableSettings = AwardTableSearchFields[tableType];

        columnVisibility.visibleColumns.forEach((col) => {
            const displayName = tableSettings[col];
            const width = measureTableHeader(displayName);
            const column = {
                displayName,
                width,
                columnName: col,
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        columnVisibility.hiddenColumns.forEach((col) => {
            const column = {
                columnName: col,
                displayName: tableSettings[col]
            };
            hiddenColumns.push(column);
        });

        this.setState({
            columns,
            hiddenColumns
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

        const tableType = this.props.meta.tableType;

        // append the table type to the current search params
        const searchParams = Object.assign(new SearchAwardsOperation(), this.state.searchParams);
        searchParams.awardType = awardTypeGroups[tableType];

        // parse the redux search order into the API-consumable format
        const searchOrder = this.props.searchOrder.toJS();
        const order = AwardTableSearchFields[tableType][searchOrder.field];
        const sort = searchOrder.direction;

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
        const columnVisibility = this.props.columnVisibility[tableType];
        const mapping = AwardTableSearchFields[tableType];

        columnVisibility.visibleColumns.forEach((col) => {
            const field = mapping[col];
            if (!requestFields.includes(field)) {
                // Prevent duplicates in the list of fields to request
                requestFields.push(field);
            }
        });

        this.searchRequest = SearchHelper.performPagedSpendingByAwardSearch(searchParams.toParams(),
            pageNumber, resultLimit, sort, order, requestFields, null);

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
                        order,
                        sort,
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
        // iterate through the result set and create model instances
        // save each model to Redux
        const awards = [];

        data.forEach((awardData) => {
            // convert the data record to a model object
            const idField = AwardTableSearchFields[this.props.meta.tableType].award_id;
            const award = new ResultsTableAward(awardData, idField);
            awards.push(awardData);
        });

        // write all records into Redux
        this.props.bulkInsertRecordSet({
            type: 'awards',
            data: data
        });
    }

    switchTab(tab) {
        this.props.setSearchTableType(tab);
        const currentSortField = this.props.searchOrder.field;

        // check if the current sort field is available in the table type
        if (!Object.hasOwnProperty.call(AwardTableSearchFields[tab], currentSortField)) {
            // the sort field doesn't exist, use the table type's default field
            const field = AwardTableSearchFields[tab]._defaultSortField;
            let direction = AwardTableSearchFields.defaultSortDirection[field];
            if (tab === 'loans') {
                direction = AwardTableSearchFields.loans.sortDirection[field];
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
        if (this.props.meta.page.has_next_page) {
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
        return (
            <ResultsTableSection
                batch={this.props.batch}
                inFlight={this.props.meta.inFlight}
                results={this.props.rows.toArray()}
                resultsMeta={this.props.meta}
                columns={this.state.columns}
                counts={this.state.counts}
                hiddenColumns={this.state.hiddenColumns}
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
