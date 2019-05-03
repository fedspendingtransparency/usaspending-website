/**
  * ResultsTableNoResults.jsx
  * Created by Kevin Li 12/21/17
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    description: PropTypes.string
};

const ResultsTableNoResults = ({ description }) => (
    <div className="results-table-no-results">
        <div className="no-results-icon" />
        <div className="title">
            No results found.
        </div>
        <div className="description">
            {description || 'Try again using different filters.'}
        </div>
    </div>
);

ResultsTableNoResults.propTypes = propTypes;

export default ResultsTableNoResults;
