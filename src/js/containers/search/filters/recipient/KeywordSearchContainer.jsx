/**
 * KeyWordSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import KeywordSearch from './../../../../../js/components/search/filters/keyword/KeywordSearch';

const propTypes = {
    updateSelectedKeywords: PropTypes.func,
    selectedKeywords: PropTypes.object,
    appliedKeywords: PropTypes.object
};

export class KeyWordSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.toggleKeywords = this.toggleKeywords().bind(this);
    }

    toggleKeywords(keyword) {
        this.props.selectedKeywords(keyword);
    }

    dirtyFilters() {
        if (is(this.props.selectedKeywords, this.props.appliedKeywords)) {
            return null;
        }
        return Symbol('dirty recipients');
    }

    render() {
        return (
            <KeywordSearch
                {...this.props}
                dirtyFilters={this.dirtyFilters()}
                toggleKeywords={this.toggleKeywords} />
        );
    }
}

KeyWordSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedKeywords: state.filters.selectedKeywords,
        appliedKeywords: state.appliedFilters.filters.selectedKeywords
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(KeyWordSearchContainer);
