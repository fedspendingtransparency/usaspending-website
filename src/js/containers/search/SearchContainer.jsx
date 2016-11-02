/**
  * SearchContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchPage from '../../components/search/SearchPage';

import SearchOperation from '../../models/search/SearchOperation';
import * as SearchHelper from '../../helpers/searchHelper';

import * as searchFilterActions from '../../redux/actions/search/searchFilterActions';
import * as searchResultActions from '../../redux/actions/search/searchResultActions';

// combine the filter and result Redux actions into one object for the React-Redux connector
const combinedActions = Object.assign({}, searchFilterActions, searchResultActions);

const propTypes = {
    setSearchResults: React.PropTypes.func
};

class SearchContainer extends React.Component {
    componentDidMount() {
        this.performSearch();
    }

    performSearch(parameters) {
        const operation = new SearchOperation();
        operation.awardType = ['04', '02'];
        operation.timePeriodRange = ['2016-01-01', '2016-06-30'];

        SearchHelper.performPagedSearch(operation.toParams());
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
