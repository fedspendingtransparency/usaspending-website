/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// import React from 'react';
import PropTypes from 'prop-types';
import { levels } from './StatusOfFunds';

const propTypes = {
    level: PropTypes.number,
    agencyId: PropTypes.string,
    fy: PropTypes.string
};

const VisualizationSection = ({ level }) => (
    <>
        DEV-8049 horizontal bar chart viewing {levels[level]}s
    </>
);

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
