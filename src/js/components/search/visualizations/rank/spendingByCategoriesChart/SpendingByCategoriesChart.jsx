/**
 * SpendingByCategoriesChart.jsx
 * Created by Brian Petway 03/12/2024
 **/

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';
import PropTypes from "prop-types";
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";

const propTypes = {
    dataSeries: PropTypes.array,
    labelSeries: PropTypes.array,
    descriptions: PropTypes.array,
    linkSeries: PropTypes.array
};

const customTickPropTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.object,
    link: PropTypes.array
};

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
        <g transform={`translate(${x},${y})`} >
            {/* <rect height={42}> */}
            <a href={`${link[payload.index].link}`} style={{ wordWrap: "break-word" }} >
                <text
                    x={0}
                    y={0}
                    dy={0}
                    textAnchor="end"
                    fontSize={14}
                    width="100"
                    fill="#2378C3">
                    {payload.value}
                </text>
            </a>
            {/* </rect> */}
        </g>);
};

const SpendingByCategoriesChart = (props) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);

    const labelWidthVar = isMobile ? 50 : 100;

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

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < tabletScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart
                    data={dataStuff}
                    layout="vertical"
                    barSize={21}
                    margin={{
                        top: 10,
                        right: 10,
                        left: labelWidthVar,
                        bottom: 10
                    }}>
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="label"
                        height={42}
                        width={labelWidthVar}
                        tickLine={false}
                        tick={<CustomTick link={dataStuff} />} />
                    <Bar dataKey="value" fill="#07648d" activeBar={false} >
                        <LabelList
                            dataKey="barLabel"
                            position="right"
                            fill="#07648d"
                            fontSize={14}
                            fontWeight={600} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

SpendingByCategoriesChart.propTypes = propTypes;
CustomTick.propTypes = customTickPropTypes;
export default SpendingByCategoriesChart;
