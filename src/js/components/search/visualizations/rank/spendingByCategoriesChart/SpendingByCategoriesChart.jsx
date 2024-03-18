import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const CustomTick = (props) => {
    const {
        x, y, payload, link
    } = props;
    return (
        // <g transform={`translate(${x},${y})`} >
        //     <a href={`${link[payload.index].link}`}>
        //         <text x={0} y={0} dy={0} textAnchor="end" fill="#666" fontSize={12} >
        //             {payload.value}
        //         </text>
        //     </a>
        // </g>);
        <g transform={`translate(${x},${y})`} style={{ height: "42px", wordWrap: "break-word" }} >
            <a href={`${link[payload.index].link}`} >
                <text
                    x={0}
                    y={0}
                    dy={0}
                    textAnchor="end"
                    fontSize={14}
                    fill="#2378C3">
                    {payload.value}
                </text>
            </a>
        </g>);
};

const SpendingByCategoriesChart = (props) => {
    const dataStuff = [];
    if (props.dataSeries?.length === props.labelSeries?.length) {
        for (let i = 0; i < props.dataSeries.length; i++) {
            const formattedValue = formatMoneyWithUnitsShortLabel(props.dataSeries[i], 2);
            dataStuff.push({
                value: props.dataSeries[i],
                label: props.labelSeries[i],
                desc: props.descriptions[i],
                link: props.linkSeries[i],
                barLabel: formattedValue
            });
        }
    }

    return (
        <div className="recharts-categories-visualization-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={dataStuff}
                    layout="vertical"
                    barSize={21}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 100,
                        bottom: 10
                    }}>
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="label"
                        height={42}
                        width={100}
                        tickLine={false}
                        tick={<CustomTick link={dataStuff} />} />
                    <Bar dataKey="value" fill="#07648d" activeBar={false} >
                        <LabelList dataKey="barLabel" position="right" fill="#07648d" fontSize={14} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingByCategoriesChart;

