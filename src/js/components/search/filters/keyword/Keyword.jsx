/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'components/sharedComponents/icons/Icons';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';

const propTypes = {
    selectedKeyword: PropTypes.string,
    submitText: PropTypes.func,
    changedInput: PropTypes.func,
    removeKeyword: PropTypes.func,
    value: PropTypes.string,
    dirtyFilter: PropTypes.bool
};

export default class Keyword extends React.Component {
    constructor(props) {
        super(props);

        this.searchKeyword = this.searchKeyword.bind(this);
    }

    searchKeyword(e) {
        e.preventDefault();
        this.props.submitText();
    }

    render() {
        let hideTags = 'hide';
        if (this.props.selectedKeyword !== '') {
            hideTags = '';
        }

        let hint = null;
        if (this.props.dirtyFilter) {
            hint = <SubmitHint />;
        }

        return (
            <div className="keyword-filter search-filter">
                <form onSubmit={this.searchKeyword}>
                    <div className="filter-item-wrap">
                        <div className="keyword-input-wrapper">
                            <input
                                id="search"
                                type="text"
                                className="keyword-input"
                                placeholder="Search by Keyword"
                                value={this.props.value}
                                onChange={this.props.changedInput} />
                            <IndividualSubmit
                                className="keyword-submit"
                                onClick={this.searchKeyword}
                                label="Filter by keyword" />
                        </div>
                        <div className={`selected-filters ${hideTags}`}>
                            <button
                                className="shown-filter-button"
                                onClick={this.props.removeKeyword}>
                                <span className="close">
                                    <Close className="usa-da-icon-close" />
                                </span>
                                {this.props.selectedKeyword}
                            </button>
                        </div>
                        {hint}
                    </div>
                </form>
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
