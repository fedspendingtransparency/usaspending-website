/**
 * SpendingByCategoriesChart.jsx
 * Created by Brian Petway 03/12/2024
 **/

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Text } from 'recharts';
import PropTypes from "prop-types";
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';
import Analytics from 'helpers/analytics/Analytics';
import { tabletScreen, smTabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";

const propTypes = {
    dataSeries: PropTypes.array,
    labelSeries: PropTypes.array,
    descriptions: PropTypes.array,
    linkSeries: PropTypes.array,
    hash: PropTypes.string
};

const tickFormatter = (value, isMobile) => {
    const limit = isMobile ? 34 : 36; // put your maximum character
    if (value.length < limit) return { text: value, isOneLine: (value === value.toUpperCase() ? value.length < 24 : value.length < 27) };
    const newValue = value.replace("Department", "Dept");
    if (newValue.length <= limit) return { text: newValue, isOneLine: false };
    return { text: `${newValue.substring(0, limit)}...`, isOneLine: false };
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

    const onClickHandler = (linkName) => {
        Analytics.event({
            category: `Section categories: ${props.scope}`,
            action: `Clicked ${linkName}`,
            label: props.hash
        });
    };

    const CustomTick = (args) => {
        const {
            x, y, payload, link
        } = args;
        const formattedText = tickFormatter(payload.value, isSmMobile);
        const translateY = () => {
            if (isMobile) {
                return y - 20;
            }
            if (formattedText.isOneLine) {
                return y + 4;
            }
            return y + 12;
        };
        return (
            <g transform={`translate(${x - 8},${translateY()})`}>
                {link[payload.index].link ?
                    <a href={`${link[payload.index].link}`} onClick={() => onClickHandler(payload.value)}>
                        <Text
                            textAnchor={isMobile ? "start" : "end"}
                            fontSize={14}
                            width={isMobile ? labelWidthVar : labelWidthVar + 16}
                            fill="#2378C3"
                            lineHeight={17.5}>
                            {formattedText.text}
                        </Text>
                    </a>
                    :
                    <Text
                        textAnchor={isMobile ? "start" : "end"}
                        fontSize={14}
                        width={isMobile ? labelWidthVar : labelWidthVar + 16}
                        fill="#5c5c5c"
                        lineHeight={17.5}>
                        {formattedText.text}
                    </Text>
                }

            </g>);
    };

    const CustomEndLabels = (args) => {
        const {
            x, y, value, width
        } = args;

        const translateX = isSmMobile ? 2 : 8;

        let anchorString = 'start';
        let negativeOffset = 0;

        // for negative values we want the label to be at the left end of the
        // bar, so we change the textAnchor value and add a small offset
        if (value[0] === '-') {
            anchorString = 'end';
            negativeOffset = -16;
        }

        return (
            <g transform={`translate(${x + width + translateX + negativeOffset}, ${y + 15})`}>
                <Text
                    textAnchor={anchorString}
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
                    <XAxis type="number" domain={[(dataMin) => (dataMin * 1.15), 'auto']} hide />
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
