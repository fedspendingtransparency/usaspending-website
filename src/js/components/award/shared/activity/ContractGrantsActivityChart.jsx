import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { scaleLinear } from 'd3-scale';

import ActivityYAxis from 'components/award/idv/activity/chart/ActivityYAxis';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    visualizationWidth: PropTypes.number,
    transactions: PropTypes.array
};

const ContractGrantsActivityChart = ({
    height,
    width,
    visualizationWidth,
    transactions
}) => {
    // x series
    const [xSeries, setXseries] = useState([0, 0]);
    // y series
    const [ySeries, setYSeries] = useState([0, 0]);
    // x scale
    const [xScale, setXScale] = useState(null);
    // y scale
    const [yScale, setYScale] = useState(null);
    // x ticks
    const [xTicks, setXTicks] = useState([]);
    // y ticks
    const [yTicks, setYTicks] = useState([]);
    /**
     * createXSeries
     * - creates the x domain and updates state
     * @returns {null}
     */
    const createXSeries = useCallback(() => {
        const clonedTransactions = cloneDeep(transactions);
        clonedTransactions.sort((a, b) => a.action_date.valueOf() - b.action_date.valueOf());
        setXseries([clonedTransactions[0].action_date.valueOf(), clonedTransactions[clonedTransactions.length - 1].action_date.valueOf()]);
    }, [transactions]);
    /**
     * createYSeries
     * - creates the y domain and updates state
     * @returns {null}
     */
    const createYSeries = useCallback(() => {
        const clonedTransactions = cloneDeep(transactions);
        clonedTransactions.sort((a, b) => a.federal_action_obligation - b.federal_action_obligation);
        setYSeries([clonedTransactions[0].federal_action_obligation, clonedTransactions[clonedTransactions.length - 1].federal_action_obligation]);
    }, [transactions]);
    // hook - runs only on mount unless transactions change
    useEffect(() => {
        createXSeries();
        createYSeries();
    }, [
        transactions,
        createXSeries,
        createYSeries
    ]);
    /**
     * createxScale
     * - creates the x scaling function and updates state
     * @returns {null}
     */
    const createXScale = useCallback(() => {
        const scale = scaleLinear().domain(xSeries).range([0, visualizationWidth]);
        setXScale(() => scale);
    }, [xSeries, visualizationWidth]);
    /**
     * createYScale
     * - creates the y scaling function and updates state
     * @returns {null}
     */
    const createYScale = useCallback(() => {
        const scale = scaleLinear().domain(ySeries).range([0, height]);
        setYScale(() => scale);
    }, [ySeries, height]);
    // hook - runs only on mount unless transactions change
    useEffect(() => {
        createXScale();
        createYScale();
    }, [
        transactions,
        createXScale,
        createYScale
    ]);
    /**
     * createXTicks
     * - creates ticks for x axis and updates state
     * @returns {null}
     */
    const createXTicks = useCallback(() => {
        const ticks = xScale.ticks();
        setXTicks(ticks);
    }, [xScale]);
    /**
     * createYTicks
     * - creates ticks for y axis and updates state
     * @returns {null}
     */
    const createYTicks = useCallback(() => {
        const ticks = yScale.ticks();
        console.log(' Y Ticks : ', ticks);
        setYTicks(ticks);
    }, [yScale]);
    // hook - runs only on mount unless transactions or x or y scale change
    useEffect(() => {
        if (xScale && yScale) {
            createXTicks();
            createYTicks();
        }
    }, [transactions, createXTicks, createYTicks, xScale, yScale]);

    return (
        <svg className="contract-grants-activity-chart" width={width} height={height}>
            <g className="contract-grants-activity-chart__body" transform="translate(0,45)">
                <ActivityYAxis
                    height={height}
                    width={visualizationWidth}
                    barHeight={0}
                    padding={{ left: 45 }}
                    data={ySeries}
                    scale={yScale}
                    ticks={yTicks} />
            </g>
        </svg>
    );
};

ContractGrantsActivityChart.propTypes = propTypes;

export default ContractGrantsActivityChart;
