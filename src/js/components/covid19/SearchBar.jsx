/**
 * SearchBar.jsx
 * Created by Lizzie Salita 7/16/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    setQuery: PropTypes.func.isRequired
};

const SearchBar = ({ setQuery }) => {
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');
    const [searchString, setSearchString] = useState('');

    const onChange = (e) => {
        setSearchString(e.target.value);
    };

    const onSubmit = () => {
        setQuery(searchString);
        setCurrentSearchTerm(searchString);
    };

    const resetSearch = () => {
        setSearchString('');
        setQuery('');
    };

    const handleClick = () => {
        if (searchString && currentSearchTerm === searchString) {
            resetSearch();
        }
        else {
            onSubmit();
        }
    };

    return (
        <form className="search-bar">
            <input
                className="search-bar__input"
                value={searchString}
                type="text"
                onChange={onChange} />
            <button
                disabled={searchString.length < 2}
                aria-label="Search"
                onClick={handleClick}
                className="search-bar__button">
                <FontAwesomeIcon icon={(searchString && currentSearchTerm === searchString) ? 'times' : 'search'} />
            </button>
        </form>
    );
};

SearchBar.propTypes = propTypes;
export default SearchBar;
