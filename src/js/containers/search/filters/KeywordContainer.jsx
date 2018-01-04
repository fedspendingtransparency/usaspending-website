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
    keyword: PropTypes.string,
    appliedFilter: PropTypes.string,
    updateTextSearchInput: PropTypes.func
};

const ga = require('react-ga');

export class KeywordContainer extends React.Component {
    static logSelectedKeywordEvent(keyword) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: 'Applied Keyword Filter',
            label: keyword
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.submitText = this.submitText.bind(this);
        this.changedInput = this.changedInput.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
    }

    componentWillMount() {
        if (this.props.keyword !== '') {
            this.populateInput(this.props.keyword);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.keyword !== this.state.defaultValue) {
            this.populateInput(nextProps.keyword);
        }
    }

    populateInput(value) {
        this.setState({
            value
        });
    }

    changedInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    submitText() {
        // take in keywords and pass to redux
        this.props.updateTextSearchInput(this.state.value);

        // Analytics
        if (this.state.value) {
            KeywordContainer.logSelectedKeywordEvent(this.state.value);
        }
    }

    removeKeyword() {
        this.setState({
            value: ''
        }, () => {
            this.submitText();
        });
    }

    dirtyFilter() {
        if (is(this.props.appliedFilter, this.props.keyword)) {
            return '';
        }
        return this.props.keyword;
    }

    render() {
        return (
            <Keyword
                dirtyFilter={this.dirtyFilter()}
                value={this.state.value}
                selectedKeyword={this.props.keyword}
                changedInput={this.changedInput}
                submitText={this.submitText}
                removeKeyword={this.removeKeyword} />
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
