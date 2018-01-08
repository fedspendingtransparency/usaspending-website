/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'components/sharedComponents/icons/Icons';

import IndividualSubmit from 'components/search/filters/IndividualSubmit';

const propTypes = {
    selectedKeyword: PropTypes.string,
    submitText: PropTypes.func,
    changedInput: PropTypes.func,
    removeKeyword: PropTypes.func,
    value: PropTypes.string
};

export default class Keyword extends React.Component {
    constructor(props) {
        super(props);

        this.searchKeyword = this.searchKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
    }

    searchKeyword(e) {
        e.preventDefault();
        this.props.submitText();
    }

    removeKeyword() {
        if (this.searchInput) {
            // focus on the input field for accessibility users
            this.searchInput.focus();
        }
        this.props.removeKeyword();
    }

    render() {
        let hideTags = 'hide';
        if (this.props.selectedKeyword !== '') {
            hideTags = '';
        }

        const accessibility = {
            'aria-controls': 'selected-keyword-tags'
        };

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
                                onChange={this.props.changedInput}
                                ref={(input) => {
                                    this.searchInput = input;
                                }} />
                            <IndividualSubmit
                                className="keyword-submit"
                                onClick={this.searchKeyword}
                                label="Filter by keyword"
                                accessibility={accessibility} />
                        </div>
                        <div
                            className={`selected-filters ${hideTags}`}
                            id="selected-keyword-tags"
                            role="status">
                            <button
                                className="shown-filter-button"
                                onClick={this.removeKeyword}
                                title="Click to remove filter."
                                aria-label={`Applied keyword filter: ${this.props.selectedKeyword}`}>
                                <span className="close">
                                    <Close
                                        className="usa-da-icon-close"
                                        alt="Close icon" />
                                </span>
                                {this.props.selectedKeyword}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
