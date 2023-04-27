/**
 * KeywordSearchLink.jsx
 * Created by Nick Torres 4/11/23
 **/

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const KeywordSearchLink = () => (
    <div className="advanced-search__keyword-search-link-container">
        <div className="advanced-search__keyword-search-link-col1">
            <FontAwesomeIcon className="advanced-search__keyword-search-icon" icon="info-circle" />
        </div>
        <div className="advanced-search__keyword-search-link-col2">
            <p className="advanced-search__keyword-search-link-text">
                Looking for the "Keyword Search" page?
            </p>
            <Link target="_blank" rel="noopener noreferrer" className="advanced-search__keyword-search-link" to="/keyword_search">Click here to search award transactions <span className="advanced-search__keyword-search-span">by keyword.</span></Link>
        </div>
    </div>
);
export default KeywordSearchLink;

