/**
 * TwoRectangles.jsx
 * Created by Jonathan Hill 07/10/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    patternTransform: PropTypes.string,
    patternUnits: PropTypes.string,
    backgroundWidth: PropTypes.string,
    backgroundHeight: PropTypes.string,
    backgroundFill: PropTypes.string,
    fillWidth: PropTypes.string,
    fillHeight: PropTypes.string,
    fillFill: PropTypes.string
};

const TwoRectangles = ({
    id,
    width,
    height,
    patternTransform,
    patternUnits,
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
        height={height}
        patternTransform={patternTransform}
        patternUnits={patternUnits}>
        <rect width={backgroundWidth} height={backgroundHeight} fill={backgroundFill} />
        <rect width={fillWidth} height={fillHeight} fill={fillFill} />
    </pattern>
);

TwoRectangles.propTypes = propTypes;

export default TwoRectangles;
