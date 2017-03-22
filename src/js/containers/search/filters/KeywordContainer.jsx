/**
  * KeywordContainer.jsx
  * Created by Emily Gullo 11/30/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import Keyword from 'components/search/filters/keyword/Keyword';

const propTypes = {
    updateTextSearchInput: React.PropTypes.func
};

const ga = require('react-ga');

export class KeywordContainer extends React.Component {

    static logFilterEvent() {
        ga.event({
            category: 'Search Filters',
            action: 'Applied Filter',
            label: 'Keyword'
        });
    }

    static logSelectedKeywordEvent(keyword) {
        ga.event({
            category: 'Search Filters',
            action: 'Selected Keyword',
            label: keyword
        });
    }

    constructor(props) {
        super(props);

        this.submitText = this.submitText.bind(this);
    }

    submitText(value) {
        // take in keywords and pass to redux
        if (value !== null) {
            this.props.updateTextSearchInput(value);

            // Analytics
            KeywordContainer.logFilterEvent();
            KeywordContainer.logSelectedKeywordEvent(this.keyword.value);
        }
    }

    render() {
        return (
            <Keyword
                submitText={this.submitText} />
        );
    }
}

KeywordContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        keyword: state.filters.keyword }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(KeywordContainer);
