/**
  * SearchContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import SearchPage from 'components/search/SearchPage';

import SearchOperation from 'models/search/SearchOperation';
import * as SearchHelper from 'helpers/searchHelper';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as searchResultActions from 'redux/actions/search/searchResultActions';

// combine the filter and result Redux actions into one object for the React-Redux connector
const combinedActions = Object.assign({}, searchFilterActions, searchResultActions);

const propTypes = {
    setSearchResults: React.PropTypes.func,
    setSearchResultMeta: React.PropTypes.func,
    search: React.PropTypes.object
};

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchParams: new SearchOperation(),
            page: 0
        };
    }
    componentDidMount() {
        this.updateFilters();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.search.filters, this.props.search.filters)) {
            // filters changed, update the search object
            this.updateFilters();
        }
    }

    updateFilters() {
        const newSearch = new SearchOperation();
        newSearch.fromState(this.props.search.filters);
        this.setState({
            searchParams: newSearch
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
        this.state.searchParams.timePeriodRange = ['2016-01-01', '2016-06-30'];
        SearchHelper.performPagedSearch(this.state.searchParams.toParams())
            .then((res) => {
                const data = res.data;
                this.props.setSearchResults(data.results);
                this.props.setSearchResultMeta({
                    page: data.page_metadata,
                    total: data.total_metadata
                });
            })
            .catch((err) => {
                if (err.response) {
                    // server responded with something

                }
                else {
                    // request never made it out
                    console.log(err.message);
                }
            });
    }

    render() {
        return (
            <SearchPage {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ search: state.search }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(SearchContainer);

SearchContainer.propTypes = propTypes;
