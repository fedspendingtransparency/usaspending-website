/**
 * TimeVisualization.jsx
 * Created by Kevin Li 12/16/16
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transitioning';

import BarChart from './chart/BarChart';
import Tooltip from './TimeVisualizationTooltip';
import ChartLoadingMessage from '../ChartLoadingMessage';
import ChartNoResults from '../ChartNoResults';
import ChartError from '../ChartError';

/**
 * groups - an array of X-axis labels. Each group can have multiple bars/data points
 * that are grouped together
 *
 * xSeries - an array of tooltip strings that describe individual data points within each group
 *
 * ySeries - an array of values that describe the Y-axis values for each data point in the group
 *
 */

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

const TimeVisualization = ({
    width = 0,
    height = 280,
    groups = [],
    xSeries = [],
    ySeries = [],
    loading,
    legend = [
        {
            color: '#708893',
            label: 'Amount Obligated',
            offset: 0
        }
    ],
    visualizationPeriod,
    error
}) => {
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipX, setTooltipX] = useState(0);
    const [tooltipY, setTooltipY] = useState(0);
    const [barWidth, setBarWidth] = useState(0);

    let tooltip = null;

    if (tooltipData && window.innerWidth > 720) {
        tooltip = (<Tooltip
            chartWidth={width}
            data={tooltipData}
            x={tooltipX}
            y={tooltipY}
            barWidth={barWidth} />);
    }

    const showTooltip = (data, x, y, newWidth) => {
        setTooltipData(data);
        setTooltipX(x);
        setTooltipY(y);
        setBarWidth(newWidth);
    };

    return (
        <div className="results-visualization-time-container">
            <TransitionGroup>
                <CSSTransition
                    classNames="visualization-content-fade"
                    timeout={{ exit: 225, enter: 195 }}
                    exit>
                    <>
                        {!loading && !error && groups.length === 0 && <ChartNoResults />}
                        {loading && <ChartLoadingMessage />}
                        {error && <ChartError />}
                        {!loading && !error && groups.length > 0 && (
                            <BarChart
                                width={width}
                                height={height}
                                xSeries={xSeries}
                                ySeries={ySeries}
                                legend={legend}
                                visualizationPeriod={visualizationPeriod}
                                showTooltip={showTooltip}
                                activeLabel={tooltipData} />
                        )}
                    </>
                </CSSTransition>
            </TransitionGroup>
            {tooltip}
        </div>
    );
};

TimeVisualization.propTypes = propTypes;
export default TimeVisualization;
