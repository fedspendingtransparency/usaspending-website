/**
 * NoDataScreen.jsx
 * Created by Josue Aguilar 4/26/2024
 */

import React from 'react';

const NoDataScreen = () => (
    <div className="new-search-container">
        <img
            className="no-results-icon"
            src="graphics/No-results.svg"
            alt="alt-text" />
        <p>No results found. Please adjust your search filters and try again.</p>
    </div>
);
export default NoDataScreen;
