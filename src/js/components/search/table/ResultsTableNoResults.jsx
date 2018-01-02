/**
  * ResultsTableNoResults.jsx
  * Created by Kevin Li 12/21/17
  **/

import React from 'react';

const ResultsTableNoResults = () => (
    <div className="results-table-no-results">
        <div className="no-results-icon" />
        <div className="title">
            No results found.
        </div>
        <div className="description">
            Try again using different filters.
        </div>
    </div>
);

export default ResultsTableNoResults;
