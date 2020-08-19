/**
 * TruncationWarning.jsx
 * Created by Kevin Li 3/2/18
 */

import React from 'react';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import { Link } from 'react-router-dom';

const TruncationWarning = () => (
    <div className="truncation-warning detail-header__truncation">
        <div className="truncation-warning__icon">
            <InfoCircle alt="Information" />
        </div>
        <div className="truncation-warning__message">
            <div className="truncation-warning__title">
                Award Display Limit
            </div>
            <div className="truncation-warning__detail">
                Only the 500 awards with the highest amounts are shown. For further research on individual awards, visit our <Link to="/search">Advanced Search</Link>.
            </div>
        </div>
    </div>
);

export default TruncationWarning;
