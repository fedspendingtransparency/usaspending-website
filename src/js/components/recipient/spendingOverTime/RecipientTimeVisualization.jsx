/**
 * RecipientTimeVisualization.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TimeTooltip from 'components/state/spendingovertime/StateTimeVisualizationTooltip';
import ChartLoadingMessage from 'components/search/visualizations/ChartLoadingMessage';
import ChartNoResults from 'components/search/visualizations/ChartNoResults';
import ChartError from 'components/search/visualizations/ChartError';
import BarChartTrendline from './chart/BarChartTrendline';
import PointTooltip from './PointTooltip';

const defaultProps = {
    groups: [],
    xSeries: [],
    ySeries: [],
    zSeries: [],
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
 * zSeries - an array of values with trendline data for each group
 */
/* eslint-disable react/no-unused-prop-types */
// allow unused prop types. they are passed to child components, but documented here
const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
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
        const legend = [
            {
                color: '#141D3B',
                stroke: '#141D3B',
                label: 'All Transactions',
                offset: 0
            },
            {
                color: '#FFFFFF',
                stroke: '#F5A623',
                label: 'Count of New Awards',
                offset: 120
            }
        ];

        let tooltip = null;
        if (this.state.tooltipData && window.innerWidth > 720) {
            if (this.state.tooltipData.type === 'bar') {
                tooltip = (
                    <TimeTooltip
                        barWidth={this.state.barWidth}
                        data={this.state.tooltipData}
                        x={this.state.tooltipX}
                        y={this.state.tooltipY}
                        chartWidth={this.props.width} />
                );
            }
            else if (this.state.tooltipData.type === 'point') {
                tooltip = (
                    <PointTooltip
                        barWidth={this.state.barWidth}
                        data={this.state.tooltipData}
                        x={this.state.tooltipX}
                        y={this.state.tooltipY}
                        chartWidth={this.props.width} />
                );
            }
        }

        return (
            <div className="recipient-visualization__time-wrapper">
                <TransitionGroup>
                    <CSSTransition
                        classNames="visualization-content-fade"
                        timeout={{ exit: 225, enter: 195 }}
                        exit>
                        <>
                            {this.props.data.groups.length > 0 && !this.props.loading && !this.props.error && (
                                <BarChartTrendline
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
                                    activeLabel={this.state.tooltipData} />
                            )}
                            {this.props.data.groups.length === 0 && !this.props.loading && !this.props.error && <ChartNoResults />}
                            {this.props.error && <ChartError />}
                            {this.props.loading && <ChartLoadingMessage />}
                        </>
                    </CSSTransition>
                </TransitionGroup>
                {tooltip}
            </div>
        );
    }
}

RecipientTimeVisualization.propTypes = propTypes;
RecipientTimeVisualization.defaultProps = defaultProps;
