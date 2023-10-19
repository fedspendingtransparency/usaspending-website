/**
 * Created By Jonathan Hill 03/26/20
 */

import { cloneDeep } from 'lodash';
import { isAwardFinancialAssistance } from 'helpers/awardSummaryHelper';
import { badPotentialEndDate } from '../../../tests/testResources/mockContractGrantActivityHelper';

const dayjs = require('dayjs');

export const filteredAndSortedLinesFirstToLast = (lines) => lines
    .filter((line) => line).sort();

export const dateMatchingFirstLineValue = (lines, dates, todayLineValue, endLineValue) => {
    const firstEndLine = filteredAndSortedLinesFirstToLast(lines)[0];
    if (firstEndLine === todayLineValue) return dayjs(todayLineValue);
    if (firstEndLine === endLineValue) return dates._endDate;
    return dates._potentialEndDate;
};

// should we extend path for last data point y value change
export const shouldExtendAreaPathWhenLastDataPointYValueChange = (transactions, areaPathExtensionToTodayLine) => {
    if (transactions.length <= 1) return false;
    const lastTransactionValueChange = transactions[transactions.length - 1].running_obligation_total !== transactions[transactions.length - 2].running_obligation_total;
    if (!lastTransactionValueChange) return false;
    if (areaPathExtensionToTodayLine) return false;
    return true;
};

export const createSteppedAreaPath = (
    data, // data points
    xScale, // d3 linear scale
    yScale, // d3 linear scale
    height, // height of the graph
    padding, // horizontal padding for the svg
    xProperty, // x property of the data point must be dayjs object
    yProperty // y property of the data point
) => (
    data.reduce((acc, t, i, array) => {
        let pathString = acc;
        const xDirection = xScale(t[xProperty].valueOf()) + (padding || 0);
        const yDirection = height - yScale(t[yProperty]);
        if (i === 0) { // first transaction
            // first x coordinate
            pathString += `${xDirection},`;
            // first y coordinate ( which should be the bottom of the graph )
            pathString += `${height}`;
            // navigate from the bottom of graph to first transaction y coordinate
            pathString += `V${yDirection}`;
            return pathString;
        }
        /**
         * add x direction
         * travel to next transaction x coordinate
         */
        pathString += `H${xDirection}`;
        /**
         * add y direction
         * travel to next transaction y coordinate
         */
        pathString += `V${yDirection}`;
        if (i + 1 === array.length) { // end path
            pathString += `H${xDirection}`;
            /**
             * travel to bottom of graph
             */
            pathString += `V${height}Z`;
        }
        return pathString;
    }, 'M')
);
/**
 * getLineValue
 * - determines if a line should be drawn
 * @param {dayjs{}} date
 * @returns {null || Number}
 */
export const getLineValue = (date, xDomain) => {
    if (!date || isNaN(date.valueOf())) return null;
    if (date.valueOf() < xDomain[0] || date.valueOf() > xDomain[1]) return null;
    return date.valueOf();
};
/**
 * areTransactionDatesOrAwardAmountsInvalid
 * - determines if we do not have suitable data to draw the chart based on dates,
 * award type and transactions
 * @param {Object} dates - award dates
 * @param {string} awardType - award type
 * @param {Object[]} transactions - array of transaction objects
 * @returns {Boolean} - is the data suitable for charting
 */
export const areTransactionDatesOrAwardAmountsInvalid = (dates, awardType, transactions) => {
    const {
        _startDate: startDate,
        _endDate: currentEndDate,
        _potentialEndDate: potentialEndDate
    } = dates;
    // any running obligation total is negative
    if (transactions.some((x) => {
        if (x.running_obligation_total) {
            return x.running_obligation_total.toString().startsWith('-');
        }
        return false;
    })) return true;
    /**
     * handles null, '', or 'random string' passed to dayjs
     */
    const badStart = isNaN(startDate.valueOf()) || !startDate;
    const badCurrent = isNaN(currentEndDate.valueOf()) || !currentEndDate;
    const badEnd = isNaN(potentialEndDate.valueOf()) || !potentialEndDate;
    const noTransactionHasDates = transactions.every((t) => isNaN(t.action_date.valueOf()));
    const onlyOneTransaction = transactions.length === 1;
    if (isAwardFinancialAssistance(awardType)) { // grant
    // 3
        if (noTransactionHasDates) return true;
        if (badStart && badCurrent && onlyOneTransaction) return true;
        // 4.b and 5.b
        if (onlyOneTransaction) {
            // 4.b
            if ((badStart && !badCurrent)) {
                if (transactions[0].action_date.valueOf() > currentEndDate.valueOf()) return true;
            }
            // 5.b
            if (badCurrent && !badStart) {
                if (transactions[0].action_date.valueOf() === startDate.valueOf()) return true;
            }
        }
        return false;
    }
    // contract
    // 3
    if (noTransactionHasDates) return true;
    if (badStart && badCurrent && badEnd && onlyOneTransaction) return true;
    // 4.b and 5.b
    if (onlyOneTransaction) {
    // 4.b
        if ((badStart && (!badCurrent || !badEnd))) {
            // since contracts could have current or potential we test both - potential first
            if (potentialEndDate.valueOf() && (transactions[0].action_date.valueOf() > potentialEndDate.valueOf())) return true;
            if (currentEndDate.valueOf() && (transactions[0].action_date.valueOf() > currentEndDate.valueOf())) return true;
        }
        // 5.b
        if ((badCurrent && badEnd) && !badStart) {
            if (transactions[0].action_date.valueOf() === startDate.valueOf()) return true;
        }
    }
    return false;
};
/**
 * beforeDate
 * - determines if the first date is before the second date
 * @param {dayjs{}} start - date to compare
 * @param {dayjs{}} end - date to compare
 * @returns {dayjs{}} - dayjs object
 */
