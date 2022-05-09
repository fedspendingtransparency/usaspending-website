import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    agencyBudget: PropTypes.number,
    todaysDate: PropTypes.number,
    padding: PropTypes.object,
    scenario: PropTypes.string,
    showTodayLineAndText: PropTypes.bool,
    toggleTooltipVisibility: PropTypes.func
};

const AgencyBudgetLine = ({
    data,
    xScale,
    yScale,
    height,
    agencyBudget,
    todaysDate,
    padding,
    width,
    scenario,
    showTodayLineAndText,
    toggleTooltipVisibility
}) => {
    const [hoveredRectangle, setHoveredRectangle] = useState(false);
    const [lineData, setLineData] = useState({
        x1: 0,
        x2: 0,
        y1: 0
    });
    const [rectangleData, setRectangleData] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        balance: 0,
        percentOfTotal: 0
    });

    useEffect(() => {
        if (xScale && yScale && agencyBudget) {
            const y = height - yScale(agencyBudget) - padding.bottom;
            setLineData(
                {
                    x1: padding.left,
                    x2: showTodayLineAndText ? xScale(todaysDate) + padding.left : width - padding.left,
                    y1: isNaN(y) ? 0 : y
                }
            );
        }
    }, [xScale, yScale, showTodayLineAndText]);

    useEffect(() => {
        if (xScale && yScale && data.length) {
            setRectangleData(
                {
                    x: padding.left,
                    y: height - yScale(agencyBudget) - padding.bottom,
                    width: showTodayLineAndText ? xScale(todaysDate) : width - padding.left - padding.right,
                    height: height - yScale(Math.max(...data.map((x) => x.obligated))) - padding.bottom - padding.top
                }
            );
        }
    }, [xScale, yScale, showTodayLineAndText]);

    const rectangle = (
        <rect
            className={`${hoveredRectangle ? 'total-budget-difference-hover' : 'total-budget-difference'}`}
            x={rectangleData.x}
            y={rectangleData.y}
            width={rectangleData.width}
            height={rectangleData.height}
            tabIndex="0" />
    );
    return (
        <g
            onMouseEnter={() => {
                setHoveredRectangle(true); toggleTooltipVisibility(true);
            }}
            onMouseLeave={() => {
                setHoveredRectangle(false); toggleTooltipVisibility(false);
            }}
            onFocus={() => {
                setHoveredRectangle(true); toggleTooltipVisibility(true);
            }}
            onBlur={() => {
                setHoveredRectangle(false); toggleTooltipVisibility(false);
            }}
            className="bar-chart__item">
            <line
                tabIndex="0"
                className="total-budget-line"
                x1={lineData.x1}
                x2={lineData.x2}
                y1={lineData.y1}
                y2={lineData.y1} />
            {!(scenario === 'exceedsMax' || scenario === 'exceedsMaxAndMin') && rectangle}
        </g>
    );
};

AgencyBudgetLine.propTypes = propTypes;
export default AgencyBudgetLine;
