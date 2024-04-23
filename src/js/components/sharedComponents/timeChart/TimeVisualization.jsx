/**
 * TimeVisualization.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import BarChart from './chart/BarChart';
import Tooltip from './TimeVisualizationTooltip';
import ChartLoadingMessage from '../../search/visualizations/ChartLoadingMessage';
import ChartNoResults from '../../search/visualizations/ChartNoResults';
import ChartError from '../../search/visualizations/ChartError';

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
    width: PropTypes.number,
    height: PropTypes.number,
    groups: PropTypes.array,
    xSeries: PropTypes.array,
    ySeries: PropTypes.array,
    loading: PropTypes.bool,
    legend: PropTypes.array,
    visualizationPeriod: PropTypes.string,
    error: PropTypes.bool
};
/* eslint-enable react/no-unused-prop-types */

export default class TimeVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        let tooltip = null;
        if (this.state.tooltipData && window.innerWidth > 720) {
            tooltip = (<Tooltip
                chartWidth={this.props.width}
                data={this.state.tooltipData}
                x={this.state.tooltipX}
                y={this.state.tooltipY}
                barWidth={this.state.barWidth} />);
        }

        return (
            <div className="results-visualization-time-container">
                <TransitionGroup>
                    <CSSTransition
                        classNames="visualization-content-fade"
                        timeout={{ exit: 225, enter: 195 }}
                        exit>
                        <>
                            {!this.props.loading && !this.props.error && this.props.groups.length === 0 && <ChartNoResults />}
                            {this.props.loading && <ChartLoadingMessage />}
                            {this.props.error && <ChartError />}
                            {!this.props.loading && !this.props.error && this.props.groups.length > 0 && (
                                <BarChart
                                    {...this.props}
                                    showTooltip={this.showTooltip}
                                    activeLabel={this.state.tooltipData} />
                            )}
                        </>
                    </CSSTransition>
                </TransitionGroup>
                {tooltip}
            </div>
        );
    }
}

TimeVisualization.propTypes = propTypes;
TimeVisualization.defaultProps = defaultProps;
