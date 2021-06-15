import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    xScale: PropTypes.func,
    xDomain: PropTypes.array,
    yScale: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    agencyBudget: PropTypes.number,
    todaysDate: PropTypes.number,
    padding: PropTypes.object
};

const AgencyBudgetLine = ({
    data,
    xScale,
    xDomain,
    yScale,
    height,
    agencyBudget,
    todaysDate,
    padding,
    width
}) => {
    const [show, setShow] = useState(false);
    const [lineData, setLineData] = useState({
        x1: 0,
        x2: 0,
        y1: 0
    });
    const [rectangleData, setRectangleData] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });

    useEffect(() => {
        if ((todaysDate >= xDomain[0]) && (todaysDate <= xDomain[1])) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [xScale, xDomain, todaysDate]);

    useEffect(() => {
        if (xScale && yScale && agencyBudget) {
            const y = height - yScale(agencyBudget) - padding.top;
            setLineData(
                {
                    x1: padding.left,
                    x2: show ? xScale(todaysDate) + padding.left : width - padding.left,
                    y1: isNaN(y) ? 0 : y
                }
            );
        }
    }, [xScale, yScale, show]);

    useEffect(() => {
        if (xScale && yScale && data.length) {
            setRectangleData(
                {
                    x: padding.left,
                    y: height - yScale(agencyBudget) - padding.top,
                    width: show ? xScale(todaysDate) : width - padding.left - padding.right,
                    height: height - yScale(data[data.length - 1].obligated) - padding.bottom - padding.top
                }
            );
        }
    }, [xScale, yScale, show]);

    return (
        <g>
            <line
                tabIndex="0"
                className="total-budget-line"
                x1={lineData.x1}
                x2={lineData.x2}
                y1={lineData.y1}
                y2={lineData.y1} />
            <rect
                className="total-budget-difference"
                x={rectangleData.x}
                y={rectangleData.y}
                width={rectangleData.width}
                height={rectangleData.height} />
        </g>
    );
};

AgencyBudgetLine.propTypes = propTypes;
export default AgencyBudgetLine;
