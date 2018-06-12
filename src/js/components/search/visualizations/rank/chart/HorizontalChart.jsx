/**
 * HorizontalChart.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';

import HorizontalXAxis from './HorizontalXAxis';
import HorizontalYAxis from './HorizontalYAxis';
import ChartGroup from './ChartGroup';
import ChartBar from './ChartBar';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dataSeries: PropTypes.array,
    labelSeries: PropTypes.array,
    linkSeries: PropTypes.array,
    descriptions: PropTypes.array,
    labelWidth: PropTypes.number,
    padding: PropTypes.object,
    itemHeight: PropTypes.number,
    disableTooltip: PropTypes.bool,
    selectItem: PropTypes.func,
    deselectItem: PropTypes.func,
    clickedGroup: PropTypes.func,
    urlRoot: PropTypes.string,
    minRows: PropTypes.number
};

const defaultProps = {
    linkSeries: [],
    padding: {
        bottom: 30
    },
    startIndex: 0,
    minRows: 5
};

export default class HorizontalChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xScale: null,
            yScale: null,
            xRange: [],
            groups: [],
            bars: []
        };
    }
    componentDidMount() {
        this.generateChart(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.generateChart(nextProps);
    }

    generateChart(props) {
        // generate the X-axis ranges
        const dataRange = [];
        if (props.dataSeries.length > 1) {
            let minValue = min(props.dataSeries);
            let maxValue = max(props.dataSeries);

            if (minValue > 0) {
                minValue = 0;
            }

            if (maxValue < 0) {
                maxValue = 0;
            }

            dataRange.push(minValue);
            dataRange.push(maxValue);
        }
        else if (props.dataSeries.length === 1) {
            // when there is only one item, we need to manually set either the min or the max
            let minValue = 0;
            let maxValue = 10000;

            const dataPoint = props.dataSeries[0];
            if (dataPoint <= 0) {
                // a negative or zero value means we will use the data point as the min and 0 as
                // the max
                minValue = dataPoint;
            }
            else {
                // a positive value means we will use the data point as the max and 0 as the min
                maxValue = dataPoint;
            }

            dataRange.push(minValue);
            dataRange.push(maxValue);
        }
        else {
            // when there are no items, use an arbitrary default range
            dataRange.push(0);
            dataRange.push(10000);
        }

        // generate the X axis as a linear scale
        const maxDataWidth = props.width - props.labelWidth;
        const xScale = scaleLinear().domain(dataRange).range([0, maxDataWidth]).nice();

        // process the actual data points
        const groups = [];
        const bars = [];
        props.labelSeries.forEach((dataLabel, index) => {
            const dataValue = props.dataSeries[index];
            let linkID = '';

            if (props.linkSeries.length > 0) {
                linkID = props.linkSeries[index];
            }

            // generate the left-side label group and striped background
            const group = (<ChartGroup
                key={`group-${dataValue}-${dataLabel}-${index}`}
                label={dataLabel}
                linkID={linkID}
                urlRoot={this.props.urlRoot}
                index={index}
                height={props.itemHeight}
                width={props.width}
                labelWidth={props.labelWidth}
                padding={props.padding}
                clickedGroup={props.clickedGroup} />);
            groups.push(group);

            // generate the right-side graph bar
            let start = xScale(0);
            let barWidth = xScale(dataValue) - start;
            if (dataValue < 0) {
                // negative value, end at 0 and start at the data point
                start = xScale(dataValue);
                barWidth = xScale(0) - start;
            }

            if (barWidth < 0) {
                barWidth = 0;
            }

            const bar = (<ChartBar
                key={`bar-${dataValue}-${dataLabel}-${index}`}
                index={index}
                labelWidth={props.labelWidth}
                height={props.itemHeight}
                start={start}
                width={barWidth}
                maxWidth={props.width - props.labelWidth}
                label={dataLabel}
                value={dataValue}
                description={props.descriptions[index]}
                selectItem={props.selectItem}
                deselectItem={props.deselectItem}
                disableTooltip={props.disableTooltip} />);
            bars.push(bar);
        });

        if (props.labelSeries.length < 5) {
            // when a lot of filters are applied or we're at the end of the list
            const remainingSlots = this.props.minRows - props.labelSeries.length;
            for (let i = 0; i < remainingSlots; i++) {
                const emptyGroup = (<ChartGroup
                    key={`group-empty-${i}`}
                    label=""
                    index={i + props.labelSeries.length}
                    height={props.itemHeight}
                    width={props.width}
                    labelWidth={props.labelWidth}
                    padding={props.padding} />);
                groups.push(emptyGroup);
            }
        }

        this.setState({
            xScale,
            groups,
            bars,
            xRange: dataRange
        });
    }

    render() {
        return (
            <div
                ref={(div) => {
                    this.divRef = div;
                }}>
                <svg
                    className="rank-graph"
                    width={this.props.width}
                    height={this.props.height}
                    ref={(svg) => {
                        this.svgRef = svg;
                    }}>

                    <g className="chart-groups">
                        {this.state.groups}
                    </g>

                    <HorizontalXAxis
                        width={this.props.width - this.props.labelWidth}
                        height={this.props.height - this.props.padding.bottom}
                        x={this.props.labelWidth}
                        y={this.props.height - this.props.padding.bottom}
                        range={this.state.xRange}
                        xScale={this.state.xScale}
                        data={this.props.dataSeries} />

                    <g className="chart-bars">
                        {this.state.bars}
                    </g>

                    <HorizontalYAxis
                        height={this.props.height - this.props.padding.bottom}
                        x={this.props.labelWidth}
                        y={this.props.height - this.props.padding.bottom}
                        xScale={this.state.xScale} />

                </svg>
            </div>
        );
    }
}

HorizontalChart.propTypes = propTypes;
HorizontalChart.defaultProps = defaultProps;
