/**
 * TodayLineAndtext.jsx
 * Created by Jonathan Hill 05/26/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    xScale: PropTypes.func,
    xDomain: PropTypes.array,
    height: PropTypes.number,
    todaysDate: PropTypes.number,
    padding: PropTypes.object
};

const TodayLineAndtext = ({
    xScale,
    xDomain,
    height,
    todaysDate,
    padding
}) => {
    const [lineXValue, setLineXValue] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if ((todaysDate >= xDomain[0]) && (todaysDate <= xDomain[1])) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [xScale, xDomain, todaysDate]);

    useEffect(() => {
        if (xScale && show) {
            setLineXValue(xScale(todaysDate) + padding.left);
        }
    }, [xScale, show]);

    return (
        <g>
            <desc>A line representing todays date, with text Today</desc>
            {show && <line
                tabIndex="0"
                className="today-line"
                x1={lineXValue}
                x2={lineXValue}
                y1={0}
                y2={height - padding.bottom} />}
            {show && <text tabIndex="0" className="today-text" x={lineXValue - 35} y={10}>Today</text>}
        </g>
    );
};

TodayLineAndtext.propTypes = propTypes;
export default TodayLineAndtext;
