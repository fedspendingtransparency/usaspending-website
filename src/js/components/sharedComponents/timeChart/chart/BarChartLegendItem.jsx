/**
 * BarChartLegendItem.jsx
 * Created by Kevin Li 3/21/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from "lodash";
import { smTabletScreen } from "../../../../dataMapping/shared/mobileBreakpoints";

const propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    offset: PropTypes.number,
    mobileOffset: PropTypes.number
};

const BarChartLegendItem = (props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <g
            className="chart-legend-item"
            transform={windowWidth <= smTabletScreen ? `translate(0, ${props.mobileOffset})` : `translate(${props.offset}, 0)`}>
            <circle
                className="key-color"
                fill={props.color}
                cx="6"
                cy="6"
                r="6" />
            <text
                className="key-label"
                x="20"
                y="10">
                {props.label}
            </text>
        </g>
    );
};

BarChartLegendItem.propTypes = propTypes;
export default BarChartLegendItem;
