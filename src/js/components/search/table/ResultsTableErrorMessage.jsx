/**
  * ResultsTableErrorMessage.jsx
  * Created by Kevin Li 12/21/17
  **/

import React from 'react';

import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const ResultsTableErrorMessage = () => (
    <div className="results-table-error">
        <div className="icon">
            <ExclamationTriangle alt="An error occurred" />
        </div>
        <div className="title">
            An error occurred.
        </div>
        <div className="description">
            Something went wrong while gathering your data.
        </div>
    </div>
);

export default ResultsTableErrorMessage;
