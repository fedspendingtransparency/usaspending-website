import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { scaleLinear } from 'd3-scale';
import { formatMoneyWithPrecision, calculateUnits } from 'helpers/moneyFormatter';

import ActivityYAxis from 'components/award/idv/activity/chart/ActivityYAxis';

const propTypes = {
    height: PropTypes.number,
    padding: PropTypes.object,
    visualizationWidth: PropTypes.number,
    transactions: PropTypes.array
};

const ContractGrantsActivityChart = ({
    height,
    padding,
    visualizationWidth,
    transactions
}) => {
    // x series
    const [xDomain, setXDomain] = useState([0, 0]);
    // y series
    const [yDomain, setYDomain] = useState([0, 0]);
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
    const createXDomain = useCallback(() => {
        const clonedTransactions = cloneDeep(transactions);
        clonedTransactions.sort((a, b) => a.action_date.valueOf() - b.action_date.valueOf());
        setXDomain([clonedTransactions[0].action_date.valueOf(), clonedTransactions[clonedTransactions.length - 1].action_date.valueOf()]);
    }, [transactions]);
    /**
     * createYSeries
     * - creates the y domain and updates state
     * @returns {null}
     */
    const createYDomain = useCallback(() => {
        const clonedTransactions = cloneDeep(transactions);
        clonedTransactions.sort((a, b) => a.federal_action_obligation - b.federal_action_obligation);
        setYDomain([clonedTransactions[0].federal_action_obligation, clonedTransactions[clonedTransactions.length - 1].federal_action_obligation]);
    }, [transactions]);
    // hook - runs only on mount unless transactions change
    useEffect(() => {
        createXDomain();
        createYDomain();
    }, [
        transactions,
        createXDomain,
        createYDomain
    ]);
    /**
     * createxScale
     * - creates the x scaling function and updates state
     * @returns {null}
     */
    const createXScale = useCallback(() => {
        const scale = scaleLinear().domain(xDomain).range([0, visualizationWidth]).nice();
        setXScale(() => scale);
    }, [xDomain, visualizationWidth]);
    /**
     * createYScale
     * - creates the y scaling function and updates state
     * @returns {null}
     */
    const createYScale = useCallback(() => {
        const scale = scaleLinear().domain(yDomain).range([0, height]).nice();
        setYScale(() => scale);
    }, [yDomain, height]);
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
        const ticks = xScale.ticks(6);
        setXTicks(ticks);
    }, [xScale]);
    /**
     * createYTicks
     * - creates ticks for y axis and updates state.
     * @returns {null}
     */
    const createYTicks = useCallback(() => {
        const ticks = yScale.ticks(6);
        setYTicks(ticks);
    }, [yScale]);
    // hook - runs only on mount unless transactions or x or y scale change.
    useEffect(() => {
        if (xScale && yScale) {
            createXTicks();
            createYTicks();
        }
    }, [transactions, createXTicks, createYTicks, xScale, yScale]);
    // Adds padding bottom and 40 extra pixels for the x-axis.
    const svgHeight = height + padding.bottom + 40;
    // updates the x position of our labels.
    const paddingForYAxis = Object.assign(padding, { labels: 20 });

    return (
        <svg
            className="contract-grant-activity-chart"
            width={visualizationWidth}
            height={svgHeight}>
            <g className="contract-grant-activity-chart__body" transform="translate(0,45)">
                <ActivityYAxis
                    height={height}
                    width={visualizationWidth}
                    padding={paddingForYAxis}
                    scale={yScale}
                    ticks={yTicks}
                    textAnchor="left" />
            </g>
        </svg>
    );
};

ContractGrantsActivityChart.propTypes = propTypes;

export default ContractGrantsActivityChart;
