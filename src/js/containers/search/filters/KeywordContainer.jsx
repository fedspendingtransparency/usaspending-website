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
    keyword: React.PropTypes.string,
    updateTextSearchInput: React.PropTypes.func
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
        KeywordContainer.logSelectedKeywordEvent(this.state.value);
    }

    render() {
        return (
            <Keyword
                value={this.state.value}
                changedInput={this.changedInput}
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
