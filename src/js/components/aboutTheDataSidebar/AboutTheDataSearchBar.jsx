/**
 * AboutTheDataSearchBar.jsx
 * Created by Brian Petway 11/30/22
 */

// Disabling max-len property for readability / editability
/* eslint-disable max-len */

import React, { useEffect, useState, useCallback } from 'react';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { useDispatch } from 'react-redux';
import { Search } from 'components/sharedComponents/icons/Icons';
import PropTypes from "prop-types";

const propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    setAboutTheDataSearchValue: PropTypes.func,
    performSearch: PropTypes.func
};

const AboutTheDataSearchBar = (props) => {
    const { searchTerm, setSearchTerm, performSearch } = props;
    const [searchTimer, setSearchTimer] = useState(0);
    const dispatch = useDispatch();

    const localPerformSearch = useCallback((term) => {
        if (searchTimer) {
            // clear any existing timers, it's old data
            window.clearTimeout(searchTimer);
        }

        if (term.length > 0 && term.length < 3) {
            // do not perform a search because the search term is too short
            // but DO allow an empty string (which indicates a request for the full list)
            // TODO: if there is something on redux clear it
            return;
        }

        // wait for typing to stop 300ms before performing search
        setSearchTimer(() => {
            window.setTimeout(() => {
                performSearch(term);
            }, 300);
        });
    });

    const changedSearchValue = (e) => {
        setSearchTerm(e.target.value);
        // set it in redux too
        dispatch(aboutTheDataActions.setAboutTheDataSearchValue(e.target.value));
        localPerformSearch(e.target.value);
    };

    useEffect(() => {
        if (searchTerm) {
            localPerformSearch(searchTerm);
        }
    }, [localPerformSearch, searchTerm]);

    const submitSearch = (e) => {
        e.preventDefault();
        localPerformSearch(searchTerm);
    };

    return (
        <div className="atd-search-bar">
            <form onSubmit={submitSearch}>
                {/* eslint-disable-next-line react/void-dom-elements-no-children */}
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search for a topic..."
                    onChange={changedSearchValue}
                    value={searchTerm} />
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

AboutTheDataSearchBar.propTypes = propTypes;
export default AboutTheDataSearchBar;
