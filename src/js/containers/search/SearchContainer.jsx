/**
  * SearchContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import SearchPage from 'components/search/SearchPage';

import SearchOperation from 'models/search/SearchOperation';
import SearchSortOrder from 'models/search/SearchSortOrder';
import * as SearchHelper from 'helpers/searchHelper';

import TableSearchFields from 'dataMapping/search/tableSearchFields';
import { awardTypeGroups } from 'dataMapping/search/awardType';

import SearchActions from 'redux/actions/searchActions';
import AwardSummary from 'models/results/award/AwardSummary';

const propTypes = {
    filters: React.PropTypes.object,
    meta: React.PropTypes.object,
    order: React.PropTypes.object,
    clearRecords: React.PropTypes.func,
    bulkInsertRecordSet: React.PropTypes.func,
    setSearchResultMeta: React.PropTypes.func,
    setSearchInFlight: React.PropTypes.func,
    triggerBatchSearchUpdate: React.PropTypes.func,
    triggerBatchQueryUpdate: React.PropTypes.func
};

class SearchContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            searchParams: new SearchOperation(),
            page: 0
        };

        this.searchRequest = null;
    }

    componentDidMount() {
        this.updateFilters();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.filters !== this.props.filters) {
            // filters changed
            return true;
        }

        if (nextProps.order !== this.props.order) {
            // the sort order changed
            return true;
        }

        if (!Object.is(nextProps.meta, this.props.meta)) {
            // something in the results metadata has changed
            if (nextProps.meta.tableType !== this.props.meta.tableType) {
                // table type has changed
                return true;
            }
            else if (nextProps.meta.page.page_number !==
                this.props.meta.page.page_number) {
                // page number has changed
                return true;
            }
        }

        if (!Object.is(nextState, this.state)) {
            // allow state changes to occur
            return true;
        }

        // something may have changed, but it is out of scope for this component
        return false;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters !== this.props.filters) {
            // filters changed, update the search object
            this.updateFilters();
        }
        else if (prevProps.meta.tableType !== this.props.meta.tableType) {
            // table type has changed
            this.updateFilters();
        }
        else if (prevProps.order !== this.props.order) {
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
        searchOrder.parseReduxState(tableType, this.props.order);
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
                this.saveData(data.results);

                this.props.setSearchResultMeta({
                    page: data.page_metadata,
                    total: data.total_metadata
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

    saveData(data) {
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

    render() {
        return (
            <SearchPage />
        );
    }
}

export default connect(
    (state) => ({
        filters: state.filters,
        order: state.searchOrder,
        meta: state.resultsMeta.toJS(),
        batch: state.resultsBatch.toJS()
    }),
    (dispatch) => bindActionCreators(SearchActions, dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
