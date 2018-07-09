/**
 * RecipientTimeVisualization.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import ChartMessage from 'components/search/visualizations/time/TimeVisualizationChartMessage';
import TimeTooltip from 'components/state/spendingovertime/StateTimeVisualizationTooltip';
import BarChartTrendline from './chart/BarChartTrendline';

const defaultProps = {
    groups: [],
    xSeries: [],
    ySeries: [],
    width: 0,
    height: 280
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
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
    loading: PropTypes.bool,
    visualizationPeriod: PropTypes.string
};
/* eslint-enable react/no-unused-prop-types */

export default class RecipientTimeVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            tooltipData: null,
            tooltipX: 0,
            tooltipY: 0,
            barWidth: 0
        };

        this.showTooltip = this.showTooltip.bind(this);
    }

    showTooltip(data, x, y, width) {
        this.setState({
            tooltipData: data,
            tooltipX: x,
            tooltipY: y,
            barWidth: width
        });
    }

    render() {
        let chart = (<ChartMessage message="No data to display" />);

        const legend = [
            {
                color: '#141D3B',
                label: 'All Transactions',
                offset: 0
            },
            {
                color: '#F5A623',
                label: 'Count of New Awards',
                offset: 200
            }
        ];

        if (this.props.loading) {
            // API request is still pending
            chart = (<ChartMessage message="Loading data..." />);
        }
        else if (this.props.data.groups.length > 0) {
            // only mount the chart component if there is data to display
            chart = (<BarChartTrendline
                height={this.props.height}
                width={this.props.width}
                ySeries={this.props.data.ySeries}
                xSeries={this.props.data.xSeries}
                zSeries={this.props.data.zSeries}
                groups={this.props.data.groups}
                rawLabels={this.props.data.rawLabels}
                legend={legend}
                showTooltip={this.showTooltip}
                visualizationPeriod={this.props.visualizationPeriod}
                activeLabel={this.state.tooltipData} />);
        }

        let tooltip = null;
        if (this.state.tooltipData && window.innerWidth > 720) {
            tooltip = (<TimeTooltip
                barWidth={this.state.barWidth}
                data={this.state.tooltipData}
                x={this.state.tooltipX}
                y={this.state.tooltipY}
                chartWidth={this.props.width} />);
        }

        return (
            <div className="recipient-visualization__time-wrapper">
                {tooltip}
                {chart}
            </div>
        );
    }
}

RecipientTimeVisualization.propTypes = propTypes;
RecipientTimeVisualization.defaultProps = defaultProps;
