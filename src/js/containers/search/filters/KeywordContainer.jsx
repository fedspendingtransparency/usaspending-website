/**
  * KeywordContainer.jsx
  * Created by Emily Gullo 11/30/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import Keyword from 'components/search/filters/keyword/Keyword';

const propTypes = {
    keyword: PropTypes.object,
    appliedFilter: PropTypes.object,
    updateTextSearchInput: PropTypes.func
};

export class KeywordContainer extends React.Component {
    constructor(props) {
        super(props);

        this.toggleKeyword = this.toggleKeyword.bind(this);
    }

    toggleKeyword(value) {
        this.props.updateTextSearchInput(value);
    }

    dirtyFilter() {
        if (is(this.props.appliedFilter, this.props.keyword)) {
            return null;
        }
        return Symbol('dirty keywords');
    }

    render() {
        return (
            <Keyword
                dirtyFilter={this.dirtyFilter()}
                selectedKeywords={this.props.keyword.toArray()}
                toggleKeyword={this.toggleKeyword} />
        );
    }
}

KeywordContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        keyword: state.filters.keyword,
        appliedFilter: state.appliedFilters.filters.keyword
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(KeywordContainer);
