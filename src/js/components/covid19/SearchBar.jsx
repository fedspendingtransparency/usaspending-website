/**
 * SearchBar.jsx
 * Created by Lizzie Salita 7/16/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    setQuery: PropTypes.func.isRequired,
    query: PropTypes.string
};

const SearchBar = ({ setQuery, query }) => {
    const [searchString, setSearchString] = useState(query);

    const onChange = (e) => {
        setSearchString(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setQuery(searchString);
    };

    const resetSearch = (e) => {
        e.preventDefault();
        setSearchString('');
        setQuery('');
    };

    const handleClick = (e) => {
        if (searchString && query === searchString) {
            resetSearch(e);
        }
        else {
            onSubmit(e);
        }
    };

    return (
        <div className="search-bar">
            <form className="search-bar__form">
                <input
                    className="search-bar__input"
                    value={searchString}
                    type="text"
                    onChange={onChange} />
                <button
                    disabled={searchString.length < 3}
                    aria-label="Search"
                    onClick={handleClick}
                    className="search-bar__button">
                    <FontAwesomeIcon icon={(searchString && query === searchString) ? 'times' : 'search'} />
                </button>
            </form>
        </div>
    );
};

SearchBar.propTypes = propTypes;
export default SearchBar;
