/**
 * ChartLoadingMessage.jsx
 * Created by Kevin Li 12/26/17
 */

import React from 'react';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';

const ChartLoadingMessage = () => (
    <div className="visualization-message-container">
        <div className="visualization-loading">
            <LoadingSpinner />
            <div className="message">
                Gathering your data...
            </div>
        </div>
    </div>
);

export default ChartLoadingMessage;
