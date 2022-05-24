/**
 * TodayLineAndtext.jsx
 * Created by Jonathan Hill 05/26/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    xScale: PropTypes.func,
    height: PropTypes.number,
    todaysDate: PropTypes.number,
    padding: PropTypes.object,
    showTodayLineAndText: PropTypes.bool
};

const TodayLineAndtext = ({
    xScale,
    height,
    todaysDate,
    padding,
    showTodayLineAndText
}) => {
    const [lineXValue, setLineXValue] = useState(0);

    useEffect(() => {
        if (xScale && showTodayLineAndText) {
            setLineXValue(xScale(todaysDate) + padding.left);
        }
    }, [xScale, showTodayLineAndText, todaysDate, padding.left]);

    return (
        <g>
            <desc>A line representing todays date</desc>
            <line
                tabIndex="0"
                className="today-line"
                x1={lineXValue}
                x2={lineXValue}
                y1={0}
                y2={height - padding.bottom} />
            <text tabIndex="0" className="today-text" x={lineXValue - 35} y={10}>Today</text>
        </g>
    );
};

TodayLineAndtext.propTypes = propTypes;
export default TodayLineAndtext;
