import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TooltipComponent } from 'data-transparency-ui';

import PropTypes from "prop-types";


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
const CustomTick = (props) => {
    const {
        x, y, payload, link
    } = props;
    return (
        <g transform={`translate(${x},${y})`} width="40px">
            <a href={`${link[payload.index].link}`}>
                <text x={0} y={0} dy={0} textAnchor="end" fill="#666" fontSize={12} width="35px">
                    {payload.value}
                </text>
            </a>
        </g>);
};

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


const CustomShape = ({
    active, payload, index, x, y, width, height
}) => {
    if (index === 0) {
        console.log(index, active, payload);
        return (
            <svg xmlns="http://www.w3.org/2000/svg" x={x} y={y - 30} width={width} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.06699" y1="8.49805" x2="5.54067" y2="0.749398" stroke="#DFE1E2"/>
                <line x1="5.09335" y1="9.39258" x2="9.56704" y2="1.64393" stroke="#DFE1E2"/>
            </svg>);
    }
    return (
        <svg>
            <rect x={x} y={y} width={width} height={height} fill="#8884d8" />
        </svg>
    );
};

const TimeVisualizationChart = (props) => {
    // would be better to have an array of objects here
    const dataStuff = [];
    console.log(props);

    for (let i = 0; i < props.xSeries.length; i++) {
        dataStuff.push({
            label: props.xSeries[i][0],
            value: props.ySeries[i][0]
        });
    }

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return <>
        <p>hello world</p>
        {/* {chart3}*/}
        <BarChart
            width={500}
            height={300}
            data={dataStuff}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}>
            <XAxis dataKey="label" />
            <YAxis dataKey="value" />
            {/* <Tooltip cursor={{ fill: '#fff' }} content={<CustomTooltip />} />*/}
            <Legend />
            <Bar dataKey="value" activeBar={<Rectangle fill="#F4C251" />} shape={<CustomShape />} />
        </BarChart>
    </>;
};

export default TimeVisualizationChart;
