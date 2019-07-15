/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';
import { calculateTreemapPercentage } from 'helpers/moneyFormatter';
import TwoRectangles from 'components/sharedComponents/patterns/TwoRectangles';
import VerticalLine from 'components/sharedComponents/VerticalLine';
import ActivityChartBar from './ActivityChartBar';
import ActivityXAxis from './ActivityXAxis';
import ActivityYAxis from './ActivityYAxis';

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
            let { style } = bar;
            // bar styling normal
            style = { fill: `url(#normal${index}` };
            // handle overspending style
            if (bar._obligatedAmount > bar._awardedAmount) {
                style = { fill: "url(#diagonalHatch)" };
            }
            // show stroke on bar when entering tooltip div
            // checks to make sure the mouse is in a tooltip
            // and to make sure we have the index of the correct bar
            if (this.props.showTooltipStroke && (this.props.awardIndexForTooltip === index)) {
                style = { stroke: '#3676b6', strokeWidth: 1, ...style };
            }
            // bar normal design
            const barHeightString = barHeight.toString();
            let pattern = (
                <TwoRectangles
                    id={`normal${index}`}
                    width={barHeightString}
                    height={barHeightString}
                    backgroundWidth="100%"
                    backgroundHeight={barHeightString}
                    backgroundFill="#D8D8D8"
                    fillWidth={`${bar.obligatedAmountWidth}`}
                    fillHeight={barHeightString}
                    fillFill="#94BFA2" />
            );
            // bar overspending design
            if (bar._obligatedAmount > bar._awardedAmount) {
                pattern = (
                    <TwoRectangles
                        id="diagonalHatch"
                        width={barHeightString}
                        height={barHeightString}
                        patternTransform="rotate(135, 0, 0)"
                        patternUnits="userSpaceOnUse"
                        backgroundWidth="100%"
                        backgroundHeight={barHeightString}
                        backgroundFill="#94BFA2"
                        fillWidth="2"
                        fillHeight={barHeightString}
                        fillFill="rgb(188,92,35)" />
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
            // create a scale for obligated amount width using awarded amount
            // and the awarded amount width
            const obligatedAmountScale = scaleLinear()
                .domain([0, bar._awardedAmount])
                .range([0, data.barWidth]);
            // scale the abligated amount to create the correct width
            data.obligatedAmountWidth = obligatedAmountScale(bar._obligatedAmount);
            data.yPosition = (height - 30) - yScale(bar._awardedAmount) - barHeight;
            // adding these for the tooltip positioning
            data.index = index;
            data.graphWidth = graphWidth;
            data.graphHeight = graphHeight;
            data.start = start;
            data.x = start;
            data.y = (360 - data.yPosition) - (this.props.barHeight - 4);
            // create percentage for description
            // not handling bad data as that will be handled elsewhere
            const percentage = calculateTreemapPercentage(bar._obligatedAmount, bar._awardedAmount);
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
        let maxValueY = this.props.awards[0]._awardedAmount;
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

        this.setState({
            xRange,
            yRange,
            xScale,
            yScale,
            graphWidth,
            graphHeight,
            yTicks: yScale.ticks(6),
            xTicks: xScale.ticks(5)
        }, this.generateBarData);
    }

    render() {
        const { width, height, padding } = this.props;
        const { xScale, xRange, graphHeight, graphWidth } = this.state;
        const bars = this.createBars();
        return (
            <svg
                className="activity-chart"
                width={width}
                height={height + 45}>
                <g
                    className="activity-chart-body"
                    transform="translate(0,45)">
                    <ActivityYAxis
                        height={height - padding.bottom}
                        width={width - padding.left}
                        barHeight={this.props.barHeight}
                        padding={padding}
                        data={this.props.ySeries}
                        scale={this.state.yScale}
                        ticks={this.state.yTicks} />
                    <ActivityXAxis
                        height={graphHeight}
                        width={graphWidth}
                        padding={padding}
                        ticks={this.state.xTicks}
                        scale={xScale}
                        endOf />
                    <g
                        className="activity-chart-data">
                        {/* Today Line */}
                        {xScale && <VerticalLine
                            xScale={xScale}
                            y1={-10}
                            y2={height - 30}
                            textY={0}
                            xMax={xRange[1]}
                            xMin={xRange[0]}
                            showTextLeft
                            adjustmentX={padding.left} />}
                        {bars}
                    </g>
                </g>
            </svg>
        );
    }
}

ActivityChart.propTypes = propTypes;
ActivityChart.defaultProps = defaultProps;
