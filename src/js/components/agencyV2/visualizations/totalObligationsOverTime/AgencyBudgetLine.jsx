import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    xScale: PropTypes.func,
    xDomain: PropTypes.array,
    yScale: PropTypes.func,
    height: PropTypes.number,
    agencyBudget: PropTypes.number,
    todaysDate: PropTypes.number,
    padding: PropTypes.object
};

const AgencyBudgetLine = ({
    xScale,
    xDomain,
    yScale,
    height,
    agencyBudget,
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
            {show && <desc>A line representing todays date</desc>}
            {show && <line
                tabIndex="0"
                className="total-budget-line"
                x1={padding.left}
                x2={xScale(todaysDate) + padding.left}
                y1={height - yScale(agencyBudget - padding.top)}
                y2={height - yScale(agencyBudget - padding.top)} />}
            {show && <text tabIndex="0" className="today-text" x={lineXValue - 35} y={10}>Today</text>}
            {show && <rect className="total-budget-difference" x={padding.left} y={height - yScale(agencyBudget - padding.top)} width={xScale(todaysDate)} height={yScale(todaysDate)} />}
        </g>
    );
};

AgencyBudgetLine.propTypes = propTypes;
export default AgencyBudgetLine;
