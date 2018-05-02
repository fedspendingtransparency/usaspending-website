/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import SelectedKeywords from './SelectedKeywords';

const propTypes = {
    selectedKeyword: PropTypes.object,
    submitText: PropTypes.func,
    changedInput: PropTypes.func,
    removeKeyword: PropTypes.func,
    value: PropTypes.string,
    dirtyFilter: PropTypes.string
};

export default class Keyword extends React.Component {
    constructor(props) {
        super(props);

        this.searchKeyword = this.searchKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilter && prevProps.dirtyFilter !== this.props.dirtyFilter) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
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
        if (this.props.selectedKeyword.size !== 0) {
            hideTags = '';
        }

        const accessibility = {
            'aria-controls': 'selected-keyword-tags'
        };

        let selectedKeywords = null;

        if (this.props.selectedKeyword.size > 0) {
            selectedKeywords = (<SelectedKeywords
                removeKeyword={this.props.removeKeyword}
                selectedKeyword={this.props.selectedKeyword} />);
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
                        {selectedKeywords}
                        <SubmitHint
                            ref={(component) => {
                                this.hint = component;
                            }} />
                    </div>
                </form>
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
