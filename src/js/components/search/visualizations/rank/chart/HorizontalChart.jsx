/**
 * HorizontalChart.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';

import HorizontalXAxis from './HorizontalXAxis';
import HorizontalYAxis from './HorizontalYAxis';
import ChartGroup from './ChartGroup';
import ChartBar from './ChartBar';

const propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    dataSeries: React.PropTypes.array,
    labelSeries: React.PropTypes.array,
    labelWidth: React.PropTypes.number,
    padding: React.PropTypes.object,
    itemHeight: React.PropTypes.number,
    startIndex: React.PropTypes.number
};

const defaultProps = {
    padding: {
        bottom: 30
    },
    itemHeight: 60,
    startIndex: 0
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
        this.generateChart();
    }

    componentWillReceiveProps() {
        this.generateChart();
    }

    generateChart() {
        // generate the X-axis ranges
        const dataRange = [];
        if (this.props.dataSeries.length > 1) {
            let minValue = _.min(this.props.dataSeries);
            let maxValue = _.max(this.props.dataSeries);

            if (minValue > 0) {
                minValue = 0;
            }

            if (maxValue < 0) {
                maxValue = 0;
            }

            dataRange.push(minValue);
            dataRange.push(maxValue);
        }
        else if (this.props.dataSeries.length === 1) {
            // when there is only one item, we need to manually set either the min or the max
            let min = 0;
            let max = 10000;

            const dataPoint = this.props.dataSeries[0];
            if (dataPoint <= 0) {
                // a negative or zero value means we will use the data point as the min and 0 as
                // the max
                min = dataPoint;
            }
            else {
                // a positive value means we will use the data point as the max and 0 as the min
                max = dataPoint;
            }

            dataRange.push(min);
            dataRange.push(max);
        }
        else {
            // when there are no items, use an arbitrary default range
            dataRange.push(0);
            dataRange.push(10000);
        }

        // generate the X axis as a linear scale
        const maxDataWidth = this.props.width - this.props.labelWidth;
        const xScale = scaleLinear().domain(dataRange).range([0, maxDataWidth]).nice();

        // process the actual data points
        const groups = [];
        const bars = [];
        this.props.labelSeries.forEach((dataLabel, index) => {
            const dataValue = this.props.dataSeries[index];

            // generate the left-side label group and striped background
            const group = (<ChartGroup
                key={`group-${dataValue}-${dataLabel}-${index}`}
                label={dataLabel}
                index={index}
                height={this.props.itemHeight}
                width={this.props.width}
                labelWidth={this.props.labelWidth}
                padding={this.props.padding} />);
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
                labelWidth={this.props.labelWidth}
                height={this.props.itemHeight}
                start={start}
                width={barWidth}
                maxWidth={this.props.width - this.props.labelWidth}
                label={dataLabel}
                value={dataValue}
                selectItem={this.props.selectItem}
                deselectItem={this.props.deselectItem} />);
            bars.push(bar);
        });

        if (this.props.labelSeries.length < 5) {
            // when a lot of filters are applied or we're at the end of the list
            const remainingSlots = 5 - this.props.labelSeries.length;
            for (let i = 0; i < remainingSlots; i++) {
                const emptyGroup = (<ChartGroup
                    key={`group-empty-${i}`}
                    label=""
                    index={i + this.props.labelSeries.length}
                    height={this.props.itemHeight}
                    width={this.props.width}
                    labelWidth={this.props.labelWidth}
                    padding={this.props.padding} />);
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
