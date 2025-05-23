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
import CustomShape from "./chartCustomizations/CustomShape";
import CustomXTick from "./chartCustomizations/CustomXTick";
import CustomYTick from "./chartCustomizations/CustomYTick";
import CustomTooltip from "./chartCustomizations/CustomTooltip";
import CustomLegend from "./chartCustomizations/CustomLegend";

const stateTimeVisualizationChartPropTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    outlayToggle: PropTypes.bool
};

const StateTimeVisualizationChart = (props) => {
    const { data, loading } = props;
    const [focusBar, setFocusBar] = useState(null);
    const transformedData = [];

    let label;
    let value;
    // sort years
    data.xSeries.sort();
    for (let i = 0; i < data?.xSeries?.length; i++) {
        if (data?.ySeries[i][0] !== 0) {
            label = data?.xSeries[i][0];
            if (!props.outlayToggle) {
                value = data?.ySeries[i][0];
            } else {
                value = data?.ySeriesOutlay[i][0];
            }
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

    const onMouseMove = () => {
        setFocusBar(true);
    };

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
                        content={<CustomTooltip outlayToggle={props.outlayToggle} />}
                        isAnimationActive={false}
                        onMouseLeave={onMouseLeave} />
                    <Legend
                        align="left"
                        content={<CustomLegend barColor={!props.outlayToggle ? "#0081a1" : "#008480"} label={!props.outlayToggle ? "Obligations" : "Outlays"} />}
                        wrapperStyle={{ left: 60, bottom: 0 }} />
                    <ReferenceLine y={0} stroke="#dfe1e2" />
                    <Bar
                        dataKey="value"
                        shape={<CustomShape focusBar={focusBar} barColor={!props.outlayToggle ? "#0081a1" : "#008480"} />}
                        activeBar={<CustomShape isActive focusBar={focusBar} barColor={!props.outlayToggle ? "#0081a1" : "#008480"} />}
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

StateTimeVisualizationChart.propTypes = stateTimeVisualizationChartPropTypes;
export default StateTimeVisualizationChart;
