/**
 * TimeVisualization.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';
import _ from 'lodash';

import BarChart from './chart/BarChart';

import Tooltip from './TimeVisualizationTooltip';

const defaultProps = {
    groups: [
        'FY 2013',
        'FY 2014',
        'FY 2015',
        'FY 2016'
    ],
    xSeries: [
        ['FY 2013'],
        ['FY 2014'],
        ['FY 2015'],
        ['FY 2016']
    ],
    ySeries: [
        [_.random(100, 999999999)],
        [_.random(-100, -199999999)],
        [_.random(-100, -29999999)],
        [_.random(100, -2999999999)]
        // [-1000000],
        // [-152000],
        // // [2000000],
        // [500000],
        // // [10000000]
        // [1500000]
    ],
    width: 0,
    height: 250
};

/**
 * groups - an array of X-axis labels. Each group can have multiple bars/data points
 * that are grouped together
 *
 * xSeries - an array of tooltip strings that describe individual data points within each group
 *
 * ySeries - an array of values that describe the Y-axis values for each data point in the group
 *
 */
 /* eslint-disable react/no-unused-prop-types */
 // allow unused prop types. they are passed to child components, but documented here
const propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    groups: React.PropTypes.array,
    xSeries: React.PropTypes.array,
    ySeries: React.PropTypes.array
};
/* eslint-enable react/no-unused-prop-types */

export default class TimeVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipData: null,
            tooltipX: 0,
            tooltipY: 0
        };

        this.showTooltip = this.showTooltip.bind(this);
    }

    showTooltip(data, x, y) {
        this.setState({
            tooltipData: data,
            tooltipX: x,
            tooltipY: y
        });
    }

    render() {
        let tooltip = null;
        if (this.state.tooltipData) {
            tooltip = (<Tooltip
                data={this.state.tooltipData}
                x={this.state.tooltipX}
                y={this.state.tooltipY} />);
        }

        return (
            <div className="results-visualization-time-container">
                <BarChart
                    {...this.props}
                    showTooltip={this.showTooltip} />
                {tooltip}
            </div>
        );
    }
}

TimeVisualization.propTypes = propTypes;
TimeVisualization.defaultProps = defaultProps;
