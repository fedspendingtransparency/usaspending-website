/**
 * SpendingByCategoriesChart.jsx
 * Created by Brian Petway 03/12/2024
 **/

import React from 'react';
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Text } from 'recharts';

import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';
import CustomTick from "./CustomTick";
import useIsMobile from "../../../../hooks/useIsMobile";

const propTypes = {
    dataSeries: PropTypes.array,
    labelSeries: PropTypes.array,
    descriptions: PropTypes.array,
    linkSeries: PropTypes.array,
    hash: PropTypes.string,
    scope: PropTypes.string
};

const SpendingByCategoriesChart = ({
    dataSeries,
    labelSeries,
    descriptions,
    linkSeries,
    hash,
    scope
}) => {
    const { isTablet, isDesktopSm } = useIsMobile();
    const labelWidthVar = isTablet ? 400 : 175;

    const dataStuff = [];

    if (dataSeries?.length === labelSeries?.length) {
        for (let i = 0; i < dataSeries.length; i++) {
            const formattedValue = formatMoneyWithUnitsShortLabel(dataSeries[i], 2);
            dataStuff.push({
                value: dataSeries[i],
                label: labelSeries[i],
                desc: descriptions[i],
                link: linkSeries[i],
                barLabel: formattedValue
            });
        }
    }

    const CustomEndLabels = (args) => {
        const {
            x, y, value, width
        } = args;

        const translateX = isDesktopSm ? 2 : 8;

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

    return (
        <>
            <ResponsiveContainer width="100%" height={isTablet ? 650 : 600}>
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
                    <XAxis
                        type="number"
                        domain={[(dataMin) => (dataMin < 0 ? (dataMin * 1.15) : dataMin), 'auto']}
                        hide />
                    <YAxis
                        type="category"
                        dataKey="label"
                        stroke="#dfe1e2"
                        mirror={isTablet}
                        width={labelWidthVar}
                        tickLine={false}
                        tick={
                            <CustomTick
                                link={dataStuff}
                                isTablet={isTablet}
                                isDesktopSm={isDesktopSm}
                                scope={scope}
                                hash={hash} />
                        } />
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
