/**
 * KeywordSearchBar.jsx
 * Created by Lizzie Salita 1/5/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    keyword: PropTypes.string,
    updateKeyword: PropTypes.func
};

const KeywordSearchBar = ({ keyword, updateKeyword }) => {
    const [searchString, setSearchString] = useState('');

    const updateSearchString = (string) => setSearchString(string);

    useEffect(() => {
        if (keyword) updateSearchString(keyword);
    }, [keyword]);

    const searchKeyword = (e) => {
        e.preventDefault();
        if (searchString.length > 2) updateKeyword(searchString);
    };

    const changedInput = (e) => setSearchString(e.target.value);

    let disabledClass = 'keyword-search-bar__button_disabled';
    let submitButtonText = 'Enter at least three characters to search';

    if (searchString.length > 2) {
        disabledClass = '';
        submitButtonText = 'Search by Keyword';
    }

    return (
        <form
            className="keyword-search-bar__form"
            onSubmit={searchKeyword}>
            <input
                id="search"
                type="text"
                aria-label="Search Input"
                className="keyword-search-bar__input"
                value={searchString}
                onChange={changedInput}
                placeholder="Type keywords..." />
            <button
                className={`keyword-search-bar__button ${disabledClass}`}
                onClick={searchKeyword}
                title={submitButtonText}
                aria-label={submitButtonText}>
                <div className="keyword-search-bar__button-icon">
                    <Search alt="Search by Keyword" />
                </div>
            </button>
        </form>
    );
};

KeywordSearchBar.propTypes = propTypes;
export default KeywordSearchBar;
