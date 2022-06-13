/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 4/7/21
 */

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

const propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    subtitle: oneOfType([PropTypes.string, PropTypes.element]),
    data: PropTypes.object || PropTypes.string,
    secondaryData: PropTypes.string,
    label: PropTypes.string
};

const VisualizationSection = ({
    children,
    subtitle,
    data,
    secondaryData,
    label
}) => (
    <div className="visualization-section">
        <div className="visualization-section__subtitle">{subtitle}</div>
        <div className="visualization-section__data">{data}</div>
        <div className="visualization-section__secondary-data">{secondaryData}</div>
        <div className="visualization-section__viz-wrapper">
            {children}
        </div>
        <div className="visualization-section__label">{label}</div>
    </div>
);

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
