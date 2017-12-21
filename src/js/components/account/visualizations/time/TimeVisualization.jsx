/**
 * TimeVisualization.jsx
 * Created by Kevin Li 3/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ChartMessage from 'components/search/visualizations/time/TimeVisualizationChartMessage';
import BarChartStacked from './chart/BarChartStacked';
import TimeTooltip from './TimeTooltip';

const defaultProps = {
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
    hasFilteredObligated: PropTypes.bool
};
/* eslint-enable react/no-unused-prop-types */

export default class TimeVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            tooltipData: null,
            tooltipX: 0,
            tooltipY: 0
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    showTooltip(data) {
        this.setState({
            showTooltip: true,
            tooltipData: data
        });
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    toggleTooltip(data) {
        if (this.state.showTooltip) {
            this.hideTooltip();
        }
        else {
            this.showTooltip(data);
        }
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
                    label: 'Obligations Incurred (Filtered)',
                    offset: 84
                },
                {
                    color: '#5c7480',
                    label: 'Obligations Incurred (Other)',
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
                    label: 'Obligations Incurred',
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
        else if (this.props.data.xSeries.length > 0) {
            // only mount the chart component if there is data to display
            chart = (<BarChartStacked
                width={this.props.width}
                height={this.props.height}
                data={this.props.data}
                legend={legend}
                showTooltip={this.showTooltip}
                hideTooltip={this.hideTooltip}
                toggleTooltip={this.toggleTooltip} />);
        }

        let tooltip = null;
        if (this.state.showTooltip) {
            tooltip = (<TimeTooltip
                {...this.state.tooltipData} />);
        }

        return (
            <div className="results-visualization-time-container">
                {tooltip}
                {chart}
            </div>
        );
    }
}

TimeVisualization.propTypes = propTypes;
TimeVisualization.defaultProps = defaultProps;
