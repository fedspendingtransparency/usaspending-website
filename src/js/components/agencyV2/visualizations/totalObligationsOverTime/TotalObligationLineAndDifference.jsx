/**
 * TotalObligationLine
 * Created by Jonathan Hill 05/26/21
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from 'accounting';

const propTypes = {
    padding: PropTypes.object,
    xScale: PropTypes.func,
    xDomain: PropTypes.array,
    yScale: PropTypes.func,
    yScaleForPath: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    agencyBudget: PropTypes.number,
    obligationsByPeriod: PropTypes.number,
    todaysDate: PropTypes.number,
    fiscalYear: PropTypes.string
};

const TotalObligationLine = ({
    padding,
    xScale,
    xDomain,
    yScale,
    yScaleForPath,
    height,
    agencyBudget,
    obligationsByPeriod,
    todaysDate,
    fiscalYear
}) => {
    const [x2Value, setX2Value] = useState(0);
    const [yValue, setYValue] = useState(0);
    const [differenceHeight, setDifferenceHeight] = useState(0);

    useEffect(() => {
        if (xScale && yScale) {
            const valueToScale = todaysDate && todaysDate > xDomain[1] ? xDomain[1] : todaysDate;
            setX2Value(xScale(valueToScale) + padding.left);
        }
    }, [xScale, yScale, agencyBudget, todaysDate]);

    useEffect(() => {
        if (xScale && yScale && agencyBudget) {
            setYValue(height - yScale(agencyBudget) - padding.bottom);
            const mostRecentPeriodObligation = obligationsByPeriod[obligationsByPeriod.length - 1].obligated;
            setDifferenceHeight(height - yScaleForPath(mostRecentPeriodObligation) - padding.top - padding.bottom);
        }
    }, [xScale, yScale, agencyBudget]);

    return (
        <g tabIndex="0">
            <desc>{`A line representing the agencies budget for fiscal year ${fiscalYear} of $${formatNumber(agencyBudget)} and a rectangle with height representing the difference between the total budget and most recent closed fiscal period`}</desc>
            <rect
                className="total-budget-difference"
                x={padding.left}
                y={padding.top}
                height={differenceHeight}
                width={x2Value - padding.left} />
            <line
                className="total-budget-line"
                x1={padding.left}
                x2={x2Value}
                y1={yValue}
                y2={yValue} />
        </g>
    );
};

TotalObligationLine.propTypes = propTypes;
export default TotalObligationLine;
