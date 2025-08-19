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

const GlossarySearchBar = (props) => {
    let searchTimer = null;

    const performSearch = (term) => {
        if (searchTimer) {
            // clear any existing timers, it's old data
            window.clearTimeout(searchTimer);
        }

        props.setSearchValue(term);

        if (term.length > 0 && term.length < 3) {
            // do not perform a search because the search term is too short
            // but DO allow an empty string (which indicates a request for the full list)
            return;
        }

        // wait for typing to stop 300ms before performing search
        searchTimer = window.setTimeout(() => {
            props.performSearch();
        }, 300);
    };

    const changedSearchValue = (e) => {
        performSearch(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        performSearch(props.glossary.search.input);
    };

    return (
        <div className="glossary-search-bar">
            <form onSubmit={submitSearch}>
                <input
                    className="search-field"
                    type="text"
                    value={props.glossary.search.input}
                    placeholder="Search for a term..."
                    onChange={changedSearchValue} />
                <button
                    aria-label="Search"
                    className="search-button"
                    type="submit">
                    <Search alt="Search" />
                </button>
            </form>
        </div>
    );
};

GlossarySearchBar.propTypes = propTypes;
export default GlossarySearchBar;
