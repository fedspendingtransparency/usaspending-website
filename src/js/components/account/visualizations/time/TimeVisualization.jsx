/**
 * TimeVisualization.jsx
 * Created by Kevin Li 3/21/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ChartMessage from 'components/sharedComponents/timeChart/TimeVisualizationChartMessage';
import BarChartStacked from './chart/BarChartStacked';
import TimeTooltip from './TimeTooltip';

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
    data: PropTypes.object,
    loading: PropTypes.bool,
    hasFilteredObligated: PropTypes.bool
};

const TimeVisualization = ({
    width = 0, height = 280, data, loading, hasFilteredObligated
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);

    let chart = (<ChartMessage message="No data to display" />);
    let legend = [];
    let tooltip = null;

    const showTooltipLocal = (localData) => {
        setShowTooltip(true);
        setTooltipData(localData);
    };

    const hideTooltip = () => {
        setShowTooltip(false);
    };

    const toggleTooltip = (localData) => {
        if (showTooltip) {
            hideTooltip();
        }
        else {
            showTooltipLocal(localData);
        }
    };

    if (hasFilteredObligated) {
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
                offset: 0,
                mobileOffset: 0
            },
            {
                color: '#5c7480',
                label: 'Obligations Incurred',
                offset: 84,
                mobileOffset: 24
            },
            {
                color: '#a0bac4',
                label: 'Unobligated Balance',
                offset: 220,
                mobileOffset: 48
            }
        ];
    }

    if (loading) {
        // API request is still pending
        chart = (<ChartMessage message="Loading data..." />);
    }
    else if (data.xSeries.length > 0) {
        // only mount the chart component if there is data to display
        chart = (<BarChartStacked
            width={width}
            height={height}
            data={data}
            legend={legend}
            showTooltip={showTooltipLocal}
            hideTooltip={hideTooltip}
            toggleTooltip={toggleTooltip} />);
    }

    if (showTooltip) {
        tooltip = (<TimeTooltip {...tooltipData} />);
    }

    return (
        <div className="results-visualization-time-container">
            {tooltip}
            {chart}
        </div>
    );
};

TimeVisualization.propTypes = propTypes;
export default TimeVisualization;
