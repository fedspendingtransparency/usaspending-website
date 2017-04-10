/**
 * TimeVisualization.jsx
 * Created by Kevin Li 3/21/17
 */

import React from 'react';

import ChartMessage from 'components/search/visualizations/time/TimeVisualizationChartMessage';
import BarChartStacked from './chart/BarChartStacked';

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
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    groups: React.PropTypes.array,
    xSeries: React.PropTypes.array,
    ySeries: React.PropTypes.array,
    loading: React.PropTypes.bool,
    hasFilteredObligated: React.PropTypes.bool
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

    showTooltip() {
        // this.setState({
        //     tooltipData: data,
        //     tooltipX: x,
        //     tooltipY: y
        // });
    }

    render() {
        let chart = (<ChartMessage message="No data to display" />);
        let legend = [];

        if (this.props.hasFilteredObligated) {
            legend = [
                {
                    color: '#fba302',
                    label: 'Outlay',
                    offset: 0
                },
                {
                    color: '#2c4452',
                    label: 'Obligated Balance (Filtered)',
                    offset: 84
                },
                {
                    color: '#5c7480',
                    label: 'Obligated Balance (Other)',
                    offset: 262
                },
                {
                    color: '#a0bac4',
                    label: 'Unobligated Balance',
                    offset: 450
                }
            ];
        }
        else {
            legend = [
                {
                    color: '#fba302',
                    label: 'Outlay',
                    offset: 0
                },
                {
                    color: '#5c7480',
                    label: 'Obligated Balance',
                    offset: 84
                },
                {
                    color: '#a0bac4',
                    label: 'Unobligated Balance',
                    offset: 220
                }
            ];
        }


        if (this.props.loading) {
            // API request is still pending
            chart = (<ChartMessage message="Loading data..." />);
        }
        else if (this.props.groups.length > 0) {
            // only mount the chart component if there is data to display
            chart = (<BarChartStacked
                {...this.props}
                legend={legend}
                enableHighlight={false}
                showTooltip={this.showTooltip}
                hasFilteredObligated={this.props.hasFilteredObligated} />);
        }

        return (
            <div className="results-visualization-time-container">
                {chart}
            </div>
        );
    }
}

TimeVisualization.propTypes = propTypes;
TimeVisualization.defaultProps = defaultProps;
