/**
 * ChartLoadingMessage.jsx
 * Created by Kevin Li 12/26/17
 */

import React from 'react';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';

const ChartLoadingMessage = () => (
    <div className="results-table-loading">
        <LoadingSpinner />
        <div className="loading-message">
            Gathering your data...
        </div>
    </div>
);

export default ChartLoadingMessage;
