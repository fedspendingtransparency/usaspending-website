/**
 * ChartNoResults.jsx
 * Created by Kevin Li 12/26/17
 */

import React from 'react';

const ChartNoResults = () => (
    <div className="visualization-message-container">
        <div className="visualization-no-results">
            <div className="no-results-icon" />
            <div className="title">
                No results found.
            </div>
            <div className="description">
                Try again using different filters.
            </div>
        </div>
    </div>
);

export default ChartNoResults;
