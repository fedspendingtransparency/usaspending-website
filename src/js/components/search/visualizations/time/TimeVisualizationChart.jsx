import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import { TooltipComponent } from 'data-transparency-ui';

import PropTypes from "prop-types";
import { formatMoneyWithUnitsShortLabel } from "../../../../helpers/moneyFormatter";


// const propTypes = {
//     groups: PropTypes.array,
//     width: PropTypes.number,
//     height: PropTypes.number,
//     xSeries: PropTypes.array,
//     rawLabels: PropTypes.array,
//     ySeries: PropTypes.array,
//     showTooltip: PropTypes.func,
//     enableHighlight: PropTypes.bool,
//     padding: PropTypes.object,
//     legend: PropTypes.array,
//     activeLabel: PropTypes.object,
//     visualizationPeriod: PropTypes.string
// };

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="award-summary-tooltip" style={{ border: "1px solid black" }}>
                <h1 className="tooltip__title">{label}</h1>
                <div className="tooltip__text">
                    <div className="custom-tooltip">
                        <p className="label">{`${payload[0].value}`}</p>
                    </div>
                </div>
            </div>


        );
    }

    return null;
};

const timeJumpIcon = (x, y, width, padding, height) => {
    const translateY = height || y;
    return (
        <g transform={`translate(${x + padding / 2},${translateY - padding}) scale(2)`}>
            <line x1="1.06699" y1="8.49805" x2="5.54067" y2="0.749398" stroke="#DFE1E2" />
            <line x1="5.09335" y1="9.39258" x2="9.56704" y2="1.64393" stroke="#DFE1E2" />
        </g>
    );
};

const CustomShape = ({
    payload, x, y, width, height
}) => {
    if (payload.value === 'jump') {
        return timeJumpIcon(x, y, width, 30, height);
    }
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} fill="#07648D" />
        </g>
    );
};

const CustomXTick = (props) => {
    const {x, y, payload} = props;

    const width = 30;
    if (payload.value === "jump") {
        return timeJumpIcon(x - width / 2, y, width, 0);
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
        x, y, payload, index
    } = props;

    const width = 30;
    console.log("custom tick", x, y, payload, width, index);

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
    console.log(props);

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

    return (<div style={{ height: "500px" }}>
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
                <Bar dataKey="value" activeBar={<Rectangle fill="#F4C251" />} isAnimationActive={false} shape={<CustomShape />} />
            </BarChart>
        </ResponsiveContainer>
    </div>);
};

export default TimeVisualizationChart;
