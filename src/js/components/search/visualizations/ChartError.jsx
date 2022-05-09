/**
 * ChartError.jsx
 * Created by Kevin Li 12/26/17
 */

import React from 'react';

import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const ChartError = () => (
    <div className="visualization-message-container">
        <div className="visualization-no-results">
            <div className="error-icon">
                <ExclamationTriangle alt="An error occurred" />
            </div>
            <div className="title">
                An error occurred.
            </div>
            <div className="description">
                Something went wrong while gathering your data.
            </div>
        </div>
    </div>
);

export default ChartError;
