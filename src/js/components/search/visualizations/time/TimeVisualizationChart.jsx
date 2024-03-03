import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { formatMoneyWithUnitsShortLabel } from "../../../../helpers/moneyFormatter";

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
    return (
        <g transform={`translate(${translateX},${y})`}>
            <line x1="1.06699" y1="8.49805" x2="5.54067" y2="0.749398" stroke="#DFE1E2" />
            <line x1="5.09335" y1="9.39258" x2="9.56704" y2="1.64393" stroke="#DFE1E2" />
        </g>
    );
};

const CustomShape = ({
    payload, x, y, width, height
}) => {
    if (payload.value === 'jump') {
        const jumpHeight = 30;
        return (<rect x={x + (width / 4)} y={y - jumpHeight} width={width / 2} height={jumpHeight} fill="url(#diagonalHatch)" />);
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
            <text x={0} y={0} dx={12} dy={12} textAnchor="end" fill="#5C5C5C" fontSize={12} width="35px">
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
            <text x={0} y={0} dy={0} textAnchor="end" fill="#5C5C5C" fontSize={12} width="50px">
                {formatMoneyWithUnitsShortLabel(payload.value)}
            </text>
        </g>);
};


const TimeVisualizationChart = (props) => {
    // would be better to have an array of objects here
    const dataStuff = [];

    let label;
    let value;
    for (let i = 0; i < props.xSeries.length; i++) {
        if (props.ySeries[i][0] !== 0) {
            label = props.xSeries[i][0];
            value = props.ySeries[i][0];
        }
        else if (dataStuff[dataStuff.length - 1].value !== "jump") {
            label = "jump";
            value = "jump";
        }

        if (!(dataStuff[dataStuff.length - 1]?.value === "jump" && label === "jump")) {
            dataStuff.push({
                label,
                value
            });
        }
    }

    return (
        <div style={{ height: "500px" }}>
            <ResponsiveContainer>
                <BarChart
                    width="500px"
                    height="300px"
                    data={dataStuff}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}>
                    <XAxis dataKey="label" tick={<CustomXTick />} />
                    <YAxis dataKey="value" tick={<CustomYTick />} tickLine={false} />
                    {/* <Tooltip cursor={{ fill: '#fff' }} content={<CustomTooltip />} />*/}
                    <defs>
                        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: "#DFE1E2", strokeWidth: "1" }} />
                        </pattern>
                    </defs>
                    <Bar dataKey="value" isAnimationActive={false} shape={<CustomShape />} />
                </BarChart>
            </ResponsiveContainer>
        </div>);
};

export default TimeVisualizationChart;
