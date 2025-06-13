/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';
import { calculatePercentage } from 'helpers/moneyFormatter';
import { nearestQuarterDate } from 'helpers/fiscalYearHelper';
import RectanglePattern from 'components/sharedComponents/patterns/RectanglePattern';
import SVGLine from 'components/sharedComponents/SVGLine';
import ActivityXAxis from 'components/award/shared/activity/ActivityXAxis';
import ActivityYAxis from 'components/award/shared/activity/ActivityYAxis';
import ActivityChartBar from './ActivityChartBar';

const propTypes = {
    awards: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number,
    xSeries: PropTypes.array,
    ySeries: PropTypes.array,
    padding: PropTypes.object,
    barHeight: PropTypes.number,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    showTooltipStroke: PropTypes.bool,
    awardIndexForTooltip: PropTypes.number,
    setOverspent: PropTypes.func
};

const defaultProps = {
    padding: {
        left: 45,
        bottom: 30
    },
    barHeight: 10
};

const ActivityChart = ({
    awards,
    height,
    width,
    xSeries,
    ySeries,
    padding = {
        left: 45,
        bottom: 30
    },
    barHeight = 10,
    showTooltip,
    hideTooltip,
    showTooltipStroke,
    awardIndexForTooltip,
    setOverspent
}) => {
    const [xRange, setXRange] = useState([]);
    const [yTicks, setYTicks] = useState(null);
    const [xTicks, setXTicks] = useState(null);
    const [graphWidth, setGraphWidth] = useState(0);
    const [graphHeight, setGraphHeight] = useState(0);
    const [bars, setBars] = useState([]);

    const xScale = useRef(null);
    const yScale = useRef(null);

    const currentDate = Date.now();

    const getXTickDateAndLabel = (date) => {
        const newDate = new Date(date);
        const month = newDate.getMonth();
        let year = newDate.getFullYear();

        if (month === 9) year += 1;

        // add 1 to the year because it is the next fiscal year
        const shortYear = (year).toString().slice(-2);
        const shortMonth = newDate.toLocaleString('en-us', { month: 'short' }).toUpperCase();

        const label = `${shortMonth} FY '${shortYear}`;

        return { date: newDate, label };
    };

    const createBars = () => {
        if (!bars) {
            return null;
        }

        // Map each award to a "bar" component
        return bars.map((bar, index) => {
            const {
                barHeight: barHeightLocal,
                start,
                barWidth,
                yPosition,
                description
            } = bar;

            // bar styling normal
            let style = { fill: `url(#normal${index})` };

            // handle overspending style
            if (bar._obligatedAmount > bar._awardedAmount) {
                style = { fill: "url(#diagonalHatch)" };
            }

            style = { stroke: 'white', strokeWidth: 1, ...style };

            // show stroke on bar when entering tooltip div
            // checks to make sure the mouse is in a tooltip
            // and to make sure we have the index of the correct bar
            if (showTooltipStroke && (awardIndexForTooltip === index)) {
                style.stroke = '#3676b6';
                style.strokeWidth = 1;
            }

            // bar normal design
            const barHeightString = barHeightLocal.toString();
            const patternProps = {
                id: `normal${index}`,
                width: barHeightString,
                height: barHeightString
            };

            const normalPatternRectangles = [
                {
                    key: `normal${index}`,
                    width: '100%',
                    height: barHeightString,
                    fill: '#D8D8D8'
                },
                {
                    key: `normal2${index}`,
                    width: `${bar.obligatedAmountWidth}`,
                    height: barHeightString,
                    fill: '#94BFA2'
                }
            ];

            let pattern = (
                <RectanglePattern
                    patternProps={patternProps}
                    rectangles={normalPatternRectangles} />
            );

            // bar overspending design
            if (bar._obligatedAmount > bar._awardedAmount) {
                patternProps.id = 'diagonalHatch';
                patternProps.patternTransform = 'rotate(135, 0, 0)';
                patternProps.patternUnits = 'userSpaceOnUse';

                const overspendingRectangles = [
                    {
                        key: `overspending${index}`,
                        width: '100%',
                        height: barHeightString,
                        fill: '#94BFA2'
                    },
                    {
                        key: `overspending2${index}`,
                        width: '2',
                        height: barHeightString,
                        fill: 'rgb(188,92,35)'
                    }
                ];

                pattern = (
                    <RectanglePattern
                        patternProperties={patternProps}
                        rectangles={overspendingRectangles} />
                );
            }

            return (
                <g
                    tabIndex="0"
                    className="activity-chart-bar-container"
                    key={`bar-${bar._awardedAmount}-${index}`}
                    description={description}>
                    <ActivityChartBar
                        style={style}
                        pattern={pattern}
                        index={index}
                        height={barHeightLocal}
                        start={start}
                        width={barWidth}
                        yPosition={yPosition}
                        data={bar}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip} />
                </g>
            );
        });
    };

    const generateBarData = () => {
        // Map each award to a "bar" component
        const barsLocal = awards.map((bar, index) => {
            const data = bar;
            const start = xScale.current(bar._startDate.valueOf()) + padding.left;
            const end = xScale.current(bar._endDate.valueOf()) + padding.left;

            data.barWidth = end - start;

            if (data.barWidth < 1.5) {
                data.barWidth = 1.5;
            }

            // create a scale for obligated amount width using awarded amount
            // and the awarded amount width
            const obligatedAmountScale = scaleLinear()
                .domain([0, bar._awardedAmount])
                .range([0, data.barWidth]);

            // scale the abligated amount to create the correct width
            data.obligatedAmountWidth = obligatedAmountScale(bar._obligatedAmount);

            // -1 for the stroke covering the x-axis
            data.yPosition = (height - 30) - yScale.current(bar._obligatedAmount) - barHeight - 1;

            // adding these for the tooltip positioning
            data.index = index;
            data.graphWidth = graphWidth;
            data.graphHeight = graphHeight;
            data.start = start;
            data.end = end;
            data.x = start;

            // the distance from the bottom (Note: this from the bottom since we invert the chart)
            // of the chart to the award bar, then subtract the about half the bar height
            // to position tooltip in the middle
            data.y = (385 - data.yPosition) - (barHeight - 4);

            // create percentage for description
            // not handling bad data as that will be handled elsewhere
            const percentage = calculatePercentage(bar._obligatedAmount, bar._awardedAmount);

            data.description = `A ${bar.grandchild ?
                'grandchild' : 'child'} award with a start date of ${bar.startDate},
                an end date of ${bar.endDate},
                an awarded amount of ${bar.awardedAmount} displayed in grey,
                and an obligated amount of ${bar.obligatedAmount},
                displayed in green. (${percentage})`;
            data.barHeight = barHeight;

            if (bar._obligatedAmount > bar._awardedAmount) {
                setOverspent();
            }

            return data;
        });

        setBars(barsLocal);
    };

    const xyRange = () => {
        const yRangeArray = [];
        const xRangeArray = [];

        // If there is only one item, manually set the min and max values
        // Y Axis (Awarded Amounts) will go from zero to the one award's amount
        let minValueY = 0;
        let maxValueY = awards[0]._obligatedAmount;

        // X Axis (Dates) will go from the award's start date to its end date
        let minValueX = awards[0]._startDate.valueOf();
        let maxValueX = awards[0]._endDate.valueOf();

        // Otherwise, find the min and max of all values for awarded amounts and dates
        if (awards.length > 1) {
            minValueY = min(ySeries);
            maxValueY = max(ySeries);
            minValueX = min(xSeries);
            maxValueX = max(xSeries);
        }

        yRangeArray.push(minValueY);
        yRangeArray.push(maxValueY);
        xRangeArray.push(minValueX);
        xRangeArray.push(maxValueX);

        return { xRangeArray, yRangeArray };
    };

    const graphWidthAndHeight = () => {
        // calculate what the visible area of the chart itself will be (excluding the axes and their
        // labels)
        const widthLocal = width - padding.left;
        const heightLocal = height - padding.bottom;

        return { widthLocal, heightLocal };
    };

    const createXTicks = (xScaleLocal, widthLocal) => {
        const xTicksLocal = xScaleLocal.ticks(5);
        const startOfGraphMillis = xScaleLocal.invert(0);
        const endOfGraphMillis = xScaleLocal.invert(widthLocal);

        return xTicksLocal.reduce((acc, tick) => {
            // find nearest quarter date
            const quarterMillis = nearestQuarterDate(tick);
            // since we are finding the nearest quarter date from D3's generated ticks
            // we could be manipulating the date to a position off the graph
            // this if statement removes those dates
            if (startOfGraphMillis <= quarterMillis && quarterMillis <= endOfGraphMillis) {
                // format tick with date and label
                acc.push(getXTickDateAndLabel(quarterMillis));
                return acc;
            }
            return acc;
        }, []);
    };

    const generateChartData = () => {
        const { xRangeArray, yRangeArray } = xyRange();
        const { widthLocal, heightLocal } = graphWidthAndHeight();

        // Create the scales using D3
        // domain is the data range, and range is the
        // range of possible pixel positions along the axis
        const xScaleLocal = scaleLinear()
            .domain(xRangeArray)
            .range([0, widthLocal])
            .nice();
        const yScaleLocal = scaleLinear()
            .domain(yRangeArray)
            .range([0, heightLocal])
            .nice();

        const xTicksLocal = createXTicks(xScaleLocal, widthLocal);

        setXRange(xRangeArray);
        xScale.current = xScaleLocal;
        yScale.current = yScaleLocal;
        setGraphWidth(widthLocal);
        setGraphHeight(heightLocal);
        setYTicks(yScaleLocal.ticks(6));
        setXTicks(xTicksLocal);
    };

    useEffect(() => {
        generateChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [awardIndexForTooltip, awards, width]);

    useEffect(() => {
        if (
            (typeof xScale.current === 'function') &&
            (typeof yScale.current === 'function') &&
            graphWidth > 0 &&
            graphHeight > 0
        ) {
            generateBarData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [xScale.current, yScale.current, graphWidth, graphHeight]);

    return (
        <svg
            className="activity-chart"
            width={width}
            // adds back in the original bottom padding from graphWidthAndHeight()
            // and adds the labels
            height={height + 70}>
            <g
                className="activity-chart-body"
                transform="translate(0,45)">
                <ActivityYAxis
                    height={height - padding.bottom}
                    width={width - padding.left}
                    extendLine={barHeight}
                    padding={padding}
                    scale={yScale.current}
                    ticks={yTicks} />
                <ActivityXAxis
                    height={height - padding.bottom}
                    width={graphWidth}
                    padding={padding}
                    ticks={xTicks}
                    scale={xScale.current}
                    line />
                <g
                    className="activity-chart-data">
                    {createBars()}
                    {/* Today Line */}
                    {xScale.current && <SVGLine
                        scale={xScale.current}
                        y1={-10}
                        y2={height - padding.bottom}
                        textY={0}
                        text="Today"
                        max={xRange[1]}
                        min={xRange[0]}
                        position={currentDate}
                        showTextPosition="top"
                        adjustmentX={padding.left} />}
                </g>
            </g>
        </svg>
    );
};

ActivityChart.propTypes = propTypes;
ActivityChart.defaultProps = defaultProps;
export default ActivityChart;
