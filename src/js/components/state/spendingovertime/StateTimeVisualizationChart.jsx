/**
 * StateTimeVisualizationChart.jsx
 * Created by Keith Didier 09/23/2024
 **/

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    ReferenceLine,
    Tooltip,
    Legend
} from 'recharts';
import { LoadingMessage, NoResultsMessage } from "data-transparency-ui";
import { formatMoneyWithUnitsShortLabel } from "../../../helpers/moneyFormatter";
import BarChartLegend from "../../sharedComponents/timeChart/chart/BarChartLegend";

const CustomShapePropTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    focusBar: PropTypes.bool
};

const CustomShape = (props) => {
    const {
        x, y, width, height, focusBar
    } = props;

    const fill = "#0081a1"; // $cyan-50v
    let fillOpacity = "1";
    if (focusBar && !props?.isActive) {
        fillOpacity = "0.5";
    }

    const maxWidth = width > 120 ? 120 : width;
    const translateX = x + ((width / 2) - (maxWidth / 2));

    return (
        <rect
            x={translateX}
            y={height < 0 ? y - Math.abs(height) : y}
            width={maxWidth}
            height={Math.abs(height)}
            fill={fill}
            fillOpacity={fillOpacity}
            className="recharts-bars" />
    );
};

CustomShape.propTypes = CustomShapePropTypes;

const CustomXTickPropTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.object
};

const CustomXTick = (props) => {
    const {
        x, y, payload
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dx={12}
                dy={12}
                textAnchor="end"
                fill="#5C5C5C"
                fontSize={12}
                width="40px">
                {payload.value}
            </text>
        </g>);
};

CustomXTick.propTypes = CustomXTickPropTypes;

const CustomYTickPropTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.object
};

const CustomYTick = (props) => {
    const {
        x, y, payload
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} textAnchor="end" fill="#5C5C5C" fontSize={12} width="48px">
                {formatMoneyWithUnitsShortLabel(payload.value)}
            </text>
        </g>);
};

CustomYTick.propTypes = CustomYTickPropTypes;

const CustomTooltipPropTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string,
    onSetFocusBar: PropTypes.func,
    onMouseLeave: PropTypes.func
};

const CustomTooltip = (props) => {
    const {
        active,
        payload,
        label,
        onSetFocusBar,
        onMouseLeave
    } = props;

    if (active && payload && payload.length) {
        onSetFocusBar(label);
        return (
            <div className="custom-tooltip" role="status" aria-live="assertive">
                <div className="tooltip__title">
                    {label}
                </div>
                <div className="tooltip__text">
                    <div className="tooltip__text-label">Obligations</div>
                    <div className="tooltip__text-amount">
                        {formatMoneyWithUnitsShortLabel(payload[0].value)}
                    </div>
                </div>
            </div>);
    }

    onMouseLeave();
    return null;
};

CustomTooltip.propTypes = CustomTooltipPropTypes;

const StateTimeVisualizationChartPropTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool
};

const StateTimeVisualizationChart = (props) => {
    const { data, loading } = props;
    const [focusBar, setFocusBar] = useState(null);
    const transformedData = [];

    let label;
    let value;
    for (let i = 0; i < data?.xSeries?.length; i++) {
        if (data?.ySeries[i][0] !== 0) {
            label = data?.xSeries[i][0];
            value = data?.ySeries[i][0];
        }

        transformedData.push({
            label,
            value
        });
    }

    const onMouseLeave = () => {
        if (focusBar) {
            setFocusBar(null);
        }
    };

    const onMouseMove = (state) => {
        setFocusBar(state.label);
    };

    const barChartLegnedConfig = [
        {
            color: "#0081a1",
            label: 'Obligations',
            offset: 0
        }
    ];

    const CustomLegend = () => (
        <svg className="bar-graph" height={20}>
            <g className="legend-container">
                <BarChartLegend legend={barChartLegnedConfig} />
            </g>
        </svg>

    );

    const renderChart = () => {
        if (loading) {
            return <LoadingMessage />;
        }
        else if (transformedData.length === 0) {
            return <NoResultsMessage />;
        }

        return (
            <ResponsiveContainer>
                <BarChart
                    height={350}
                    data={transformedData}
                    accessibilityLayer
                    margin={{
                        top: 5,
                        right: 30,
                        bottom: 5
                    }}>
                    <XAxis dataKey="label" tick={<CustomXTick />} />
                    <YAxis dataKey="value" tick={<CustomYTick />} tickLine={false} />
                    <Tooltip
                        cursor={{ fill: '#fff' }}
                        filterNull
                        content={<CustomTooltip />}
                        isAnimationActive={false}
                        onSetFocusBar={setFocusBar}
                        onMouseLeave={onMouseLeave} />
                    <Legend
                        align="left"
                        iconType="circle"
                        content={<CustomLegend />}
                        wrapperStyle={{ left: 60 }}
                        margin={{
                            top: 19, right: 50, bottom: 0, left: 8
                        }} />
                    <ReferenceLine y={0} stroke="#dfe1e2" />
                    <Bar
                        dataKey="value"
                        shape={<CustomShape focusBar={focusBar} />}
                        activeBar={<CustomShape isActive focusBar={focusBar} />}
                        onMouseEnter={onMouseMove}
                        onMouseOut={onMouseLeave}
                        onMouseLeave={onMouseLeave} />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div className="state-visualization__time-wrapper">
            {renderChart()}
        </div>
    );
};

StateTimeVisualizationChart.propTypes = StateTimeVisualizationChartPropTypes;
export default StateTimeVisualizationChart;
