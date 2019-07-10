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
    patternTransform: PropTypes.string,
    patternUnits: PropTypes.string,
    backgroundWidth: PropTypes.string,
    backgroundHeight: PropTypes.string,
    backgroundFill: PropTypes.string,
    hatchWidth: PropTypes.string,
    hatchHeight: PropTypes.string,
    hatchFill: PropTypes.string
};

const Hatch = ({
    id,
    width,
    height,
    patternTransform,
    patternUnits,
    backgroundWidth,
    backgroundHeight,
    backgroundFill,
    hatchWidth,
    hatchHeight,
    hatchFill
}) => (
    <pattern
        id={id}
        width={width}
        height={height}
        patternTransform={patternTransform}
        patternUnits={patternUnits}>
        <rect width={backgroundWidth} height={backgroundHeight} fill={backgroundFill} />
        <rect width={hatchWidth} height={hatchHeight} fill={hatchFill} />
    </pattern>
);

Hatch.propTypes = propTypes;

export default Hatch;
