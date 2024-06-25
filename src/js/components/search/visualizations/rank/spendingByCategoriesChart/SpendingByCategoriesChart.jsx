/**
 * SpendingByCategoriesChart.jsx
 * Created by Brian Petway 03/12/2024
 **/

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Text } from 'recharts';
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';
import PropTypes from "prop-types";
import { tabletScreen, smTabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";

const propTypes = {
    dataSeries: PropTypes.array,
    labelSeries: PropTypes.array,
    descriptions: PropTypes.array,
    linkSeries: PropTypes.array
};

const tickFormatter = (value, isMobile) => {
    const limit = isMobile ? 30 : 48; // put your maximum character
    if (value.length < limit) return value;
    const newValue = value.replace("Department", "Dept");
    if (newValue.length <= limit) return newValue;
    return `${newValue.substring(0, limit)}...`;
};

const SpendingByCategoriesChart = (props) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [isSmMobile, setIsSmMobile] = useState(window.innerWidth < smTabletScreen);
    const labelWidthVar = isMobile ? 400 : 175;

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

        const translateY = isMobile ? y - 20 : y + 8;

        return (
            <g transform={`translate(${x - 8},${translateY})`}>
                {link[payload.index].link ?
                    <a href={`${link[payload.index].link}`}>
                        <Text
                            textAnchor={isMobile ? "start" : "end"}
                            fontSize={14}
                            width={isMobile ? labelWidthVar : labelWidthVar + 16}
                            fill="#2378C3">
                            {tickFormatter(payload.value, isSmMobile)}
                        </Text>
                    </a>
                    :
                    <Text
                        textAnchor={isMobile ? "start" : "end"}
                        fontSize={14}
                        width={isMobile ? labelWidthVar : labelWidthVar + 16}
                        color="#5c5c5c">
                        {tickFormatter(payload.value, isSmMobile)}
                    </Text>
                }

            </g>);
    };

    const CustomEndLabels = (args) => {
        const {
            x, y, value, width
        } = args;

        const translateX = isSmMobile ? 2 : 8;

        return (
            <g transform={`translate(${x + width + translateX}, ${y + 14})`}>
                <Text
                    textAnchor="left"
                    fontSize={14}
                    fontWeight={600}
                    fill="#07648D"
                    width={20}>
                    {value}
                </Text>
            </g>
        );
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < tabletScreen);
                setIsSmMobile(newWidth < smTabletScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <>
            <ResponsiveContainer width="100%" height={isMobile ? 650 : 600}>
                <BarChart
                    data={dataStuff}
                    layout="vertical"
                    barSize={21}
                    margin={{
                        top: 10,
                        right: 60,
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
                            content={CustomEndLabels} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

SpendingByCategoriesChart.propTypes = propTypes;
export default SpendingByCategoriesChart;
