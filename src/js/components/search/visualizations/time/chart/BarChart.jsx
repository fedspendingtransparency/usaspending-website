/**
 * BarChart.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale';
import { isEqual, flattenDeep, min, max, mean, forEach, sum } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import BarItem from './BarItem';
import BarXAxis from './BarXAxis';
import BarYAxis from './BarYAxis';
import BarChartLegend from './BarChartLegend';

/* eslint-disable react/no-unused-prop-types */
// we're catching the props before they're fully set, so eslint thinks these props are unused
const propTypes = {
    groups: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    xSeries: PropTypes.array,
    rawLabels: PropTypes.array,
    ySeries: PropTypes.array,
    showTooltip: PropTypes.func,
    enableHighlight: PropTypes.bool,
    padding: PropTypes.object,
    legend: PropTypes.array,
    activeLabel: PropTypes.object,
    visualizationPeriod: PropTypes.string
};
/* eslint-enable react/no-unused-prop-types */

const defaultProps = {
    padding: {
        left: 70,
        bottom: 50
    },
    enableHighlight: true,
    legend: []
};

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xScale: null,
            yScale: null,
            yTicks: null,
            items: [],
            xValues: [],
            yValues: [],
            yAverage: 0,
            xAxisPos: 0,
            graphHeight: 0,
            activeBar: null,
            padding: {
                left: 0,
                bottom: 20
            }
        };

        this.dataPoints = {};

        this.selectBar = this.selectBar.bind(this);
        this.deselectBar = this.deselectBar.bind(this);
        this.deregisterBar = this.deregisterBar.bind(this);
    }

    componentDidMount() {
        this.generateChart(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(nextProps, this.props) || !isEqual(nextState, this.state)) {
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.generateChart(this.props);
        }
    }


    generateChart(props) {
        // flatten the Y values into a single array
        const allY = flattenDeep(props.ySeries);

        // calculate the axes and ranges
        const yRange = [];

        // determine the Y axis minimum
        let yMin = min(allY);
        if (yMin > 0) {
            // set the minimum to zero if there are no negative values
            yMin = 0;
        }
        if (allY.length > 1) {
            yRange.push(yMin);
            yRange.push(max(allY));
        }
        else if (allY.length > 0) {
            // in some cases, we may only have one data point. This is insufficient to calculate a
            // useable Y axis range from, so we need to manually enter the max or min (based on if
            // the data point is positive or negative)
            const dataPoint = allY[0];
            if (dataPoint < 0) {
                // the data point is negative, so use this as the min and manually set the max to
                // zero
                yRange.push(dataPoint);
                yRange.push(0);
            }
            else if (dataPoint === 0) {
                // the data point is zero, so use this as the min and manually set the max to an
                // arbitrary $10,000
                yRange.push(dataPoint);
                yRange.push(1000);
            }
            else {
                // the data point is positive, so use this as the max and manually set the min to
                // zero
                yRange.push(0);
                yRange.push(dataPoint);
            }
        }
        else {
            // when there is no data, fall back to an arbitrary default Y axis scale (since there's
            // no data to display)
            yRange.push(0);
            yRange.push(10000);
        }

        // calculate what the visible area of the chart itself will be (excluding the axes and their
        // labels)
        const graphWidth = props.width - props.padding.left;
        const graphHeight = props.height - props.padding.bottom;

        // use D3 to calculate the X and Y axes
        // remember, in D3 scales, domain is the data range (or data set for non-continuous data)
        // and range is the range of possible pixel positions along the axis
        const xScale = scaleBand()
            .domain(props.groups)
            .range([0, graphWidth])
            .round(true);

        const yScale = scaleLinear()
            .domain(yRange)
            .range([0, graphHeight])
            .clamp(true);

        // calculate the X axis Y position
        let xAxisPos = 0;
        if (yMin !== 0) {
            xAxisPos = yScale(0);
        }

        // generate the data points on the chart
        const items = [];
        // iterate through each of the groups
        props.groups.forEach((group, groupIndex) => {
            const yData = props.ySeries[groupIndex];
            const xData = props.xSeries[groupIndex];

            const groupWidth = xScale.bandwidth();
            // subdivide the group width based on the number of group items to determine the width
            // of each data point, with a max of 120px
            const itemWidth = min([(groupWidth / ((xData.length * 3) + 1)) * 3, 120]);
            // calculate where on the X axis the group should start
            let startingXPos = xScale(group) + (itemWidth / 6);
            if (itemWidth === 120) {
                // the total width of the group is no longer guaranteed to equal the bandwidth
                // since each bar now maxes out at 120px
                // determine what the new group width is
                const realWidth = 120 * yData.length;
                // the starting point should be the center of the X label
                // (the group start X pos + half the band width), then adjusted left for the total
                // group width (subtract by half the real width)
                startingXPos = (xScale(group) + (xScale.bandwidth() / 2)) - (realWidth / 2);
            }

            // iterate through the group data points and insert them into the chart
            yData.forEach((item, i) => {
                // the X position is the group's starting X positioning plus the previous group
                // bar widths
                const xPos = startingXPos + (i * itemWidth);
                // SVG starts drawing at the top and goes down the specified height, so for positive
                // bars, the yPos should be the top of the bar (for positive values).
                // The yScale() function returns the number of px the input value is from the
                // bottom of the Y axis. So for positive values, we can calculate the bar height by
                // substracting the distance 0 is from the bottom of the chart (yScale(0)) from
                // the yScale(item) value, (which represents the total height from the bottom of the
                // Y-axis to the data point). This gives us the height from the X-axis to the
                // positive data point.
                let barHeight = yScale(item) - yScale(0);
                // The top of the chart in SVG coordinates is (0,0), the bottom is (0,chart height).
                // Start at the bottom of the chart, go up to the X axis, and then keep going up
                // the expected bar height. This way, the bottom of the rect will always be the
                // X-axis.
                let yPos = graphHeight - yScale(0) - barHeight;

                if (item < 0) {
                    // slightly different calculation for negative values
                    // the top of the bar is always the X-axis
                    yPos = graphHeight - yScale(0);
                    // the bar height is the remaining distance to the yScale() position
                    barHeight = yScale(0) - yScale(item);
                }

                const barIdentifier = `${groupIndex}-${i}`;
                const description = `Spending in ${xData[i]}: ${MoneyFormatter.formatMoney(item)}`;

                const bar = {
                    key: `data-${barIdentifier}`,
                    identifier: barIdentifier,
                    dataY: item,
                    dataX: xData[i],
                    graphHeight,
                    height: barHeight,
                    width: itemWidth,
                    x: xPos,
                    y: yPos,
                    color: this.props.legend[0].color,
                    description,
                    selectBar: this.selectBar,
                    deselectBar: this.deselectBar,
                    deregisterBar: this.deregisterBar
                };
                items.push(bar);
            });
        });

        // save it all to state
        this.setState({
            xScale,
            yScale,
            items,
            xAxisPos,
            graphHeight,
            yValues: allY,
            xValues: props.groups,
            rawLabels: props.rawLabels,
            yAverage: mean(allY),
            yTicks: yScale.ticks(7)
        });
    }

    selectBar(barIdentifier, isTouch = false) {
        if (!this.props.enableHighlight) {
            // highlighting is disabled
            return;
        }

        if (isTouch && this.state.activeBar === barIdentifier) {
            // a touch event occurred on an already active bar, this indicates a deselection
            this.deselectBar();
            return;
        }

        this.setState({
            activeBar: barIdentifier
        }, () => {
            // notify all the child items of the change
            forEach(this.dataPoints, (value) => {
                value.updateActive(this.state.activeBar);
            });

            this.prepareTooltip(barIdentifier);
        });
    }

    deselectBar() {
        if (!this.props.enableHighlight) {
            // highlighting is disabled
            return;
        }

        this.setState({
            activeBar: null
        }, () => {
            // notify all the child items of the change
            forEach(this.dataPoints, (value) => {
                value.updateActive(this.state.activeBar);
            });

            // hide the tooltip
            this.props.showTooltip(null, 0, 0);
        });
    }

    deregisterBar(barIdentifier) {
        // the data point is about to be unmounted, remove it from the data point object
        delete this.dataPoints[barIdentifier];
    }

    prepareTooltip(barIdentifier) {
        // fetch the original data
        const groupIndex = barIdentifier.split('-')[0];
        const groupLabel = this.props.groups[groupIndex];
        const subIndex = barIdentifier.split('-')[1];
        const yValue = this.props.ySeries[groupIndex][subIndex];

        // calculate the tooltip position
        // get the top of the chart on the HTML page
        const chartTop = this.divRef.offsetTop;
        const chartLeft = this.divRef.offsetLeft;
        const xAxisHeight = this.state.graphHeight - this.state.yScale(0);

        // calculate where the halfway to the top of the bar is for positive values
        let yPos = chartTop + xAxisHeight;
        if (yValue >= 0) {
            // for positive values, the bar height is the distance from the Y scale position of
            // the data point (the top of the bar) to the X axis position
            const barHeight = this.state.yScale(yValue) - this.state.yScale(0);

            // since the tooltip exists in the HTML DOM instead of the SVG, offset its Y position
            // by adding the SVG's DOM Y position to it
            yPos -= (barHeight / 2);
        }
        else {
            // for negative values, bar height is calculated as the distance from the X axis to
            // the Y scale position for the data point (the bottom of the bar)
            const barHeight = this.state.yScale(0) - this.state.yScale(yValue);
            // since we are starting at the X axis height, we need to keep going (adding Y position)
            // to the halfway point of the bar
            yPos += (barHeight / 2);
        }

        const xPos = (
            chartLeft +
            this.state.items[groupIndex].x +
            this.state.items[groupIndex].width +
            this.props.padding.left);

        // calculate the percentage of the total
        const rawPercent = (yValue / sum(this.state.yValues));

        // format the percentage to be rounded to 1 decimal value, if it is a number
        let percentage = 'N/A';
        if (!isNaN(rawPercent)) {
            percentage = Math.round(rawPercent * 1000) / 10;
            if (percentage % 1 === 0) {
                // add a trailing .0 for whole numbers
                percentage += '.0';
            }
        }

        // show the tooltip
        this.props.showTooltip({
            xValue: this.state.items[groupIndex].dataX,
            yValue: this.state.items[groupIndex].dataY,
            percentage,
            group: groupLabel
        }, xPos, yPos, this.state.items[groupIndex].width);
    }

    render() {
        // add 20px to the top of the chart to avoid cutting off label text
        // wrap the chart contents in a group and transform it down 20px to avoid impacting
        // positioning calculations
        const bars = this.state.items.map((item) => (
            <BarItem
                key={item.key}
                identifier={item.identifier}
                dataY={item.dataY}
                dataX={item.dataX}
                graphHeight={item.graphHeight}
                height={item.height}
                width={item.width}
                x={item.x}
                y={item.y}
                color={item.color}
                description={item.description}
                selectBar={item.selectBar}
                deselectBar={item.deselectBar}
                deregisterBar={item.deregisterBar}
                ref={(component) => {
                    this.dataPoints[item.identifier] = component;
                }} />
        ));

        return (
            <div
                ref={(div) => {
                    this.divRef = div;
                }}>
                <svg
                    className="bar-graph"
                    width={this.props.width}
                    height={this.props.height + 20}
                    ref={(svg) => {
                        this.svgRef = svg;
                    }}>
                    <g className="bar-graph-body" transform="translate(0,20)">
                        <BarYAxis
                            height={this.props.height - this.props.padding.bottom}
                            width={this.props.width - this.props.padding.left}
                            padding={this.props.padding}
                            data={this.state.yValues}
                            scale={this.state.yScale}
                            ticks={this.state.yTicks}
                            average={this.state.yAverage}
                            generatedYAxis={this.generatedYAxis} />

                        <BarXAxis
                            top={this.props.height - this.props.padding.bottom}
                            width={this.props.width - this.props.padding.left}
                            padding={this.props.padding}
                            data={this.state.xValues}
                            rawLabels={this.state.rawLabels}
                            scale={this.state.xScale}
                            axisPos={this.state.xAxisPos}
                            activeLabel={this.props.activeLabel}
                            visualizationPeriod={this.props.visualizationPeriod} />

                        <g
                            className="bar-data"
                            transform={`translate(${this.props.padding.left},0)`}>
                            {bars}
                        </g>

                        <g
                            className="legend-container"
                            transform={`translate(
                                ${this.props.padding.left},
                                ${this.props.height - 20})`}>
                            <BarChartLegend legend={this.props.legend} />
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

BarChart.propTypes = propTypes;
BarChart.defaultProps = defaultProps;
