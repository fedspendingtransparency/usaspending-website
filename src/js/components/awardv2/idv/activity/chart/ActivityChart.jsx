/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEqual, min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';

import ActivityChartBar from './ActivityChartBar';

const propTypes = {
    awards: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number,
    itemHeight: PropTypes.number,
    xSeries: PropTypes.array,
    ySeries: PropTypes.array
};

export default class ActivityChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xScale: null,
            yScale: null,
            xRange: [],
            yRange: [],
            bars: []
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
        let minValueY = 0;
        let maxValueY = this.props.awards[0]._awardedAmount;
        let minValueX = this.props.awards[0]._startDate.valueOf();
        let maxValueX = this.props.awards[0]._endDate.valueOf();
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

        const xScale = scaleLinear()
            .domain(xRange)
            .range([0, this.props.width])
            .nice();
        const yScale = scaleLinear()
            .domain(yRange)
            .range([0, this.props.height - 30])
            .nice();

        const bars = this.props.awards.map((bar, index) => {
            const start = xScale(bar._startDate.valueOf());
            const end = xScale(bar._endDate.valueOf());
            const width = end - start;
            const yPosition = (this.props.height - 30) - yScale(bar._awardedAmount);
            const description = `A ${bar.grandchild ? 'grandchild' : 'child'} award with a start date of ${bar.startDate}, an end date of ${bar.endDate}, an awarded amount of ${bar.awardedAmount}, and an obligated amount of ${bar.obligatedAmount}.`;
            return (
                <ActivityChartBar
                    key={`bar-${bar._awardedAmount}-${index}`}
                    index={index}
                    height={10}
                    start={start}
                    width={width}
                    yPosition={yPosition}
                    data={bar}
                    description={description} />
            );
        });

        this.setState({
            xRange,
            yRange,
            xScale,
            yScale,
            bars
        });
    }
    render() {
        return (
            <svg
                className="activity-chart"
                width={this.props.width}
                height={this.props.height}>
                <g>
                    {this.state.bars}
                </g>
            </svg>
        );
    }
}

ActivityChart.propTypes = propTypes;
