import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, compact, sum } from 'lodash';
import { scaleLinear } from 'd3-scale';
import moment from 'moment';

import ActivityYAxis from 'components/award/shared/activity/ActivityYAxis';
import ActivityXAxis from 'components/award/shared/activity/ActivityXAxis';
// import VerticalLine from 'components/sharedComponents/VerticalLine';
import { convertDateToFY } from 'helpers/fiscalYearHelper';

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
    const [xDomain, setXDomain] = useState([]);
    // y series
    const [yDomain, setYDomain] = useState([]);
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
        setXDomain(
            [
                clonedTransactions[0].action_date.valueOf(),
                clonedTransactions.pop().action_date.valueOf()
            ]
        );
    }, [transactions]);
    /**
     * createYSeries
     * - creates the y domain and updates state
     * @returns {null}
     */
    const createYDomain = useCallback(() => {
        const clonedTransactions = cloneDeep(transactions);
        clonedTransactions.sort(
            (a, b) => a.federal_action_obligation - b.federal_action_obligation);
        setYDomain(
            [
                clonedTransactions[0].federal_action_obligation,
                clonedTransactions[clonedTransactions.length - 1].federal_action_obligation
            ]
        );
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
     * addLastTickForSpacing
     * - We want to add spacing to the top of the chart based off of the design.
     * To add this space we will add an additional tick to the y-axis by
     * finding the average difference between the ticks and add that to
     * the last tick.
     * @param {Number[]} - an array of numbers.
     * @returns {Number[]} - an array of numbers.
     */
    const addTicksForSpacing = (ticks, first) => {
        if (!ticks.length) return [];
        const updatedTicks = cloneDeep(ticks);
        const differences = compact(ticks.reverse().map((tick, i) => {
            // we do not use the last tick
            if (ticks.length === i + 1) return null;
            return tick - ticks[i + 1];
        }));
        if (!differences.length) return [];
        // average difference
        const averageDifference = differences
            .reduce((acc, data) => acc + data, 0) / differences.length;
        // subtracts the average difference from the first tick and updates the tick array
        if (first) updatedTicks.splice(0, 0, updatedTicks[0] - averageDifference);
        // adds the average difference to the last tick and updates the tick array
        updatedTicks.push(updatedTicks[updatedTicks.length - 1] + averageDifference);
        return updatedTicks;
    };
    /**
     * xTickDateAndLabel
     * - format the x-axis labels
     * @param {Number[]} - an array of dates in milliseconds
     * @returns {Object[]} - an array of objects with date and label properties
     */
    const xTickDateAndLabel = (ticks) => ticks.map((date) => {
        const newDate = new Date(date);
        const year = convertDateToFY(moment(date));
        const shortYear = (year).toString().slice(-2);
        const shortMonth = newDate.toLocaleString('en-us', { month: 'short' }).toUpperCase();
        const label = `${shortMonth} FY '${shortYear}`;
        return { date: newDate, label };
    });
    /**
     * createXScaleAndTicks
     * - creates the x scaling function and updates state
     * @returns {null}
     */
    const createXScaleAndTicks = useCallback(() => {
        if (!xDomain.length) return null;
        /**
         * By design, we want to leave space between the start of the chart
         * and the end of the chart.
         */
        const spacing = visualizationWidth * 0.05;
        const scale = scaleLinear()
            .domain(xDomain)
            .range([spacing, visualizationWidth - spacing - padding.left]);
        let theTicks = scale.ticks(6);
        // add first and last tic per design
        theTicks.splice(0, 0, xDomain[0]); // first tick
        theTicks.push(xDomain[1]); // last tick

        const differences = theTicks.reverse().reduce((acc, tick, i, src) => {
            const nextTick = src[i + 1];
            if (!nextTick) return acc; // last tick ignore
            acc.push(tick - nextTick);
            return acc;
        }, []);

        const averageDifference = sum(differences) / theTicks.length;
        // ascending order since we reversed above
        theTicks.reverse();
        /**
         * manuallyCreateXTicks
         * - Manually create the x ticks starting with the first tick and
         * adding the difference sequentially.
         */
        const manuallyCreateXTicks = (ticks, diff) => {
            const newTicks = cloneDeep(ticks);
            /**
             * Tthe ticks method for d3 does not include ticks for the very beginning
             * and the end of the domain. This leaves a gap between the last tick we create
             * and the last tick of the domain. Therefore we increase our array by two.
             * Since we ignore the first and last tick we cannot unshift or push :(.
             */
            newTicks.splice(1, 0, 1);
            return newTicks.reduce((acc, tick, i) => {
                // ignore first and last tick
                if (i === 0 || i + 1 === newTicks.length) {
                    acc.push(tick);
                }
                else {
                    acc.push(acc[i - 1] + diff);
                }
                return acc;
            }, []);
        };
        /**
         * removeOverlappingTicks
         * - Manually adding ticks could cause overlap since d3 is creating their own ticks.
         * This filters any ticks that might overlap.  The number 20 was derived
         * from visual evidence of overlap on this award ASST_NON_1905OH5MAP_7530.
         * @param {Number[]} - array of milliseconds
         * @param {function} - d3 scale function
         * @returns {Number[]} - array of milliseconds
         */
        let skipNext = false;
        const removeOverlappingTicks = (ticks, scaleFunc) => ticks.reduce((acc, tick, i, src) => {
            if (skipNext) {
                skipNext = false;
                return acc;
            }
            const currentTick = scaleFunc(tick);
            const nextTick = scaleFunc(src[i + 1]);
            if (nextTick) {
                const difference = nextTick - currentTick;
                if (difference <= 20) { // ticks overlap
                    // keeps last tick
                    if (i + 2 === src.length) {
                        return acc;
                    }
                    skipNext = true;
                }
                acc.push(tick);
                return acc;
            }
            acc.push(tick); // first tick
            return acc;
        }, []);
        theTicks = manuallyCreateXTicks(theTicks, averageDifference);
        theTicks = removeOverlappingTicks(theTicks, scale);

        setXTicks(xTickDateAndLabel(theTicks));
        setXScale(() => scale);
        return null;
    }, [
        xDomain,
        visualizationWidth,
        padding.left
    ]);
    /**
     * createYScale
     * - creates the y scaling function and ticks.
     * @returns {null}
     */
    const createYScaleAndTicks = useCallback(() => {
        const scale = scaleLinear().domain(yDomain).range([0, height]).nice();
        // determine the ticks from D3
        const ticks = scale.ticks(6);
        // add last tick for spacing
        const updatedTicksWithSpacing = addTicksForSpacing(ticks);
        // create new scale since we have new data
        const updatedScale = scaleLinear()
            .domain([yDomain[0], updatedTicksWithSpacing[updatedTicksWithSpacing.length - 1]])
            .range([0, height])
            .nice();
        setYTicks(updatedTicksWithSpacing);
        setYScale(() => updatedScale);
    }, [yDomain, height]);
    // hook - runs only on mount unless transactions change
    useEffect(() => {
        if (xDomain.length && yDomain.length) {
            createXScaleAndTicks(xDomain);
            createYScaleAndTicks(yDomain);
        }
    }, [
        transactions,
        createXScaleAndTicks,
        createYScaleAndTicks,
        xDomain,
        yDomain,
        visualizationWidth
    ]);
    // Adds padding bottom and 40 extra pixels for the x-axis
    const svgHeight = height + padding.bottom + 40;
    // updates the x position of our labels
    const paddingForYAxis = Object.assign(padding, { labels: 20 });

    return (
        <svg
            className="contract-grant-activity-chart"
            width={visualizationWidth}
            height={svgHeight}>
            <g className="contract-grant-activity-chart__body" transform="translate(0,10)">
                <ActivityYAxis
                    height={height}
                    width={visualizationWidth}
                    padding={paddingForYAxis}
                    scale={yScale}
                    ticks={yTicks}
                    textAnchor="left" />
                <ActivityXAxis
                    height={height}
                    width={visualizationWidth - padding.left}
                    padding={padding}
                    ticks={xTicks}
                    scale={xScale}
                    line />
                {/* These will be removed in the next PR {xScale && <VerticalLine
                    xScale={xScale}
                    y1={-10}
                    y2={height}
                    textY={0}
                    text="Start Graph"
                    xMax={xDomain[1]}
                    xMin={xDomain[0]}
                    xValue={xDomain[0]}
                    showTextPosition="top"
                    width={visualizationWidth}
                    adjustmentX={padding.left} />}
                {xScale && <VerticalLine
                    xScale={xScale}
                    y1={-10}
                    y2={height}
                    textY={0}
                    text="End Graph"
                    xMax={xDomain[1]}
                    xMin={xDomain[0]}
                    xValue={xDomain[1]}
                    showTextPosition="top"
                    width={visualizationWidth}
                    adjustmentX={padding.left} />} */}
            </g>
        </svg>
    );
};

ContractGrantsActivityChart.propTypes = propTypes;

export default ContractGrantsActivityChart;
