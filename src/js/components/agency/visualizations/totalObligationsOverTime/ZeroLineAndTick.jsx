import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    height: PropTypes.number,
    padding: PropTypes.object,
    width: PropTypes.number,
    showTodayLineAndText: PropTypes.bool,
    todaysDate: PropTypes.number
};

const ZeroLineAndTick = ({
    yScale,
    xScale,
    height,
    padding,
    width,
    showTodayLineAndText,
    todaysDate
}) => {
    const [lineData, setLineData] = useState({ x1: 0, x2: 0, y: 0 });
    const [textData, setTextData] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (xScale && yScale) {
            const y = height - yScale(0) - padding.bottom;
            const x2 = showTodayLineAndText ? padding.left + xScale(todaysDate) : width - padding.right;
            setLineData({ x1: padding.left, x2, y });
            /**
             * text position
            /* x removes 12 due to the width of the text and removes 3 for spacing
            /* y adds 4 for height of the text
            */
            setTextData({ x: padding.left - 12 - 3, y: y + 4 });
        }
    }, [xScale, yScale, height, padding, width, showTodayLineAndText]);

    return (
        <g>
            <text
                tabIndex="0"
                className="zero-tick"
                x={textData.x}
                y={textData.y}>
                $0
            </text>
            <line
                tabIndex="0"
                className="zero-line"
                x1={lineData.x1}
                x2={lineData.x2}
                y1={lineData.y}
                y2={lineData.y} />
        </g>
    );
};

ZeroLineAndTick.propTypes = propTypes;
export default ZeroLineAndTick;
