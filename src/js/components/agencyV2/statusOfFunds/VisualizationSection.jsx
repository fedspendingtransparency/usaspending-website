/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { levels } from './StatusOfFunds';

const propTypes = {
    level: PropTypes.number,
    agencyId: PropTypes.string,
    agencyName: PropTypes.string,
    fy: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

const VisualizationSection = ({
    level,
    agencyName,
    fy,
    children
}) => (
    <div className="status-of-funds__visualization">
        <p>{agencyName} by <strong>{levels[level]}</strong> for FY {fy}</p>
        <div>
            {children}
        </div>
    </div>
);

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
