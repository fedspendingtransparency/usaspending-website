/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { isCancel } from 'axios';

import SearchOperation from 'models/search/SearchOperation';
import SearchSortOrder from 'models/search/SearchSortOrder';
import * as SearchHelper from 'helpers/searchHelper';
import AwardSummary from 'models/results/award/AwardSummary';

import TableSearchFields from 'dataMapping/search/tableSearchFields';
import { awardTypeGroups } from 'dataMapping/search/awardType';

import ResultsTableSection from 'components/search/table/ResultsTableSection';

import SearchActions from 'redux/actions/searchActions';

const propTypes = {
    filters: React.PropTypes.object,
    rows: React.PropTypes.instanceOf(Immutable.List),
    meta: React.PropTypes.object,
    batch: React.PropTypes.instanceOf(Immutable.Record),
    searchOrder: React.PropTypes.object,
    setSearchTableType: React.PropTypes.func,
    setSearchPageNumber: React.PropTypes.func,
    setSearchOrder: React.PropTypes.func,
    clearRecords: React.PropTypes.func,
    bulkInsertRecordSet: React.PropTypes.func,
    setSearchResultMeta: React.PropTypes.func,
    setSearchInFlight: React.PropTypes.func,
    triggerBatchSearchUpdate: React.PropTypes.func,
    triggerBatchQueryUpdate: React.PropTypes.func
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
        label: 'Insurance',
        internal: 'insurance',
        enabled: true
    }
];

export class ResultsTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            searchParams: new SearchOperation(),
            page: 0,
            lastReq: ''
        };

        this.searchRequest = null;

        this.switchTab = this.switchTab.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidMount() {
        this.updateFilters();
        this.showColumns(this.props.meta.tableType);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters !== this.props.filters) {
            // filters changed, update the search object
            this.updateFilters();
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
            this.props.meta.page.page_number) {
            // page number has changed
            if (this.props.meta.page.page_number !== this.state.page) {
                // this check prevents duplicated API calls that result from Redux updating the
                // page number prop back to 1 after a filter/order/tab change (which already
                // triggers a page 1 search)
                this.performSearch();
            }
        }
    }

    showColumns(tableType) {
         // calculate the column metadata to display in the table
        const columns = [];
        let sortOrder = TableSearchFields.defaultSortDirection;
        let columnWidths = TableSearchFields.columnWidths;

        if (tableType === 'loans') {
            sortOrder = TableSearchFields.loans.sortDirection;
            columnWidths = TableSearchFields.loans.columnWidths;
        }

        const tableSettings = TableSearchFields[tableType];

        tableSettings._order.forEach((col) => {
            const column = {
                columnName: col,
                displayName: tableSettings[col],
                width: columnWidths[col],
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        this.setState({
            columns
        });
    }

    updateFilters() {
        const newSearch = new SearchOperation();
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
        const searchParams = Object.assign(new SearchOperation(), this.state.searchParams);
        const tableAwardTypes = awardTypeGroups[tableType];
        searchParams.resultAwardType = tableAwardTypes;

        // parse the redux search order into the API-consumable format
        const searchOrder = new SearchSortOrder();
        searchOrder.parseReduxState(tableType, this.props.searchOrder.toJS());
        const sortParams = searchOrder.toParams();

        // indicate the request is about to start
        this.props.setSearchInFlight(true);

        let pageNumber = this.props.meta.page.page_number;
        if (newSearch) {
            // a new search (vs just getting more pages of an existing search) requires resetting
            // the page number
            pageNumber = 1;
        }
        const resultLimit = 60;

        this.searchRequest = SearchHelper.performPagedSearch(searchParams.toParams(),
            pageNumber, resultLimit, sortParams,
            TableSearchFields[tableType]._requestFields);

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

                this.setState({
                    lastReq: res.data.req
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
            const idField = TableSearchFields[this.props.meta.tableType]._mapping.awardId;
            const award = new AwardSummary(awardData, idField);
            awards.push(award);
        });

        // write all records into Redux
        this.props.bulkInsertRecordSet({
            type: 'awards',
            data: awards
        });
    }

    switchTab(tab) {
        this.props.setSearchTableType(tab);
        const currentSortField = this.props.searchOrder.field;

        // check if the current sort field is available in the table type
        if (!Object.hasOwnProperty.call(TableSearchFields[tab], currentSortField)) {
            // the sort field doesn't exist, use the table type's default field
            const field = TableSearchFields[tab]._defaultSortField;
            let direction = TableSearchFields.defaultSortDirection[field];
            if (tab === 'loans') {
                direction = TableSearchFields.loans.sortDirection[field];
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


    render() {
        return (
            <ResultsTableSection
                batch={this.props.batch}
                inFlight={this.props.meta.inFlight}
                results={this.props.rows.toArray()}
                resultsMeta={this.props.meta}
                columns={this.state.columns}
                tableTypes={tableTypes}
                currentType={this.props.meta.tableType}
                switchTab={this.switchTab}
                loadNextPage={this.loadNextPage}
                lastReq={this.state.lastReq} />
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
        searchOrder: state.searchOrder
    }),
    (dispatch) => bindActionCreators(SearchActions, dispatch)
)(ResultsTableContainer);
