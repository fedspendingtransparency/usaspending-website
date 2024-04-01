/**
 * SpendingByCategoriesChart.jsx
 * Created by Brian Petway 03/12/2024
 **/

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Text } from 'recharts';
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

const tickFormatter = (value, isMobile) => {
    const limit = isMobile ? 35 : 48; // put your maximum character
    if (value.length < limit) return value;
    const newValue = value.replace("Department", "Dept");
    if (newValue.length <= limit) return newValue;
    return `${newValue.substring(0, limit)}...`;
};

const SpendingByCategoriesChart = (props) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);

    const labelWidthVar = isMobile ? 300 : 175;

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

    const CustomTick = (args) => {
        const {
            x, y, payload, link
        } = args;

        const translateY = isMobile ? y - 16 : y + 8;

        return (
            <g transform={`translate(${x - 8},${translateY})`}>
                <a href={`${link[payload.index].link}`}>
                    <Text
                        textAnchor={isMobile ? "start" : "end"}
                        fontSize={14}
                        width={isMobile ? labelWidthVar : labelWidthVar + 16}
                        fill="#2378C3">
                        {tickFormatter(payload.value, isMobile)}
                    </Text>
                </a>
            </g>);
    };

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
                        right: 20,
                        left: 8,
                        bottom: 10
                    }}>
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="label"
                        stroke="#dfe1e2"
                        mirror={isMobile}
                        width={labelWidthVar}
                        tickLine={false}
                        tick={<CustomTick link={dataStuff} />} />
                    <Bar dataKey="value" fill="#07648d" activeBar={false}>
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
export default SpendingByCategoriesChart;
