/**
 * GlossarySearchBar.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    glossary: PropTypes.object,
    setSearchValue: PropTypes.func,
    performSearch: PropTypes.func
};

export default class GlossarySearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.searchTimer = null;
        this.changedSearchValue = this.changedSearchValue.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    changedSearchValue(e) {
        this.performSearch(e.target.value);
    }

    submitSearch(e) {
        e.preventDefault();
        this.performSearch(this.props.glossary.search.input);
    }

    performSearch(term) {
        if (this.searchTimer) {
            // clear any existing timers, it's old data
            window.clearTimeout(this.searchTimer);
        }

        this.props.setSearchValue(term);

        if (term.length > 0 && term.length < 3) {
            // do not perform a search because the search term is too short
            // but DO allow an empty string (which indicates a request for the full list)
            return;
        }

        // wait for typing to stop 300ms before performing search
        this.searchTimer = window.setTimeout(() => {
            this.props.performSearch();
        }, 300);
    }

    render() {
        return (
            <div className="glossary-search-bar">
                <form onSubmit={this.submitSearch}>
                    <input
                        className="search-field"
                        type="text"
                        value={this.props.glossary.search.input}
                        placeholder="Search for a term..."
                        onChange={this.changedSearchValue} />
                    <button
                        aria-label="Search"
                        className="search-button"
                        type="submit">
                        <Search alt="Search" />
                    </button>
                </form>
            </div>
        );
    }
}

GlossarySearchBar.propTypes = propTypes;
