import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        period: PropTypes.number,
        obligated: PropTypes.number
    })),
    xScale: PropTypes.func,
    xDomain: PropTypes.array,
    yScale: PropTypes.func,
    height: PropTypes.number,
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
    padding
}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if ((todaysDate >= xDomain[0]) && (todaysDate <= xDomain[1])) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [xScale, xDomain, todaysDate]);

    return (
        <g>
            {show && <line
                tabIndex="0"
                className="total-budget-line"
                x1={padding.left}
                x2={xScale(todaysDate) + padding.left}
                y1={height - yScale(agencyBudget - padding.top)}
                y2={height - yScale(agencyBudget - padding.top)} />}
            {show && <rect className="total-budget-difference" x={padding.left} y={height - yScale(agencyBudget - padding.top)} width={xScale(todaysDate)} height={yScale(agencyBudget) - yScale(data[data.length - 1].obligated) - padding.bottom} />}
        </g>
    );
};

AgencyBudgetLine.propTypes = propTypes;
export default AgencyBudgetLine;
