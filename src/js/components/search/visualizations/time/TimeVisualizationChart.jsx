import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { LoadingMessage, NoResultsMessage, ErrorMessage } from "data-transparency-ui";
import { formatMoneyWithUnitsShortLabel } from "../../../../helpers/moneyFormatter";

const timeJumpIcon = (x, y) => {
    const translateX = x - 6;
    const translateY = y + 3;
    return (
        <g transform={`translate(${translateX},${translateY})`}>
            <line x1="1.06699" y1="8.49805" x2="5.54067" y2="0.749398" stroke="#5C5C5C" />
            <line x1="5.09335" y1="9.39258" x2="9.56704" y2="1.64393" stroke="#5C5C5C" />
        </g>
    );
};

const CustomShape = (props) => {
    const {
        x, y, width, height, focusBar, label
    } = props;

    const fill = "#1B2B85";
    let fillOpacity = "1";
    if (focusBar && !props?.isActive && label !== "jump") {
        fillOpacity = "0.5";
    }

    const maxWidth = width > 120 ? 120 : width;
    const translateX = x + ((width / 2) - (maxWidth / 2));
    const lineHeight = 315;

    if (label === 'jump') {
        return (
            <g>
                <line x1={x + (width / 2)} x2={x + (width / 2) + 1} y1={lineHeight} y2="6" stroke="#dfe1e2" strokeDasharray="5 3" />
            </g>
        );
    }
    return (
        <rect x={translateX} y={height < 0 ? y - Math.abs(height) : y} width={maxWidth} height={Math.abs(height)} fill={fill} fillOpacity={fillOpacity} className="recharts-bars" />
    );
};

const CustomXTick = (props) => {
    const {
        x, y, payload, width, label
    } = props;

    if (payload?.value === "jump" || label === "jump") {
        return timeJumpIcon(x, y, width);
    }
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dx={12} dy={12} textAnchor="end" fill="#5C5C5C" fontSize={12} width="40px">
                {payload.value}
            </text>
        </g>);
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


const TimeVisualizationChart = (props) => {
    const [focusBar, setFocusBar] = useState(null);
    const transformedData = [];

    let label;
    let value;
    for (let i = 0; i < props?.xSeries?.length; i++) {
        if (props?.ySeries[i][0] !== 0) {
            label = props?.xSeries[i][0];
            value = props?.ySeries[i][0];
        }
        else if (transformedData[transformedData?.length - 1]?.value !== "jump") {
            label = "jump";
            value = null;
        }

        if (!(transformedData[transformedData?.length - 1]?.value === null && label === "jump")) {
            transformedData.push({
                label,
                value
            });
        }
    }

    if (transformedData[transformedData?.length - 1]?.label === "jump") {
        transformedData.pop();
    }

    const onMouseLeave = () => {
        if (focusBar) {
            setFocusBar(null);
        }
    };

    const CustomTooltip = (args) => {
        // eslint-disable-next-line no-shadow
        const { active, payload, label } = args;

        if (active && payload && payload.length && payload[0].label !== "jump") {
            setFocusBar(label);
            return (
                <div className="custom-tooltip" role="status" aria-live="assertive">
                    <div className="tooltip__title">
                        {label}
                    </div>
                    <div className="tooltip__text">
                        <div className="tooltip__text-label">Obligations</div>
                        <div className="tooltip__text-amount">{formatMoneyWithUnitsShortLabel(payload[0].value)}</div>
                    </div>
                </div>);
        }

        onMouseLeave();
        return null;
    };
    const onMouseMove = (state) => {
        setFocusBar(state.label);
    };

    const Message = () => {
        if (props.loading) {
            return <LoadingMessage />;
        }
        else if (props.error) {
            return <ErrorMessage />;
        }
        else if (transformedData.length === 0) {
            return <NoResultsMessage />;
        }

        return <></>;
    };

    return (
        <div className="recharts-time-visualization-container">
            {props?.loading || props?.error || transformedData?.length === 0 ?
                <><Message /></>
                :
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
                        <Tooltip cursor={{ fill: '#fff' }} filterNull content={<CustomTooltip />} isAnimationActive={false} />
                        <ReferenceLine y={0} stroke="#dfe1e2" />
                        <Bar dataKey="value" shape={<CustomShape focusBar={focusBar} />} activeBar={<CustomShape isActive focusBar={focusBar} />} onMouseEnter={onMouseMove} onMouseOut={onMouseLeave} onMouseLeave={onMouseLeave} />
                    </BarChart>
                </ResponsiveContainer>}
        </div>);
};

export default TimeVisualizationChart;
