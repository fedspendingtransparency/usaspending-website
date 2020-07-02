/**
 * AmountsVisualization.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { uniqueId } from 'lodash';
import DateNote from 'components/covid19/DateNote';
import {
    amountsHeight,
    amountsPadding,
    rectangleMapping,
    startOfChartY,
    rectangleHeight,
    lineStrokeWidth,
    lineLength
} from 'dataMapping/covid19/covid19';
import { calculateUnits, formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    overviewData: PropTypes.object,
    width: PropTypes.number
};

const AmountsVisualization = ({
    overviewData,
    width = null
}) => {
    const [scale, setScale] = useState(null);
    const [rectangles, setRectangles] = useState(null);
    const [rectangleData, setRectangleData] = useState({});
    const [lines, setLines] = useState([]);
    const [text, setText] = useState([]);
    // X Scale
    useEffect(() => {
        if (width) {
            const s = scaleLinear()
                .domain([0, overviewData._totalBudgetAuthority])
                .range([amountsPadding.left, width - amountsPadding.right]);
            setScale(() => s);
        }
    }, [width, overviewData]);
    // create overviewData to draw rectangles
    useEffect(() => {
        if (scale) {
            const r = Object.keys(rectangleMapping).reduce((acc, key, i) => {
                const { offset, fill, text: textInfo } = rectangleMapping[key];
                const { left, right } = amountsPadding;
                const y = startOfChartY + offset.top;
                const height = rectangleHeight - (2 * offset.bottom);
                const mappingKey = rectangleMapping[key].primaryKey ? rectangleMapping[key].primaryKey : key;
                let x = left + offset.left;
                let rectWidth = scale(overviewData[mappingKey]) - (right + (2 * offset.right || 0));
                let lineXPosition = (x + rectWidth) - (lineStrokeWidth / 2);
                /**
                 * Handle Remaining Balance Edge Case and it's inner rectangle.
                 * Since this rectangle does not start at the beginning of the visualization,
                 * we start it after the primary key value plus the offset, where the primary key
                 * value will give us the x position to start from
                 */
                if (key === '_remainingBalance' || key === 'remainingBalanceFiller') {
                    x = scale(overviewData[mappingKey]) + (offset.left);
                    // rectWidth = scale(overviewData._totalBudgetAuthority) - scale(overviewData._totalObligations) - (right + (2 * offset.right));
                    rectWidth = scale(overviewData._totalBudgetAuthority) - scale(overviewData._totalObligations) - offset.right;
                    lineXPosition = (x + rectWidth) - (lineStrokeWidth / 2);
                }
                const units = calculateUnits([overviewData[key]]);
                units.longLabel = units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1);
                let textData = [];
                if (textInfo) {
                    if (i === 0 || i === 4) {
                        const questionData = textInfo.question.map((t, f) => ({
                            y: (startOfChartY - lineLength) + ((textInfo.questionDown * (f === 0 ? 1 : 2)) + (f === 0 ? 0 : 10)),
                            x: lineXPosition - textInfo.questionLeft,
                            text: t,
                            className: 'amounts-text__question'
                        }));
                        textData = [
                            ...questionData,
                            {
                                y: (startOfChartY - lineLength) + textInfo.questionDown + textInfo.valueDown,
                                x: lineXPosition - textInfo.valueLeft,
                                text: `${formatMoneyWithPrecision(overviewData[key] / units.unit, units.precision)} ${units.longLabel}`,
                                className: key === '_totalBudgetAuthority' ? 'amounts-text__value bold' : 'amounts-text__value'
                            },
                            {
                                y: (startOfChartY - lineLength) + textInfo.questionDown + textInfo.valueDown + textInfo.labelDown,
                                x: lineXPosition - textInfo?.labelLeft,
                                text: textInfo?.label,
                                className: 'amounts-text__label'
                            }
                        ];
                    }
                    else {
                        const questionData = textInfo.question.map((t, z) => ({
                            y: startOfChartY + rectangleHeight + 10 + textInfo.valueDown + 5 + ((textInfo.questionDown * (z === 0 ? 1 : 1.5))),
                            x: lineXPosition - textInfo.questionLeft,
                            text: t,
                            className: 'amounts-text__question'
                        }));
                        textData = [
                            {
                                y: startOfChartY + rectangleHeight + textInfo.valueDown,
                                x: lineXPosition - textInfo.valueLeft,
                                text: `${formatMoneyWithPrecision(overviewData[key] / units.unit, units.precision)} ${units.longLabel}`,
                                className: 'amounts-text__value'
                            },
                            {
                                y: startOfChartY + rectangleHeight + textInfo.valueDown + textInfo.labelDown,
                                x: lineXPosition - textInfo.labelLeft,
                                text: textInfo.label,
                                className: 'amounts-text__label'
                            },
                            ...questionData
                        ];
                    }
                }
                acc[key] = {
                    x,
                    y,
                    rectWidth,
                    height,
                    fill,
                    line: {
                        x1: lineXPosition,
                        x2: lineXPosition,
                        y1: (i === 0 || i === 4) ? startOfChartY - lineLength : startOfChartY + (rectangleHeight / 2), // line ends or start at middle of rectangle
                        y2: (i === 0 || i === 4) ? startOfChartY + (rectangleHeight / 2) : startOfChartY + rectangleHeight + lineLength
                    },
                    text: textData
                };
                return acc;
            }, {});
            setRectangleData(r);
        }
    }, [scale, overviewData]);
    // Rectangles
    useEffect(() => {
        if (Object.keys(rectangleData).length) {
            const vizRectangles = Object.keys(rectangleData).map((key) => {
                const {
                    x,
                    y,
                    rectWidth,
                    height,
                    fill
                } = rectangleData[key];
                return (
                    <rect
                        className={`${key}`}
                        key={uniqueId()}
                        x={x}
                        y={y}
                        width={rectWidth}
                        height={height}
                        fill={fill} />
                );
            });
            setRectangles(vizRectangles);
        }
    }, [rectangleData]);
    // lines
    useEffect(() => {
        if (Object.keys(rectangleData).length) {
            const l = Object.keys(rectangleData).reduce((acc, key) => {
                const {
                    x1,
                    x2,
                    y1,
                    y2
                } = rectangleData[key].line;
                const rData = rectangleMapping[key];
                if (!rData.line) return acc;
                acc.push(
                    <line
                        key={uniqueId()}
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                        stroke={rData.fill}
                        strokeWidth={lineStrokeWidth} />
                );
                return acc;
            }, []);
            setLines(l);
        }
    }, [rectangleData]);
    // text
    useEffect(() => {
        if (Object.keys(rectangleData).length) {
            const t = Object.keys(rectangleData).reduce((acc, key) => {
                const textData = rectangleData[key].text;
                const rData = rectangleMapping[key];
                if (!rData.text) return acc;
                textData.forEach((txt) => acc.push(
                    <text
                        key={uniqueId()}
                        className={txt.className}
                        x={txt.x}
                        y={txt.y}>
                        {txt.text}
                    </text>
                ));
                return acc;
            }, []);
            setText(t);
        }
    }, [rectangleData]);

    const dateNoteStyles = {
        position: 'absolute',
        transform: `translate(${amountsPadding.left}px,${startOfChartY + rectangleHeight}px)`
    };

    return (
        <div className="amounts-viz">
            <h3 className="body__narrative amounts-viz__title">
                This is how much was spent on the COVID-19 Response <strong>in total</strong>.
            </h3>
            <DateNote styles={dateNoteStyles} />
            <svg height={amountsHeight} width={width} className="amounts-viz__svg">
                <g>
                    {rectangles}
                </g>
                <g>
                    {lines}
                </g>
                <g>
                    {text}
                </g>
            </svg>
        </div>
    );
};

AmountsVisualization.propTypes = propTypes;
export default AmountsVisualization;
