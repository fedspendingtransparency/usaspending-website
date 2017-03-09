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
    updateTextSearchInput: React.PropTypes.func,
    clearFilterType: React.PropTypes.func,
    keyword: React.PropTypes.string
};

export class KeywordContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newKeyword: '',
            keyword: ''
        };

        this.submitText = this.submitText.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            newKeyword: e.target.value
        });
    }

    submitText() {
        // remove any previous keyword applied in redux
        if (this.props.keyword !== null) {
            this.props.clearFilterType();
        }
        // take in keywords and pass to redux
        if (this.state.newKeyword !== null) {
            this.props.updateTextSearchInput(this.state.newKeyword);
        }
    }

    // add redux value to filter values

    // resubmit filters

    render() {
        return (
            <Keyword
                submitText={this.submitText}
                handleChange={this.handleChange} />
        );
    }
}

KeywordContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        keyword: state.filters.keyword }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(KeywordContainer);
