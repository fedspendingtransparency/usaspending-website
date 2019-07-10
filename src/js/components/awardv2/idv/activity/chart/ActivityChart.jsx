/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';
import { calculateTreemapPercentage } from 'helpers/moneyFormatter';
import VerticalLine from '../../../../sharedComponents/VerticalLine';
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
    awardIndexForTooltip: PropTypes.number
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
            bars: [],
            yTicks: null,
            xTicks: null,
            xAxisPos: 0
        };
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.awardIndexForTooltip, prevProps.awardIndexForTooltip)) {
            this.generateChart();
        }
        if (!isEqual(this.props.awards, prevProps.awards)) {
            this.generateChart();
        }
        if (!isEqual(this.props.width, prevProps.width)) {
            this.generateChart();
        }
    }

    getBars(xScale, yScale, graphWidth, graphHeight) {
        // Map each award to a "bar" component
        return this.props.awards.map((bar, index) => {
            const data = bar;
            const { padding, barHeight, height } = this.props;
            const start = xScale(bar._startDate.valueOf()) + padding.left;
            const end = xScale(bar._endDate.valueOf()) + padding.left;
            const width = end - start;
            // create a scale for obligated amount width using awarded amount
            // and the awarded amount width
            const obligatedAmountScale = scaleLinear()
                .domain([0, bar._awardedAmount])
                .range([0, width])
                .nice();
            // scale the abligated amount to create the correct width
            const obligatedAmountWidth = obligatedAmountScale(bar._obligatedAmount);
            const yPosition = (height - 30) - yScale(bar._awardedAmount) - barHeight;
            // adding these for the tooltip positioning
            data.index = index;
            data.graphWidth = graphWidth;
            data.graphHeight = graphHeight;
            data.start = start;
            data.barWidth = width;
            data.x = start;
            data.y = (360 - yPosition) - ((this.props.barHeight / 2) - 1);
            // create percentage for description
            // not handling bad data as that will be handled elsewhere
            const percentage = calculateTreemapPercentage(bar._obligatedAmount, bar._awardedAmount);
            const description = `A ${bar.grandchild ? 'grandchild' : 'child'} award with a start date of ${bar.startDate}, an end date of ${bar.endDate}, an awarded amount of ${bar.awardedAmount} displayed in grey, and an obligated amount of ${bar.obligatedAmount}, displayed in green. (${percentage})`;
            let style = null;
            // show stroke on bar when entering tooltip div
            // checks to make sure the mouse is in a tooltip
            // and to make sure we have the index of the correct bar
            if (this.props.showTooltipStroke && (this.props.awardIndexForTooltip === index)) {
                style = { stroke: '#3676b6', strokeWidth: 1 };
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
                        index={index}
                        height={barHeight}
                        start={start}
                        width={width}
                        yPosition={yPosition}
                        data={data}
                        showTooltip={this.props.showTooltip}
                        hideTooltip={this.props.hideTooltip} />
                    {/* obligated amount bar */}
                    <ActivityChartBar
                        isObligated
                        key={`bar-${bar._obligatedAmount}-${bar.id}`}
                        index={index}
                        height={barHeight}
                        start={start}
                        awardedWidth={width}
                        width={obligatedAmountWidth}
                        yPosition={yPosition}
                        data={data}
                        showTooltip={this.props.showTooltip}
                        hideTooltip={this.props.hideTooltip} />
                </g>
            );
        });
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

    generateChart() {
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

        const bars = this.getBars(xScale, yScale, graphWidth, graphHeight);

        this.setState({
            xRange,
            yRange,
            xScale,
            yScale,
            bars,
            yTicks: yScale.ticks(6),
            xTicks: xScale.ticks(5)
        });
    }

    render() {
        const { width, height, padding } = this.props;
        const { xScale, xRange } = this.state;
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
                        height={height - padding.bottom}
                        width={width - padding.left}
                        padding={padding}
                        ticks={this.state.xTicks}
                        scale={xScale} />
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
                            showTextLeft />}
                        {this.state.bars}
                    </g>
                </g>
            </svg>
        );
    }
}

ActivityChart.propTypes = propTypes;
ActivityChart.defaultProps = defaultProps;
