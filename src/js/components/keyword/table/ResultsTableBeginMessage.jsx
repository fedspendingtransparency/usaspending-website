/**
 * ResultsTableBeginMessage.jsx
 * Created by Lizzie Salita 1/9/18
 **/

import React from 'react';

import { CircleArrowUp } from 'components/sharedComponents/icons/Icons';

const ResultsTableBeginMessage = () => (
    <div className="results-table-begin">
        <div className="icon">
            <CircleArrowUp alt="Enter a keyword to begin your search." />
        </div>
        <div className="description">
            Enter a keyword to begin your search.
        </div>
    </div>
);

export default ResultsTableBeginMessage;
