/**
 * RecipientTimeVisualization.jsx
 * Created by Lizzie Salita 7/6/18
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transitioning';

import BarChartTrendline from './chart/BarChartTrendline';
import PointTooltip from './PointTooltip';
import ChartNoResults from "../../sharedComponents/ChartNoResults";
import ChartError from "../../sharedComponents/ChartError";
import ChartLoadingMessage from "../../sharedComponents/ChartLoadingMessage";
import TimeTooltip from './TimeTooltip';

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

/**
 * groups - an array of X-axis labels. Each group can have multiple bars/data points
 * that are grouped together
 *
 * xSeries - an array of tooltip strings that describe individual data points within each group
 *
 * ySeries - an array of values that describe the Y-axis values for each data point in the group
 *
 * zSeries - an array of values with trendLine data for each group
 */

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    visualizationPeriod: PropTypes.string
};

const RecipientTimeVisualization = ({
    width = 0,
    height = 280,
    data = {
        groups: [],
        xSeries: [],
        ySeries: [],
        zSeries: [],
        rawLabels: []
    },
    loading,
    error,
    visualizationPeriod
}) => {
    const [tooltipData, setTooltipData] = useState(data);
    const [tooltipX, setTooltipX] = useState(0);
    const [tooltipY, setTooltipY] = useState(0);
    const [barWidth, setBarWidth] = useState(0);

    let tooltip = null;

    if (tooltipData && window.innerWidth > 720) {
        if (tooltipData.type === 'bar') {
            tooltip = (
                <TimeTooltip
                    barWidth={barWidth}
                    data={tooltipData}
                    x={tooltipX}
                    y={tooltipY}
                    chartWidth={width} />
            );
        }
        else if (tooltipData.type === 'point') {
            tooltip = (
                <PointTooltip
                    barWidth={barWidth}
                    data={tooltipData}
                    x={tooltipX}
                    y={tooltipY}
                    chartWidth={width} />
            );
        }
    }

    const showTooltipFunc = (ttData, ttX, ttY, ttWidth) => {
        setTooltipData(ttData);
        setTooltipX(ttX);
        setTooltipY(ttY);
        setBarWidth(ttWidth);
    };

    return (
        <div className="recipient-visualization__time-wrapper">
            <TransitionGroup>
                <CSSTransition
                    classNames="visualization-content-fade"
                    timeout={{ exit: 225, enter: 195 }}
                    exit>
                    <div>
                        {data.groups.length > 0 && !loading && !error && (
                            <BarChartTrendline
                                height={height}
                                width={width}
                                ySeries={data.ySeries}
                                xSeries={data.xSeries}
                                zSeries={data.zSeries}
                                groups={data.groups}
                                rawLabels={data.rawLabels}
                                legend={legend}
                                showTooltip={showTooltipFunc}
                                visualizationPeriod={visualizationPeriod}
                                activeLabel={tooltipData} />
                        )}
                        {data.groups.length === 0 && !loading && !error && <ChartNoResults />}
                        {error && <ChartError />}
                        {loading && <ChartLoadingMessage />}
                    </div>
                </CSSTransition>
            </TransitionGroup>
            {tooltip}
        </div>
    );
};

RecipientTimeVisualization.propTypes = propTypes;
export default RecipientTimeVisualization;