export const beforeDate = (start, end) => {
    if (start.isBefore(end)) return start;
    return end;
};
/**
 * afterDate
 * - determines if the first date is after the second date
 * @param {dayjs{}} start - date to compare
 * @param {dayjs{}} end - date to compare
 * @returns {dayjs{}} - dayjs object
 */
export const afterDate = (start, end) => {
    if (start.isAfter(end)) return start;
    return end;
};
/**
 * getXDomain
 * - Determines the getXDomain based on dates, award type and transactions for a given award.
 * @param {Object} dates - award dates
 * @param {string} awardType - award type
 * @param {Object[]} transactions - array of transaction objects
 * @returns {Number[]} - array with a min and max value, e.g. [min, max]
 */
export const getXDomain = (dates, awardType, transactions) => {
    const {
        _startDate: startDate,
        _endDate: currentEndDate,
        _potentialEndDate: potentialEndDate
    } = dates;
    const transactionData = cloneDeep(transactions);
    /**
     * handles null, '', or 'random string' passed to dayjs
     */
    const badStart = isNaN(startDate.valueOf()) || !startDate;
    const badCurrent = isNaN(currentEndDate.valueOf()) || !currentEndDate;
    const badEnd = isNaN(potentialEndDate.valueOf()) || !potentialEndDate;
    const onlyOneTransaction = transactions.length === 1;
    // only one transaction
    if (onlyOneTransaction) {
        if (isAwardFinancialAssistance(awardType)) { // grant
            // 5.a start and no end use transaction as end domain
            if (!badStart && badCurrent) return [beforeDate(startDate, transactions[0].action_date).valueOf(), afterDate(startDate, transactions[0].action_date).valueOf()];
            // 4.a no start and end use transaction as start domain
            if (badStart && !badCurrent) return [transactions[0].action_date.valueOf(), currentEndDate.valueOf()];
            return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, currentEndDate).valueOf()];
        }
        // 5.a start and no end use transaction as end domain
        if (!badStart && (badCurrent && badEnd)) return [beforeDate(startDate, transactions[0].action_date).valueOf(), afterDate(startDate, transactions[0].action_date).valueOf()];
        // 4.a no start and end use transaction as start domain
        if (badStart && (!badCurrent || !badEnd)) {
            const date = !badEnd ? potentialEndDate : currentEndDate;
            return [transactions[0].action_date.valueOf(), date.valueOf()];
        }
        if (!badStart && (!badCurrent || !badEnd)) {
            const date = !badEnd ? potentialEndDate : currentEndDate;
            return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, date).valueOf()];
        }
        return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, potentialEndDate).valueOf()];
    }

    if (isAwardFinancialAssistance(awardType)) { // grant
    // 6 no dates use transactions
        if (badStart && badEnd) return [transactionData.shift().action_date.valueOf(), transactionData.pop().action_date.valueOf()];
        // 7 no start and end use first transaction
        if (badStart && !badCurrent) return [transactionData.shift().action_date.valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
        // 8 no end and start use last transaction
        if (badCurrent && !badStart) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), transactionData.pop().action_date.valueOf()];
        return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
    }
    // 6 no dates use transactions
    if (badStart && badCurrent && badPotentialEndDate) return [transactionData.shift().action_date.valueOf(), transactionData.pop().action_date.valueOf()];
    // 7 no start and end use first transaction
    if (badStart && (!badCurrent || !badEnd)) {
        const date = !badEnd ? potentialEndDate : currentEndDate;
        return [transactionData.shift().action_date.valueOf(), afterDate(transactionData.pop().action_date, date).valueOf()];
    }
    // 8 no end and start use last transaction
    if ((badCurrent && badEnd) && !badStart) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), transactionData.pop().action_date.valueOf()];
    // 9 no current end and start and potential end
    if (badEnd && (!badStart && !badCurrent)) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
    return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, potentialEndDate).valueOf()];
};
