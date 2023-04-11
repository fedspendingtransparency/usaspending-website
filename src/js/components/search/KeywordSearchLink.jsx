/**
 * KeywordSearchLink.jsx
 * Created by Nick Torres 4/11/23
 **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const KeywordSearchLink = () => (
    <div className="advanced-search__keyword-search-link-container">
        <div className="advanced-search__keyword-search-link-row1">
            <FontAwesomeIcon className="advanced-search__keyword-search-icon" size="md" icon="info" />
            Looking for the "Keyword Search" page?
        </div>
        <div className="advanced-search__keyword-search-link-row2">
            <Link className="advanced-search__keyword-search-link" to="/keyword_search">Click here to search award transactions by keyword.</Link>
        </div>
    </div>
);
// /keyword_search
export default KeywordSearchLink;

