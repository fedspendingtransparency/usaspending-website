/**
  * ResultsTableLoadingMessage.jsx
  * Created by Kevin Li 12/21/17
  **/

import React from 'react';

import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';

const ResultsTableLoadingMessage = () => (
    <div className="results-table-loading">
        <LoadingSpinner />
        <div className="loading-message">
            Gathering your data...
        </div>
    </div>
);

export default ResultsTableLoadingMessage;
