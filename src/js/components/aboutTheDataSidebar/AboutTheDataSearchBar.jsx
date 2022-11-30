/**
 * AboutTheDataSearchBar.jsx
 * Created by Brian Petway 11/30/22
 */

import React from 'react';
import { Search } from 'components/sharedComponents/icons/Icons';

const AboutTheDataSearchBar = () => {
    const performSearch = (term) => {
        console.log('search function engaged with term', term);
    };

    const changedSearchValue = (e) => {
        performSearch(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        performSearch(e.target[0].value);
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

export default AboutTheDataSearchBar;
