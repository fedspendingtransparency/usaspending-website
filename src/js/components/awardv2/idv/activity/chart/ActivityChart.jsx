/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';

import ActivityChartBar from './ActivityChartBar';
import ActivityXAxis from './ActivityXAxis';
import ActivityYAxis from './ActivityYAxis';

const propTypes = {
    awards: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number,
    itemHeight: PropTypes.number,
    xSeries: PropTypes.array,
    ySeries: PropTypes.array,
    padding: PropTypes.object,
    barHeight: PropTypes.number,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func
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
        if (!isEqual(this.props.awards, prevProps.awards)) {
            this.generateChart();
        }
        if (!isEqual(this.props.width, prevProps.width)) {
            this.generateChart();
        }
    }
    generateChart() {
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

        // calculate what the visible area of the chart itself will be (excluding the axes and their
        // labels)
        const graphWidth = this.props.width - this.props.padding.left;
        const graphHeight = this.props.height - this.props.padding.bottom;

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

        // calculate the X axis Y position
        let xAxisPos = 0;
        if (minValueY !== 0) {
            xAxisPos = yScale(0);
        }

        // Map each award to a "bar" component
        const bars = this.props.awards.map((bar, index) => {
            const { padding, barHeight, height } = this.props;
            const start = xScale(bar._startDate.valueOf()) + padding.left;
            const end = xScale(bar._endDate.valueOf()) + padding.left;
            const width = end - start;
            const yPosition = (height - 30) - yScale(bar._awardedAmount) - barHeight;
            const description = `A ${bar.grandchild ? 'grandchild' : 'child'} award with a start date of ${bar.startDate}, an end date of ${bar.endDate}, an awarded amount of ${bar.awardedAmount}, and an obligated amount of ${bar.obligatedAmount}.`;
            return (
                <ActivityChartBar
                    key={`bar-${bar._awardedAmount}-${index}`}
                    padding={this.props.padding}
                    index={index}
                    height={barHeight}
                    start={start}
                    width={width}
                    yPosition={yPosition}
                    data={bar}
                    showTooltip={this.props.showTooltip}
                    hideTooltip={this.props.hideTooltip}
                    description={description} />
            );
        });

        this.setState({
            xRange,
            yRange,
            xScale,
            yScale,
            bars,
            xAxisPos,
            yTicks: yScale.ticks(6),
            xTicks: xScale.ticks(5)
        });
    }
    render() {
        return (
            <svg
                className="activity-chart"
                width={this.props.width}
                height={this.props.height + 45}>
                <g
                    className="activity-chart-body"
                    transform="translate(0,45)">
                    <ActivityYAxis
                        height={this.props.height - this.props.padding.bottom}
                        width={this.props.width - this.props.padding.left}
                        barHeight={this.props.barHeight}
                        padding={this.props.padding}
                        data={this.props.ySeries}
                        scale={this.state.yScale}
                        ticks={this.state.yTicks} />
                    <ActivityXAxis
                        height={this.props.height - this.props.padding.bottom}
                        width={this.props.width - this.props.padding.left}
                        padding={this.props.padding}
                        ticks={this.state.xTicks}
                        scale={this.state.xScale}
                        axisPos={this.state.xAxisPos} />
                    <g
                        className="activity-chart-data">
                        {this.state.bars}
                    </g>
                </g>
            </svg>
        );
    }
}

ActivityChart.propTypes = propTypes;
ActivityChart.defaultProps = defaultProps;
