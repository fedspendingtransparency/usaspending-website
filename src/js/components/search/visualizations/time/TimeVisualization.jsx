/**
 * TimeVisualization.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';

import BarChart from './chart/BarChart';
import Tooltip from './TimeVisualizationTooltip';
import ChartMessage from './TimeVisualizationChartMessage';

const defaultProps = {
    groups: [],
    xSeries: [],
    ySeries: [],
    width: 0,
    height: 280,
    legend: [
        {
            color: '#708893',
            label: 'Amount Obligated',
            offset: 0
        }
    ]
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
    ySeries: React.PropTypes.array,
    loading: React.PropTypes.bool
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

        let chart = (<ChartMessage message="No data to display" />);
        if (this.props.loading) {
            // API request is still pending
            chart = (<ChartMessage message="Loading data..." />);
        }
        else if (this.props.groups.length > 0) {
            // only mount the chart component if there is data to display
            chart = (<BarChart
                {...this.props}
                showTooltip={this.showTooltip} />);
        }

        return (
            <div className="results-visualization-time-container">
                {chart}
                {tooltip}
            </div>
        );
    }
}

TimeVisualization.propTypes = propTypes;
TimeVisualization.defaultProps = defaultProps;
