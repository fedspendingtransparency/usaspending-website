/**
 * SearchBar.jsx
 * Created by Lizzie Salita 7/16/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    setQuery: PropTypes.func.isRequired,
    currentSearchTerm: PropTypes.string
};

// the minimum number of characters a user is required to enter before they can perform a search
const minChars = 2;

const SearchBar = ({ setQuery, currentSearchTerm }) => {
    const [searchString, setSearchString] = useState(currentSearchTerm);

    const resetSearch = () => {
        setSearchString('');
        setQuery('');
    };

    const onChange = (e) => {
        if (currentSearchTerm && !e.target.value) {
            // auto-reset the search when all input is deleted
            resetSearch();
        }
        else {
            setSearchString(e.target.value);
        }
    };

    const onSubmit = () => {
        setQuery(searchString);
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (searchString && currentSearchTerm === searchString) {
            resetSearch();
        }
        if (currentSearchTerm && searchString.length < minChars) {
            resetSearch();
        }
        else {
            onSubmit();
        }
    };

    let icon = 'search';
    if (searchString && currentSearchTerm === searchString) {
        icon = 'times';
    }
    else if (currentSearchTerm && searchString.length < minChars) {
        icon = 'times';
    }

    return (
        <form className="search-bar">
            <input
                className="search-bar__input"
                value={searchString}
                type="text"
                onChange={onChange} />
            <button
                disabled={searchString.length < minChars && !currentSearchTerm}
                aria-label="Search"
                onClick={handleClick}
                className="search-bar__button">
                <FontAwesomeIcon icon={icon} />
            </button>
        </form>
    );
};

SearchBar.propTypes = propTypes;
export default SearchBar;
