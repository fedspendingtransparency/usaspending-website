/**
 * ActivityChart.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEqual, min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';

const propTypes = {
    awards: PropTypes.array,
    height: PropTypes.number,
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
            bars: []
        };
    }
    componentDidMount() {
        this.generateChart();
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.awards, prevProps.awards)) {
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
        console.log('xRange', xRange);
        console.log('yRange', yRange);
    }
    render() {
        return (
            <div className="activity-chart">
                Chart here
            </div>
        );
    }
}

ActivityChart.propTypes = propTypes;
