/**
 * RectanglePattern.jsx
 * Created by Jonathan Hill 07/10/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    patternProps: PropTypes.object,
    rectangles: PropTypes.array
};


const RectanglePattern = ({
    patternProps,
    rectangles
}) => {
    if (!patternProps || !rectangles) return null;
    const {
        id,
        width,
        height,
        patternTransform,
        patternUnits
    } = patternProps;

    return (
        <pattern
            id={id}
            width={width}
            height={height}
            patternTransform={patternTransform}
            patternUnits={patternUnits}>
            {
                rectangles.map((rectangle) => (
                    <rect
                        key={rectangle.key}
                        width={rectangle.width}
                        height={rectangle.height}
                        fill={rectangle.fill} />
                ))
            }
        </pattern>
    );
};

RectanglePattern.propTypes = propTypes;

export default RectanglePattern;
