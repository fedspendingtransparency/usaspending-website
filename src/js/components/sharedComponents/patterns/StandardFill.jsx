/**
 * ActivityChart.jsx
 * Created by Jonathan Hill 07/10/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    backgroundWidth: PropTypes.string,
    backgroundHeight: PropTypes.string,
    backgroundFill: PropTypes.string,
    fillWidth: PropTypes.string,
    fillHeight: PropTypes.string,
    fillFill: PropTypes.string
};

const StandardFill = ({
    id,
    width,
    height,
    backgroundWidth,
    backgroundHeight,
    backgroundFill,
    fillWidth,
    fillHeight,
    fillFill
}) => (
    <pattern
        id={id}
        width={width}
        height={height}>
        <rect width={backgroundWidth} height={backgroundHeight} fill={backgroundFill} />
        <rect width={fillWidth} height={fillHeight} fill={fillFill} />
    </pattern>
);

StandardFill.propTypes = propTypes;

export default StandardFill;
