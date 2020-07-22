import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, compact, sum } from 'lodash';
import { scaleLinear } from 'd3-scale';
import moment from 'moment';

import ActivityYAxis from 'components/award/shared/activity/ActivityYAxis';
import ActivityXAxis from 'components/award/shared/activity/ActivityXAxis';
import SVGLine from 'components/sharedComponents/SVGLine';
import {
    getXDomain,
    getLineValue
} from 'helpers/contractGrantActivityHelper';
import { convertDateToFY } from 'helpers/fiscalYearHelper';
import { formatMoney } from 'helpers/moneyFormatter';
import ContractGrantActivityChartVerticalLines from './ContractGrantActivityChartVerticalLines';
import ContractGrantActivityChartCircles from './ContractGrantActivityChartCircles';
import ContractGrantActivityChartAreaPaths from './ContractGrantActivityChartAreaPaths';


const propTypes = {
    height: PropTypes.number,
    padding: PropTypes.object,
    visualizationWidth: PropTypes.number,
    transactions: PropTypes.array,
    awardType: PropTypes.string,
    dates: PropTypes.object,
    totalObligation: PropTypes.number,
    showHideTooltipLine: PropTypes.func,
    showTooltipTransaction: PropTypes.func,
    hideTooltipTransaction: PropTypes.func,
    thisLineOrTextIsHovered: PropTypes.string,
    hideTransactionTooltipOnBlur: PropTypes.func
};

const xAxisSpacingPercentage = 0.05;

