/**
 * RecipientDistribution.jsx
 * Created by Afna Saifudeen 7/08/21
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { formatNumber, formatMoneyWithUnitsShortLabel, formatMoneyWithUnits } from 'helpers/moneyFormatter';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.object
};

const RecipientDistribution = ({
    height = 179,
    width = 72,
    data
}) => {
    const [lineData, setLineData] = useState({
        y2: 0
    });
    const [rectangleData, setRectangleData] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
    const [recipientCounts, setRecipientCounts] = useState({
        topCount: 0,
        midCount: 0,
        bottomCount: 0
    });
    const [formattedValues, setFormattedValues] = useState({
        valMax: 0,
        val75pct: 0,
        val25pct: 0,
        valMin: 0
    });

    useEffect(() => {
        if (data) {
            const yScale = scaleLinear()
                .domain([0, data.maxRecipients])
                .range([0, height]);
            setLineData(
                {
                    y2: yScale(data.maxRecipients)
                }
            );
            const boxScale = yScale(data.pct75) - yScale(data.pct25);
            setRectangleData(
                {
                    x: 22,
                    y: height - yScale(data.pct25) - (boxScale < 1 ? 1 : boxScale),
                    width: 28,
                    height: boxScale < 1 ? 1 : boxScale
                }
            );
            setRecipientCounts(
                {
                    topCount: formatNumber(data._numberOfRecipients * 0.25),
                    midCount: formatNumber(data._numberOfRecipients * 0.50),
                    bottomCount: formatNumber(data._numberOfRecipients * 0.25)
                }
            );
            setFormattedValues(
                {
                    valMax: formatMoneyWithUnitsShortLabel(data.maxRecipients),
                    val75pct: formatMoneyWithUnitsShortLabel(data.pct75),
                    val25pct: formatMoneyWithUnitsShortLabel(data.pct25),
                    valMin: formatMoneyWithUnits(data.minRecipients)
                }
            );
        }
    }, []);

    return (
        <svg
            className="recipient-distribution-svg"
            height={height}
            width={width}>
            <g className="recipient-distribution-svg-body">
                <line // linear scale $0 to max
                    tabIndex="0"
                    className="i-beam-line"
                    x1={36}
                    x2={36}
                    y1={0}
                    y2={lineData.y2} />
                <line // bottom tick representing $0
                    tabIndex="0"
                    className="i-beam-line"
                    x1={28}
                    x2={44}
                    y1={lineData.y2}
                    y2={lineData.y2} />
                <line // upper tick representing max
                    tabIndex="0"
                    className="i-beam-line"
                    x1={28}
                    x2={44}
                    y1={0}
                    y2={0} />
                <rect // shaded box representing 25th percentile -> 75th percentile
                    className="shaded-box"
                    x={rectangleData.x}
                    y={rectangleData.y}
                    width={rectangleData.width}
                    height={rectangleData.height} />
                <line // top count label
                    tabIndex="0"
                    className="i-beam-line"
                    x1={54}
                    x2={58}
                    y1={0}
                    y2={0} />
                <text tabIndex="0" x={60} y={7}>
                    <tspan className="top-count-text" x="60">Top {recipientCounts.topCount}</tspan>
                    <tspan className="top-count-text" x="60" dy="1.1em">Recipients</tspan>
                    <tspan className="top-count-text-desc" x="60" dy="1.2em">Awarded between</tspan>
                    <tspan className="top-count-text-desc" x="60" dy="1.2em">{formattedValues.valMax} and</tspan>
                    <tspan className="top-count-text-desc" x="60" dy="1.2em">{formattedValues.val75pct}</tspan>
                </text>
                <line // bottom count label
                    tabIndex="0"
                    className="i-beam-line"
                    x1={54}
                    x2={58}
                    y1={lineData.y2}
                    y2={lineData.y2} />
                <text tabIndex="0" x={60} y={lineData.y2 - 48}>
                    <tspan className="top-count-text" x="60">Bottom {recipientCounts.bottomCount}</tspan>
                    <tspan className="top-count-text" x="60" dy="1.1em">Recipients</tspan>
                    <tspan className="top-count-text-desc" x="60" dy="1.2em">Awarded between</tspan>
                    <tspan className="top-count-text-desc" x="60" dy="1.2em">{formattedValues.val25pct} and</tspan>
                    <tspan className="top-count-text-desc" x="60" dy="1.2em">{formattedValues.valMin}</tspan>
                </text>
                <line // middle count label
                    tabIndex="0"
                    className="i-beam-line"
                    x1={14}
                    x2={18}
                    y1={lineData.y2}
                    y2={lineData.y2} />
                <text tabIndex="0" textAnchor="end" x={12} y={lineData.y2 - 73}>
                    <tspan className="top-count-text" x="12">Middle</tspan>
                    <tspan className="top-count-text" x="12" dy="1.1em">{recipientCounts.midCount}</tspan>
                    <tspan className="top-count-text" x="12" dy="1.1em">Recipients</tspan>
                    <tspan className="top-count-text-desc" x="12" dy="1.2em">Awarded</tspan>
                    <tspan className="top-count-text-desc" x="12" dy="1.2em">between</tspan>
                    <tspan className="top-count-text-desc" x="12" dy="1.2em">{formattedValues.val75pct} and</tspan>
                    <tspan className="top-count-text-desc" x="12" dy="1.2em">{formattedValues.val25pct}</tspan>
                </text>
            </g>
        </svg>
    );
};

RecipientDistribution.propTypes = propTypes;
export default RecipientDistribution;
