/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, min, max } from 'lodash';
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

export default class ActivityChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xScale: null,
            yScale: null,
            xRange: [],
            yRange: [],
            yTicks: null,
            xTicks: null,
            xAxisPos: 0,
            graphWidth: 0,
            graphHeight: 0,
            bars: []
        };
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.awardIndexForTooltip, prevProps.awardIndexForTooltip)) {
            this.generateChartData();
        }
        if (!isEqual(this.props.awards, prevProps.awards)) {
            this.generateChartData();
        }
        if (!isEqual(this.props.width, prevProps.width)) {
            this.generateChartData();
        }
    }

    getXTickDateAndLabel(date) {
        const newDate = new Date(date);
        const month = newDate.getMonth();
        let year = newDate.getFullYear();
        if (month === 9) year += 1;
        // add 1 to the year because it is the next fiscal year
        const shortYear = (year).toString().slice(-2);
        const shortMonth = newDate.toLocaleString('en-us', { month: 'short' }).toUpperCase();
        const label = `${shortMonth} FY '${shortYear}`;
        return { date: newDate, label };
    }

    createBars() {
        if (!this.state.bars) return null;
        // Map each award to a "bar" component
        return this.state.bars.map((bar, index) => {
            const {
                barHeight,
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
            if (this.props.showTooltipStroke && (this.props.awardIndexForTooltip === index)) {
                style.stroke = '#3676b6';
                style.strokeWidth = 1;
            }
            // bar normal design
            const barHeightString = barHeight.toString();
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
                    {/* awarded amount bar */}
                    <ActivityChartBar
                        style={style}
                        pattern={pattern}
                        index={index}
                        height={barHeight}
                        start={start}
                        width={barWidth}
                        yPosition={yPosition}
                        data={bar}
                        showTooltip={this.props.showTooltip}
                        hideTooltip={this.props.hideTooltip} />
                </g>
            );
        });
    }

    generateBarData() {
        const {
            xScale,
            yScale,
            graphWidth,
            graphHeight
        } = this.state;
        // Map each award to a "bar" component
        const bars = this.props.awards.map((bar, index) => {
            const data = bar;
            const {
                padding,
                barHeight,
                height
            } = this.props;
            const start = xScale(bar._startDate.valueOf()) + padding.left;
            const end = xScale(bar._endDate.valueOf()) + padding.left;
            data.barWidth = end - start;
            if (data.barWidth < 1.5) data.barWidth = 1.5;
            // create a scale for obligated amount width using awarded amount
            // and the awarded amount width
            const obligatedAmountScale = scaleLinear()
                .domain([0, bar._awardedAmount])
                .range([0, data.barWidth]);
            // scale the abligated amount to create the correct width
            data.obligatedAmountWidth = obligatedAmountScale(bar._obligatedAmount);
            // -1 for the stroke covering the x-axis
            data.yPosition = (height - 30) - yScale(bar._obligatedAmount) - barHeight - 1;
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
            data.y = (385 - data.yPosition) - (this.props.barHeight - 4);
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
                this.props.setOverspent();
            }
            return data;
        });
        this.setState({ bars });
    }

    xyRange() {
        const yRange = [];
        const xRange = [];
        // If there is only one item, manually set the min and max values
        // Y Axis (Awarded Amounts) will go from zero to the one award's amount
        let minValueY = 0;
        let maxValueY = this.props.awards[0]._obligatedAmount;
        // X Axis (Dates) will go from the award's start date to its end date
        let minValueX = this.props.awards[0]._startDate.valueOf();
        let maxValueX = this.props.awards[0]._endDate.valueOf();

        // Otherwise, find the min and max of all values for awarded amounts and dates
        if (this.props.awards.length > 1) {
            minValueY = min(this.props.ySeries);
            maxValueY = max(this.props.ySeries);
            minValueX = min(this.props.xSeries);
            maxValueX = max(this.props.xSeries);
        }
        yRange.push(minValueY);
        yRange.push(maxValueY);
        xRange.push(minValueX);
        xRange.push(maxValueX);
        return { xRange, yRange };
    }

    graphWidthAndHeight() {
    // calculate what the visible area of the chart itself will be (excluding the axes and their
    // labels)
        const graphWidth = this.props.width - this.props.padding.left;
        const graphHeight = this.props.height - this.props.padding.bottom;
        return { graphWidth, graphHeight };
    }

    createXTicks(xScale, graphWidth) {
        const xTicks = xScale.ticks(5);
        const startOfGraphMillis = xScale.invert(0);
        const endOfGraphMillis = xScale.invert(graphWidth);
        return xTicks.reduce((acc, tick) => {
            // find nearest quarter date
            const quarterMillis = nearestQuarterDate(tick);
            // since we are finding the nearest quarter date from D3's generated ticks
            // we could be manipulating the date to a position off the graph
            // this if statement removes those dates
            if (startOfGraphMillis <= quarterMillis && quarterMillis <= endOfGraphMillis) {
                // format tick with date and label
                acc.push(this.getXTickDateAndLabel(quarterMillis));
                return acc;
            }
            return acc;
        }, []);
    }

    generateChartData() {
        const { xRange, yRange } = this.xyRange();
        const { graphWidth, graphHeight } = this.graphWidthAndHeight();
        // Create the scales using D3
        // domain is the data range, and range is the
        // range of possible pixel positions along the axis
        const xScale = scaleLinear()
            .domain(xRange)
            .range([0, graphWidth])
            .nice();
        const yScale = scaleLinear()
            .domain(yRange)
            .range([0, graphHeight])
            .nice();

        const xTicks = this.createXTicks(xScale, graphWidth);

        this.setState({
            xRange,
            yRange,
            xScale,
            yScale,
            graphWidth,
            graphHeight,
            yTicks: yScale.ticks(6),
            xTicks
        }, this.generateBarData);
    }

    render() {
        const bars = this.createBars();
        const { width, height, padding } = this.props;
        const currentDate = Date.now();
        const {
            xScale,
            xRange,
            graphWidth
        } = this.state;
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
                        extendLine={this.props.barHeight}
                        padding={padding}
                        scale={this.state.yScale}
                        ticks={this.state.yTicks} />
                    <ActivityXAxis
                        height={height - padding.bottom}
                        width={graphWidth}
                        padding={padding}
                        ticks={this.state.xTicks}
                        scale={xScale}
                        line />
                    <g
                        className="activity-chart-data">
                        {bars}
                        {/* Today Line */}
                        {xScale && <SVGLine
                            scale={xScale}
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
    }
}

ActivityChart.propTypes = propTypes;
ActivityChart.defaultProps = defaultProps;
