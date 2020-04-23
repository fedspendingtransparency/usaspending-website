/**
 * ContractGrantActivityChartCircles.jsx
 * Created by Jonathan Hill 04/23/2020
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from 'helpers/moneyFormatter';

const propTypes = {
    transactions: PropTypes.array,
    padding: PropTypes.object,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xAxisSpacing: PropTypes.number,
    height: PropTypes.number
};

const ContractGrantActivityChartCircles = ({
    transactions,
    padding,
    xScale,
    yScale,
    xAxisSpacing,
    height
}) => {
    // circle data
    const [circleData, setCircleData] = useState([]);
    // sets circle data - hook - on mount and when transactions change
    useEffect(() => {
        if (xScale && yScale) {
            const circles = transactions
                .map((data, i) => ({
                    key: `${data.federal_action_obligation}${i}`,
                    description: `A circle representing the transaction date, ${data.action_date.format('MM-DD-YYYY')} and running total obligation of ${formatMoney(data.running_obligation_total)}`,
                    className: 'transaction-date-circle',
                    cx: xScale(data.action_date.valueOf()) + padding.left,
                    cy: (height - yScale(data.running_obligation_total)),
                    r: 1.5
                }));
            setCircleData(circles);
        }
    }, [
        transactions,
        padding,
        xScale,
        yScale,
        xAxisSpacing,
        height
    ]);
    return (
        <g className="contract-grant-activity-chart__circles">
            {
                circleData.map((circle) => {
                    const {
                        key,
                        description,
                        className,
                        cx,
                        cy,
                        r
                    } = circle;
                    return (
                        <g key={key} tabIndex="0">
                            <desc>{description}</desc>
                            <circle
                                className={className}
                                cx={cx}
                                cy={cy}
                                r={r} />
                        </g>
                    );
                })
            }
        </g>
    );
};

ContractGrantActivityChartCircles.propTypes = propTypes;
export default ContractGrantActivityChartCircles;
