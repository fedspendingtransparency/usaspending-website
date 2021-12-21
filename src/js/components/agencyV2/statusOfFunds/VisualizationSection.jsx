/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { levels } from './StatusOfFunds';
import StatusOfFundsChart from '../visualizations/StatusOfFundsChart';

const propTypes = {
    level: PropTypes.number,
    agencyId: PropTypes.string,
    agencyName: PropTypes.string,
    fy: PropTypes.string,
    results: PropTypes.array
};

const VisualizationSection = ({
    level,
    agencyName,
    fy,
    results
}) => (
    <div className="status-of-funds__visualization">
        <h6>{agencyName} by <strong>{levels[level]}</strong> for FY {fy}</h6>
        <div className="status-of-funds__visualization-chart">
            <StatusOfFundsChart fy={fy} results={results} />
        </div>
    </div>
);

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
