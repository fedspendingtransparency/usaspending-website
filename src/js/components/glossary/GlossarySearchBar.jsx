/**
 * GlossarySearchBar.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSearchValue } from "redux/actions/glossary/glossaryActions";
import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    glossary: PropTypes.object,
    performSearch: PropTypes.func
};

const GlossarySearchBar = ({ glossary, performSearch }) => {
    const timerRef = useRef(null);

    const dispatch = useDispatch();

    const performSearchLocal = (term) => {
        if (timerRef.current) {
            // clear any existing timers, it's old data
            window.clearTimeout(timerRef.current);
        }

        dispatch(setSearchValue(term));

        if (term.length > 0 && term.length < 3) {
            // do not perform a search because the search term is too short
            // but DO allow an empty string (which indicates a request for the full list)
            return;
        }

        // wait for typing to stop 300ms before performing search
        timerRef.current = window.setTimeout(() => {
            performSearch(term);
        }, 300);
    };

    const changedSearchValue = (e) => {
        performSearchLocal(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        performSearchLocal(glossary.search.input);
    };

    return (
        <div className="glossary-search-bar">
            <form onSubmit={submitSearch}>
                <input
                    className="search-field"
                    type="text"
                    value={glossary.search.input}
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
