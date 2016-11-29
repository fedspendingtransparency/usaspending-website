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
import * as SearchHelper from 'helpers/searchHelper';

import TableSearchFields from 'dataMapping/search/tableSearchFields';

import SearchActions from 'redux/actions/searchActions';
import AwardSummary from 'models/results/award/AwardSummary';

const propTypes = {
    filters: React.PropTypes.object,
    metaType: React.PropTypes.string,
    clearRecords: React.PropTypes.func,
    bulkInsertRecordSet: React.PropTypes.func,
    setSearchResultMeta: React.PropTypes.func,
    triggerBatchUpdate: React.PropTypes.func
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

    shouldComponentUpdate(nextProps) {
        if (nextProps.filters !== this.props.filters) {
            // filters changed
            return true;
        }
        else if (nextProps.metaType !== this.props.metaType) {
            // table type has changed
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
    }

    updateFilters() {
        const newSearch = new SearchOperation();
        newSearch.fromState(this.props.filters);
        this.setState({
            searchParams: newSearch
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
        if (this.searchRequest) {
            // a request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }

        this.searchRequest = SearchHelper.performPagedSearch(this.state.searchParams.toParams(), 1,
            30, TableSearchFields[this.props.metaType]._api);
        this.searchRequest.promise
            .then((res) => {
                this.props.clearRecords();
                const data = res.data;
                this.saveData(data.results);

                this.props.setSearchResultMeta({
                    page: data.page_metadata,
                    total: data.total_metadata
                });

                // request is done
                this.searchRequest = null;

                // trigger a batch update
                this.props.triggerBatchUpdate();
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
                    this.searchRequest = null;
                    console.log(err.message);
                }
            });
    }

    saveData(data) {
        // iterate through the result set and create model instances
        // save each model to Redux
        const awards = [];

        data.forEach((awardData) => {
            // convert the data record to a model object
            const award = new AwardSummary(awardData);
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
        metaPage: state.resultsMeta.page.page_number,
        metaType: state.resultsMeta.tableType
    }),
    (dispatch) => bindActionCreators(SearchActions, dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
