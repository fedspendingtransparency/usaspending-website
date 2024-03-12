import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { formatMoneyWithUnitsShortLabel } from "../../../../helpers/moneyFormatter";

// TODO - Add tooltips before this feature is released
// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//         return (
//             <div className="award-summary-tooltip" style={{ border: "1px solid black" }}>
//                 <h1 className="tooltip__title">{label}</h1>
//                 <div className="tooltip__text">
//                     <div className="custom-tooltip">
//                         <p className="label">{`${payload[0].value}`}</p>
//                     </div>
//                 </div>
//             </div>
//
//
//         );
//     }
//
//     return null;
// };

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

const CustomShape = ({
    payload, x, y, width, height
}) => {
    if (payload.value === 'jump') {
        return (
            <g>
                <line x1={x + (width / 2)} x2={x + (width / 2) + 1} y1="466" y2="0" stroke="#dfe1e2" strokeDasharray="5 3" />
            </g>
        )
    }
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} fill="#07648D" />
        </g>
    );
};

const CustomXTick = (props) => {
    const {
        x, y, payload, width
    } = props;

    if (payload.value === "jump") {
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
    const transformedData = [];

    let label;
    let value;
    for (let i = 0; i < props.xSeries.length; i++) {
        if (props.ySeries[i][0] !== 0) {
            label = props.xSeries[i][0];
            value = props.ySeries[i][0];
        }
        else if (transformedData[transformedData?.length - 1]?.value !== "jump") {
            label = "jump";
            value = "jump";
        }

        if (!(transformedData[transformedData?.length - 1]?.value === "jump" && label === "jump")) {
            transformedData.push({
                label,
                value
            });
        }
    }

    if (transformedData[transformedData?.length - 1]?.value === "jump") {
        transformedData.pop();
    }

    return (
        <div className="recharts-time-visualization-container">
            <ResponsiveContainer>
                <BarChart
                    data={transformedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}>
                    <XAxis dataKey="label" tick={<CustomXTick />} />
                    <YAxis dataKey="value" tick={<CustomYTick />} tickLine={false} />
                    {/* TODO - Add tooltips before this feature is released */}
                    {/* <Tooltip cursor={{ fill: '#fff' }} content={<CustomTooltip />} />*/}
                    <Bar dataKey="value" shape={<CustomShape />} />
                </BarChart>
            </ResponsiveContainer>
        </div>);
};

export default TimeVisualizationChart;
