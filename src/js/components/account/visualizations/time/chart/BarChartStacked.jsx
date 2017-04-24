/**
 * BarChartStacked.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import _ from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import BarXAxis from 'components/search/visualizations/time/chart/BarXAxis';
import BarYAxis from 'components/search/visualizations/time/chart/BarYAxis';
import BarChartLegend from 'components/search/visualizations/time/chart/BarChartLegend';
import StackedBarItem from './StackedBarItem';
import OutlayItem from './OutlayItem';

/* eslint-disable react/no-unused-prop-types */
// we're catching the props before they're fully set, so eslint thinks these props are unused
const propTypes = {
    groups: React.PropTypes.array,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    allY: React.PropTypes.array,
    xSeries: React.PropTypes.array,
    ySeries: React.PropTypes.array,
    showTooltip: React.PropTypes.func,
    enableHighlight: React.PropTypes.bool,
    padding: React.PropTypes.object,
    legend: React.PropTypes.array,
    hasFilteredObligated: React.PropTypes.bool
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

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps, this.props)) {
            this.generateChart(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)) {
            return true;
        }
        return false;
    }

    generateChart(props) {
        // flatten the Y values into a single array
        const allY = props.allY;

        // calculate the axes and ranges
        const yRange = [];

        // determine the Y axis minimum
        let yMin = _.min(allY);
        if (yMin > 0) {
            // set the minimum to zero if there are no negative values
            yMin = 0;
        }
        if (allY.length > 1) {
            yRange.push(yMin);
            yRange.push(_.max(allY));
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

            // put 20px padding on each side of the group
            const groupWidth = xScale.bandwidth() - 40;
            // subdivide the group width based on the number of group items to determine the width
            // of each data point, with a max of 120px
            const itemWidth = _.min([groupWidth / yData.length, 120]);
            // calculate where on the X axis the group should start (offset this by 20px to account
            // for the padding between groups)
            let startingXPos = xScale(group) + 20;
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
            if (this.props.hasFilteredObligated) {
                yData.forEach((stack, stackIndex) => {
                    // within each X axis grouping of Y data elements is yet another group of Y data values
                    // but these are stacked on top of each other

                    // the X position is the group's starting X positioning plus the previous group
                    // bar widths
                    const xPos = startingXPos + (stackIndex * itemWidth);

                    // parse the balances
                    // first build the obligation (filter) bar
                    // since SVG y=0 is the top of the graph, we need to yScale position from the height
                    // to get the actual position (essentially we're drawing this upside down)
                    let obligatedFilteredTop = graphHeight - yScale(stack.obligatedFiltered);
                    let obligatedFilteredHeight = yScale(stack.obligatedFiltered) - yScale(0);
                    if (stack.obligatedFiltered < 0) {
                        // if the value is negative, however, the top of the bar is actually the X axis
                        obligatedFilteredTop = graphHeight - yScale(0);
                        obligatedFilteredHeight = yScale(0) - yScale(stack.obligatedFiltered);
                    }

                    const obligatedFilteredIdentifier = `obligatedFiltered-${groupIndex}-${stackIndex}`;
                    const obligatedFilteredDescription = `Obligated balance (filtered) in \
${xData}: ${MoneyFormatter.formatMoney(stack.obligatedFiltered)}`;

                    const obligatedFilteredBar = (<StackedBarItem
                        key={`data-${obligatedFilteredIdentifier}`}
                        identifier={obligatedFilteredIdentifier}
                        color={this.props.legend[1].color}
                        height={obligatedFilteredHeight}
                        width={itemWidth}
                        x={xPos}
                        y={obligatedFilteredTop}
                        description={obligatedFilteredDescription}
                        selectBar={this.selectBar}
                        deselectBar={this.deselectBar}
                        deregisterBar={this.deregisterBar}
                        ref={(component) => {
                            this.dataPoints[obligatedFilteredIdentifier] = component;
                        }} />);
                    items.push(obligatedFilteredBar);

                    // next stack the the obligation (other) bar on top
                    const obligatedOther = stack.obligationTotal - stack.obligatedFiltered;
                    let obligatedOtherTop = graphHeight - yScale(stack.obligationTotal);
                    let obligatedOtherHeight = yScale(obligatedOther) - yScale(0);
                    if (stack.obligatedFiltered < 0 && stack.obligationTotal > 0) {
                        // handle a case where the total is positive but the filtered value is negative
                        // only extend the bar down to the X axis
                        obligatedOtherHeight = yScale(stack.obligationTotal) - yScale(0);
                    }
                    else if (stack.obligatedFiltered < 0 && stack.obligationTotal < 0) {
                        // handle a case where both filtered and total are negative
                        if (stack.obligationTotal < stack.obligatedFiltered) {
                            // obligated total is less (more negative) than obligated filtered
                            obligatedOtherTop = obligatedFilteredTop + obligatedFilteredHeight;
                            obligatedOtherHeight = yScale(stack.obligatedFiltered)
                                - yScale(stack.obligationTotal);
                        }
                        else {
                            // obligated total is more (less negative) than obligated filtered
                            // set the top of the bar to the X axis
                            obligatedOtherTop = graphHeight - yScale(0);
                            obligatedOtherHeight = yScale(0) - yScale(stack.obligationTotal);
                        }
                    }

                    const obligatedOtherIdentifier = `obligatedOther-${groupIndex}-${stackIndex}`;
                    const obligatedOtherDescription = `Obligated balance (excluded from filter) in \
${xData}: ${MoneyFormatter.formatMoney(obligatedOther)}`;

                    const obligatedOtherBar = (<StackedBarItem
                        key={`data-${obligatedOtherIdentifier}`}
                        identifier={obligatedOtherIdentifier}
                        color={this.props.legend[2].color}
                        height={obligatedOtherHeight}
                        width={itemWidth}
                        x={xPos}
                        y={obligatedOtherTop}
                        description={obligatedOtherDescription}
                        selectBar={this.selectBar}
                        deselectBar={this.deselectBar}
                        deregisterBar={this.deregisterBar}
                        ref={(component) => {
                            this.dataPoints[obligatedOtherIdentifier] = component;
                        }} />);
                    items.push(obligatedOtherBar);

                    // finally, stack the unobligated value on top
                    let unobligatedTop = graphHeight - yScale(stack.budgetAuthority);
                    let unobligatedHeight = yScale(stack.unobligated);
                    if (stack.unobligated < 0) {
                        // if the value is negative, however, the top of the bar is actually the X axis
                        unobligatedTop = graphHeight - yScale(0);
                        unobligatedHeight = yScale(0) - yScale(stack.unobligated);
                    }
                    const unobligatedIdentifier = `unobligated-${groupIndex}-${stackIndex}`;
                    const unobligatedDescription = `Unobligated balance in ${xData}: \
${MoneyFormatter.formatMoney(stack.unobligated)}`;

                    const unobligatedBar = (<StackedBarItem
                        key={`data-${unobligatedIdentifier}`}
                        identifier={unobligatedIdentifier}
                        color={this.props.legend[3].color}
                        height={unobligatedHeight}
                        width={itemWidth}
                        x={xPos}
                        y={unobligatedTop}
                        description={unobligatedDescription}
                        selectBar={this.selectBar}
                        deselectBar={this.deselectBar}
                        deregisterBar={this.deregisterBar}
                        ref={(component) => {
                            this.dataPoints[unobligatedIdentifier] = component;
                        }} />);
                    items.push(unobligatedBar);


                    // now add the outlay line
                    const outlayY = graphHeight - yScale(stack.outlay);
                    const outlayIdentifier = `outlay-${groupIndex}-${stackIndex}`;
                    const outlayDescription = `Outlay in ${xData}: \
${MoneyFormatter.formatMoney(stack.outlay)}`;

                    const outlay = (<OutlayItem
                        key={`data-${outlayIdentifier}`}
                        color={this.props.legend[0].color}
                        description={outlayDescription}
                        width={itemWidth}
                        x={xPos}
                        y={outlayY} />);
                    items.push(outlay);
                });
            }
            else {
                // Does not have filtered obligated
                yData.forEach((stack, stackIndex) => {
                    // within each X axis grouping of Y data elements is yet another group of Y data values
                    // but these are stacked on top of each other

                    // the X position is the group's starting X positioning plus the previous group
                    // bar widths
                    const xPos = startingXPos + (stackIndex * itemWidth);

                    // parse the balances
                    // first build the obligated bar
                    // since SVG y=0 is the top of the graph, we need to yScale position from the height
                    // to get the actual position (essentially we're drawing this upside down)
                    let obligatedTop = graphHeight - yScale(stack.obligated);
                    let obligatedHeight = yScale(stack.obligated) - yScale(0);
                    if (stack.obligated < 0) {
                        // if the value is negative, however, the top of the bar is actually the X axis
                        obligatedTop = graphHeight - yScale(0);
                        obligatedHeight = yScale(0) - yScale(stack.obligated);
                    }

                    const obligatedIdentifier = `obligated-${groupIndex}-${stackIndex}`;
                    const obligatedDescription = `Obligated balance in \
${xData}: ${MoneyFormatter.formatMoney(stack.obligated)}`;

                    const obligatedBar = (<StackedBarItem
                        key={`data-${obligatedIdentifier}`}
                        identifier={obligatedIdentifier}
                        color={this.props.legend[1].color}
                        height={obligatedHeight}
                        width={itemWidth}
                        x={xPos}
                        y={obligatedTop}
                        description={obligatedDescription}
                        selectBar={this.selectBar}
                        deselectBar={this.deselectBar}
                        deregisterBar={this.deregisterBar}
                        ref={(component) => {
                            this.dataPoints[obligatedIdentifier] = component;
                        }} />);
                    items.push(obligatedBar);

                    // stack the unobligated value on top
                    let unobligatedTop = graphHeight - yScale(stack.budgetAuthority);
                    let unobligatedHeight = yScale(stack.unobligated);
                    if (stack.unobligated < 0) {
                        // if the value is negative, however, the top of the bar is actually the X axis
                        unobligatedTop = graphHeight - yScale(0);
                        unobligatedHeight = yScale(0) - yScale(stack.unobligated);
                    }
                    const unobligatedIdentifier = `unobligated-${groupIndex}-${stackIndex}`;
                    const unobligatedDescription = `Unobligated balance in ${xData}: \
${MoneyFormatter.formatMoney(stack.unobligated)}`;

                    const unobligatedBar = (<StackedBarItem
                        key={`data-${unobligatedIdentifier}`}
                        identifier={unobligatedIdentifier}
                        color={this.props.legend[2].color}
                        height={unobligatedHeight}
                        width={itemWidth}
                        x={xPos}
                        y={unobligatedTop}
                        description={unobligatedDescription}
                        selectBar={this.selectBar}
                        deselectBar={this.deselectBar}
                        deregisterBar={this.deregisterBar}
                        ref={(component) => {
                            this.dataPoints[unobligatedIdentifier] = component;
                        }} />);
                    items.push(unobligatedBar);
                    // now add the outlay line
                    const outlayY = graphHeight - yScale(stack.outlay);
                    const outlayIdentifier = `outlay-${groupIndex}-${stackIndex}`;
                    const outlayDescription = `Outlay in ${xData}: \
${MoneyFormatter.formatMoney(stack.outlay)}`;
                    const outlay = (<OutlayItem
                        key={`data-${outlayIdentifier}`}
                        color={this.props.legend[0].color}
                        description={outlayDescription}
                        width={itemWidth}
                        x={xPos}
                        y={outlayY} />);
                    items.push(outlay);
                });
            }
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
            yAverage: _.mean(allY),
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
            _.forEach(this.dataPoints, (value) => {
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
            _.forEach(this.dataPoints, (value) => {
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
        const subIndex = barIdentifier.split('-')[1];
        const groupLabel = this.props.groups[groupIndex];
        const xValue = this.props.xSeries[groupIndex][subIndex];
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

        // determine where the bar starting position is
        // this is the group's starting X position plus 20px padding between groups
        // plus the number of previous group members times the width of each group member
        const groupWidth = this.state.xScale.bandwidth() - 40;
        const itemWidth = groupWidth / this.props.xSeries[groupIndex].length;
        let barXAnchor = this.state.xScale(groupLabel) + 20 + (subIndex * itemWidth);
        // now adjust the anchor so it is halfway through the bar
        barXAnchor += (itemWidth / 2);
        // now place the tooltip halfway in the bar's width
        const xPos = chartLeft + barXAnchor + this.props.padding.left;

        // calculate the percentage of the total
        const rawPercent = (yValue / _.sum(this.state.yValues));

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
            xValue,
            yValue,
            percentage,
            group: groupLabel
        }, xPos, yPos);
    }

    render() {
        // add 20px to the top of the chart to avoid cutting off label text
        // wrap the chart contents in a group and transform it down 20px to avoid impacting
        // positioning calculations
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
                            scale={this.state.xScale}
                            axisPos={this.state.xAxisPos} />

                        <g
                            className="bar-data"
                            transform={`translate(${this.props.padding.left},0)`}>
                            {this.state.items}
                        </g>

                        <g
                            className="legend-container"
                            transform={`translate(${this.props.padding.left},
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
