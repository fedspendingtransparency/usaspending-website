/**
  * ResultsTableContainer.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ResultsTable from 'components/search/table/ResultsTable';

import * as searchResultActions from 'redux/actions/search/searchResultActions';

class ResultsTableContainer extends React.Component {
    render() {
        return (
            <ResultsTable {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ results: state.search.results }),
    (dispatch) => bindActionCreators(searchResultActions, dispatch)
)(ResultsTableContainer);