const ContractGrantsActivityChart = ({
    height,
    padding,
    visualizationWidth,
    transactions,
    awardType,
    dates,
    totalObligation,
    showHideTooltipLine,
    showTooltipTransaction,
    hideTooltipTransaction,
    thisLineOrTextIsHovered,
    hideTransactionTooltipOnBlur
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
    // start line
    const [startLineData, setStartLineData] = useState({ value: 0, height: 0 });
    // today line
    const [todayLineData, setTodayLineData] = useState({ value: 0, height: 0 });
    // end line
    const [endLineData, setEndLineData] = useState({ value: 0, height: 0 });
    // potential end line
    const [potentialEndLineData, setPotentialEndLineData] = useState({ value: 0, height: 0 });
    // x axis spacing
    const [xAxisSpacing, setXAxisSpacing] = useState(0);
    const [verticalLineTextHeight, setVerticalLineTextHeight] = useState(0);
    const [totalVerticalLineTextHeight, setTotalVerticalLineTextHeight] = useState(0);
    /**
     * createXSeries
     * - creates the x domain and updates state
     */
    const createXDomain = useCallback(() => setXDomain(getXDomain(dates, awardType, transactions)), [
        awardType,
        dates,
        transactions,
        setXDomain
    ]);
    /**
     * createYSeries
     * - creates the y domain and updates state
     * @returns {null}
     */
    const createYDomain = useCallback(() => {
        const clonedTransactions = cloneDeep(transactions);
        clonedTransactions.sort(
            (a, b) => a.running_obligation_total - b.running_obligation_total);
        const yZero = 0;
        let yOne = 0;
        if (clonedTransactions.length > 1) { // multiple transactions
            // if the total obligation if bigger than any running obligation total, use total obligation
            yOne = totalObligation > clonedTransactions[clonedTransactions.length - 1].running_obligation_total
                ? totalObligation
                : clonedTransactions[clonedTransactions.length - 1].running_obligation_total;
        }
        else { // one transaction
            yOne = totalObligation || clonedTransactions[0].running_obligation_total;
        }
        setYDomain([yZero, yOne]);
    }, [transactions, totalObligation]);
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
    const addTicksForSpacing = (ticks, scale) => {
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
        // adds the average difference to the last tick and updates the tick array
        updatedTicks.push(updatedTicks[updatedTicks.length - 1] + averageDifference);
        /**
         * Since we are adding fake spacing to the top of the chart so the vertical line text
         * never overlaps with the chart, and the lines will be descending in height to make
         * sure the text never overlaps with other text. We must make sure the average difference
         * is greater than the total height of the vertical line text. If it is not we will add
         * another tick.
         */
        if (totalVerticalLineTextHeight > scale(averageDifference)) {
            /**
             * Now the question is how much space do we need to add? To determine this,
             * we will get the difference from the total text height and then divide that
             * by the average difference. If it is greater than 1, then we will add how ever
             * many extra tick we need. :)
             */
            const difference = totalVerticalLineTextHeight - scale(averageDifference);
            const howManyTicksToAdd = [];
            for (let i = 0; i < Math.ceil(difference / averageDifference); i++) {
                howManyTicksToAdd.push(i);
            }
            howManyTicksToAdd.forEach(() => updatedTicks.push(updatedTicks[updatedTicks.length - 1] + averageDifference));
        }
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
        const spacing = visualizationWidth * xAxisSpacingPercentage;
        const scale = scaleLinear()
            .domain(xDomain)
            .range([spacing, visualizationWidth - spacing - padding.left]);
        let theTicks = scale.ticks(6);
        // add first and last tic per design
        theTicks.splice(0, 0, xDomain[0]); // first tick
        theTicks.push(xDomain[1]); // last tick

        const differencesBetweenEachTick = theTicks.reverse().reduce((acc, tick, i, src) => {
            const nextTick = src[i + 1];
            if (!nextTick) return acc; // last tick ignore
            acc.push(tick - nextTick);
            return acc;
        }, []);

        const averageDifference = sum(differencesBetweenEachTick) / theTicks.length;
        // ascending order since we reversed above
        theTicks.reverse();
        /**
         * evenlySpacedTicks
         * - Manually create the x ticks starting with the first tick and
         * adding the difference sequentially.
         */
        const evenlySpacedTicks = (ticks, diff) => {
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
        const removeOverlappingTicks = (ticks, scaleFunc) => ticks.filter((tick, i, src) => {
            if (skipNext) {
                skipNext = false;
                return false;
            }
            const currentTick = scaleFunc(tick);
            const nextTick = scaleFunc(src[i + 1]);
            if (nextTick) {
                const difference = nextTick - currentTick;
                if (difference <= 20) { // ticks overlap
                    // keeps last tick
                    if (i + 2 === src.length) {
                        return false;
                    }
                    skipNext = true;
                }
                return true;
            }
            return true;
        });
        theTicks = evenlySpacedTicks(theTicks, averageDifference);
        theTicks = removeOverlappingTicks(theTicks, scale);
        setXTicks(xTickDateAndLabel(theTicks));
        setXScale(() => scale);
        setXAxisSpacing(spacing);
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
        const updatedTicksWithSpacing = addTicksForSpacing(ticks, scale);
        // create new scale since we have new data
        const updatedScale = scaleLinear()
            .domain([yDomain[0], updatedTicksWithSpacing[updatedTicksWithSpacing.length - 1]])
            .range([0, height])
            .nice();
        setYTicks(updatedTicksWithSpacing);
        setYScale(() => updatedScale);
    }, [yDomain, height, totalVerticalLineTextHeight]);
    // hook - runs only on mount unless transactions change
    useEffect(() => {
        if (xDomain.length && yDomain.length) {
            createXScaleAndTicks();
            createYScaleAndTicks();
        }
    }, [
        transactions,
        createXScaleAndTicks,
        createYScaleAndTicks,
        xDomain,
        yDomain,
        visualizationWidth
    ]);
    // sets the line values - hook - runs on mount and dates change
    useEffect(() => {
        if (xDomain && xDomain.length > 0) {
            setStartLineData(Object.assign({}, startLineData, { value: getLineValue(dates._startDate, xDomain) }));
            setTodayLineData(Object.assign({}, todayLineData, { value: getLineValue(moment(Date.now()), xDomain) }));
            setEndLineData(Object.assign({}, endLineData, { value: getLineValue(dates._endDate, xDomain) }));
            setPotentialEndLineData(Object.assign({}, potentialEndLineData, { value: getLineValue(dates._potentialEndDate, xDomain) }));
        }
    }, [dates, xDomain]);
    const setVerticalLineHeight = (i, lineHeight) => {
        if (i === 0) return setStartLineData(Object.assign({}, startLineData, { height: lineHeight }));
        if (i === 1) return setEndLineData(Object.assign({}, endLineData, { height: lineHeight }));
        if (i === 2) return setPotentialEndLineData(Object.assign({}, potentialEndLineData, { height: lineHeight }));
        return setTodayLineData(Object.assign({}, todayLineData, { height: lineHeight }));
    };
    const allVerticalLines = useCallback(() => (
        [startLineData, endLineData, potentialEndLineData, todayLineData]
    ), [
        startLineData,
        endLineData,
        potentialEndLineData,
        todayLineData
    ]);
    const setVerticalLineHeights = useCallback(() => {
        let heightHasBeenInitialized = false;
        let currentHeight = 0;
        allVerticalLines().map((data) => data.value)
            .forEach((data, i) => {
                if (data) {
                    if (!heightHasBeenInitialized) { // set line to height of chart
                        heightHasBeenInitialized = true;
                        setVerticalLineHeight(i, currentHeight);
                        currentHeight += verticalLineTextHeight;
                        return null;
                    }
                    setVerticalLineHeight(i, currentHeight);
                    currentHeight += verticalLineTextHeight;
                    return null;
                }
                return null;
            });
    }, [
        verticalLineTextHeight,
        startLineData,
        endLineData,
        todayLineData,
        potentialEndLineData
    ]);

    const updateTotalTextHeightAndVerticalLineHeights = useCallback(() => {
        if (!totalVerticalLineTextHeight) {
            setTotalVerticalLineTextHeight((allVerticalLines().map((data) => data.value).filter((data) => data).length) * verticalLineTextHeight);
            setVerticalLineHeights(verticalLineTextHeight);
        }
    }, [
        verticalLineTextHeight,
        setVerticalLineHeights,
        allVerticalLines,
        totalVerticalLineTextHeight
    ]);
    // update the total text height and vertical line heights
    useEffect(() => {
        updateTotalTextHeightAndVerticalLineHeights();
    }, [verticalLineTextHeight, updateTotalTextHeightAndVerticalLineHeights]);
    // updates the y axis if the total text height changes
    useEffect(() => {
        createYScaleAndTicks();
    }, [totalVerticalLineTextHeight, createYScaleAndTicks]);
    const updateVerticalLineTextData = (data) => {
        if (data.height !== verticalLineTextHeight) {
            setVerticalLineTextHeight(data.height);
        }
    };
    // Adds padding bottom and 40 extra pixels for the x-axis
    const svgHeight = height + padding.bottom + 40;
    // updates the x position of our labels
    const paddingForYAxis = Object.assign(padding, { labels: 20 });
    const potentialAwardAmountLineDescription = `A horizontal line representing the total award obligation of ${formatMoney(totalObligation)}`;
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
                {/* area paths */}
                {xScale && <ContractGrantActivityChartAreaPaths
                    xScale={xScale}
                    yScale={yScale}
                    transactions={transactions}
                    height={height}
                    padding={padding}
                    todayLineValue={todayLineData.value}
                    endLineValue={endLineData.value}
                    potentialEndLineValue={potentialEndLineData.value}
                    dates={dates}
                    xDomain={xDomain}
                    xAxisSpacing={xAxisSpacing} />}
                {/* circles */}
                {transactions.length && <ContractGrantActivityChartCircles
                    transactions={transactions}
                    padding={padding}
                    xScale={xScale}
                    yScale={yScale}
                    xAxisSpacing={xAxisSpacing}
                    height={height}
                    showTooltip={showTooltipTransaction}
                    hideTooltip={hideTooltipTransaction}
                    hideTransactionTooltipOnBlur={hideTransactionTooltipOnBlur} />}
                {/* vertical lines */}
                {xScale && <ContractGrantActivityChartVerticalLines
                    xScale={xScale}
                    height={height}
                    xDomain={xDomain}
                    padding={padding}
                    startLineValue={startLineData.value}
                    todayLineValue={todayLineData.value}
                    endLineValue={endLineData.value}
                    potentialEndLineValue={potentialEndLineData.value}
                    awardType={awardType}
                    showHideTooltip={showHideTooltipLine}
                    thisLineOrTextIsHovered={thisLineOrTextIsHovered}
                    verticalLineTextData={updateVerticalLineTextData}
                    startLineHeight={startLineData.height}
                    endLineHeight={endLineData.height}
                    potentialEndLineHeight={potentialEndLineData.height}
                    todayLineHeight={todayLineData.height} />}
                {/* potential award amount line */}
                {xScale && <SVGLine
                    lineClassname="potential-award-amount-line"
                    description={potentialAwardAmountLineDescription}
                    scale={yScale}
                    x1={padding.left}
                    x2={visualizationWidth}
                    max={yDomain[1]}
                    min={yDomain[0]}
                    position={totalObligation}
                    graphHeight={height}
                    isHorizontal
                    noText
                    onMouseMoveLine={showHideTooltipLine}
                    onMouseLeaveLine={showHideTooltipLine}
                    onMouseMoveText={showHideTooltipLine}
                    onMouseLeaveText={showHideTooltipLine} />}
            </g>
        </svg>
    );
};

ContractGrantsActivityChart.propTypes = propTypes;

export default ContractGrantsActivityChart;
