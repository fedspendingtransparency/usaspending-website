/**
 * TruncationWarning.jsx
 * Created by Kevin Li 3/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import { Link } from 'react-router-dom';

const TruncationWarning = ({
    activeSubdivision = 'award'
}) => (
    <div className="truncation-warning detail-header__truncation">
        <div className="truncation-warning__icon">
            <InfoCircle alt="Information" />
        </div>
        <div className="truncation-warning__message">
            <div className="truncation-warning__title">
                {startCase(activeSubdivision)} Display Limit
            </div>
            <div className="truncation-warning__detail">
                Only the 500 {startCase(activeSubdivision)}s with the highest amounts are shown.
                {activeSubdivision === 'award' && (
                    <>
                        For further research on individual awards, visit our <Link to="/search">Advanced Search</Link>.
                    </>
                )}
            </div>
        </div>
    </div>
);

TruncationWarning.propTypes = {
    activeSubdivision: PropTypes.string
};

export default TruncationWarning;
