/**
 * CustomShape.jsx
 * Created by Keith Didier 09/23/2024
 **/

import React from "react";
import PropTypes from "prop-types";

const customShapePropTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    focusBar: PropTypes.bool,
    barColor: PropTypes.string
};

const CustomShape = (props) => {
    const {
        x, y, width, height, focusBar, barColor
    } = props;

    const fill = barColor;
    let fillOpacity = "1";
    if (focusBar && !props?.isActive) {
        fillOpacity = "0.5";
    }

    const maxWidth = width > 120 ? 120 : width;
    const translateX = x + ((width / 2) - (maxWidth / 2));

    return (
        <rect
            x={translateX}
            y={height < 0 ? y - Math.abs(height) : y}
            width={maxWidth}
            height={Math.abs(height)}
            fill={fill}
            fillOpacity={fillOpacity}
            className="recharts-bars" />
    );
};

CustomShape.propTypes = customShapePropTypes;
export default CustomShape;
