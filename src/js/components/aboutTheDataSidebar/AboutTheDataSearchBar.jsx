/**
 * AboutTheDataSearchBar.jsx
 * Created by Brian Petway 11/30/22
 */

// Disabling max-len property for readability / editability
/* eslint-disable max-len */

import React, { useState } from 'react';
import { Search } from 'components/sharedComponents/icons/Icons';
import PropTypes from "prop-types";
import { setAboutTheDataSearchValue } from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";

const propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    setAboutTheDataSearchValue: PropTypes.func,
    performSearch: PropTypes.func
};

const AboutTheDataSearchBar = (props) => {
    const { searchTerm, setSearchTerm, performSearch } = props;
    const [searchTimer, setSearchTimer] = useState(0);

    const localPerformSearch = (term) => {
        if (searchTimer) {
            // clear any existing timers, it's old data
            window.clearTimeout(searchTimer);
        }

        if (term.length > 0 && term.length < 3) {
            // do not perform a search because the search term is too short
            // but DO allow an empty string (which indicates a request for the full list)
            return;
        }

        // wait for typing to stop 300ms before performing search
        setSearchTimer(() => {
            window.setTimeout(() => {
                performSearch(term);
            }, 300);
        });
    };

    const changedSearchValue = (e) => {
        setSearchTerm(e.target.value);
        // set it in redux too
        setAboutTheDataSearchValue(e.target.value);
        localPerformSearch(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        localPerformSearch(searchTerm);
    };

    return (
        <div className="atd-search-bar">
            <form onSubmit={submitSearch}>
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search for a topic..."
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

AboutTheDataSearchBar.propTypes = propTypes;
export default AboutTheDataSearchBar;
