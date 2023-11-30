/**
 * ContractGrantActivityChartAreaPaths.jsx
 * Created by Jonathan Hill 04/23/2020
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    createSteppedAreaPath,
    filteredAndSortedLinesFirstToLast,
    dateMatchingFirstLineValue,
    shouldExtendAreaPathWhenLastDataPointYValueChange
} from 'helpers/contractGrantActivityHelper';

const dayjs = require('dayjs');

const propTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    transactions: PropTypes.array,
    height: PropTypes.number,
    padding: PropTypes.object,
    todayLineValue: PropTypes.number,
    endLineValue: PropTypes.number,
    potentialEndLineValue: PropTypes.number,
    dates: PropTypes.object,
    xDomain: PropTypes.array,
    xAxisSpacing: PropTypes.number
};

const transactionPathDescription = 'A shaded light blue area moving horizontally between each transactions action date and vertically between each transactions federal action obligation difference';
const areaPathToTodayLineDescription = 'An area path of color light blue representing an area path from the first transaction to the today line';
const areaPathPastEndLineDescription = 'An area path of color grey representing an extension of the area path from the first end date line to the last transaction';

const ContractGrantActivityChartAreaPaths = ({
    xScale,
    yScale,
    transactions,
    height,
    padding,
    todayLineValue,
    endLineValue,
    potentialEndLineValue,
    dates,
    xDomain,
    xAxisSpacing
}) => {
    // area path
    const [areaPath, setAreaPath] = useState('');
    // area path extension to today line
    const [areaPathExtensionToTodayLine, setAreaPathExtensionToToday] = useState(null);
    // area path past end line
    const [areaPathPastEndLine, setAreaPathPastEndLine] = useState(null);
    // area path extension last data point y value change
    const [
        areaPathExtensionLastDataPointYValueChange,
        setAreaPathExtensionLastDataPointYValueChange
    ] = useState({
        path: null,
        className: '',
        description: ''
    });
    // area path - hook
    useEffect(() => {
        if (xScale && yScale) {
            setAreaPath(
                createSteppedAreaPath(
                    transactions,
                    xScale,
                    yScale,
                    height,
                    padding.left,
                    'action_date',
                    'running_obligation_total'
                )
            );
        }
    }, [
        xScale,
        yScale,
        transactions,
        height,
        padding
    ]);
    // should we extend area path to today line
    const shouldWeExtendAreaPathToTodayLineOrEndLines = useCallback(() => {
        const lastTransaction = transactions[transactions.length - 1];
        const verticalLines = filteredAndSortedLinesFirstToLast(
            [todayLineValue, endLineValue, potentialEndLineValue]);
        if (!verticalLines?.length) return false;
        const everyLineIsAfterLastTransaction = verticalLines.every((line) => (
            lastTransaction.action_date.isBefore(dayjs(line))
        ));
        if (everyLineIsAfterLastTransaction) return true;
        return false;
    }, [
        transactions,
        todayLineValue,
        endLineValue,
        potentialEndLineValue
    ]);
    // extend area path to today
    const extendAreaPathToTodayLine = useCallback(() => {
        const lastTransaction = transactions[transactions.length - 1];
        if (shouldWeExtendAreaPathToTodayLineOrEndLines() && xScale && yScale) {
            setAreaPathExtensionToToday(createSteppedAreaPath(
                [
                    ...transactions,
                    {
                        action_date: dateMatchingFirstLineValue([todayLineValue, endLineValue, potentialEndLineValue], dates, todayLineValue, endLineValue),
                        running_obligation_total: lastTransaction.running_obligation_total
                    }
                ],
                xScale,
                yScale,
                height,
                padding.left,
                'action_date',
                'running_obligation_total'
            ));
            setAreaPath(null);
        }
    }, [
        transactions,
        xScale,
        yScale,
        height,
        padding,
        shouldWeExtendAreaPathToTodayLineOrEndLines,
        todayLineValue,
        endLineValue,
        potentialEndLineValue,
        dates
    ]);
    // extend area path to today hook
    useEffect(() => {
        extendAreaPathToTodayLine();
    }, [extendAreaPathToTodayLine]);
    // extend aria path past end line hook
    useEffect(() => {
        if (!areaPathExtensionToTodayLine && xScale && yScale) {
            const firstEndLine = filteredAndSortedLinesFirstToLast([endLineValue, potentialEndLineValue])[0];
            // find index of first transaction after the first end line
            const firstTransactionAfterFirstEndLineIndex = transactions.findIndex((t) => {
                if (t.action_date.isAfter(dayjs(firstEndLine))) return true;
                return false;
            });
            if (firstTransactionAfterFirstEndLineIndex !== -1) {
                // isolate all transaction before the first end line
                const transactionsBeforeFirstEndLine = transactions.slice(0, firstTransactionAfterFirstEndLineIndex);
                // isolate all transactions after the first end line
                const transactionsAfterFirstEndLine = transactions.slice(firstTransactionAfterFirstEndLineIndex, transactions.length);
                const firstEndLineDate = dateMatchingFirstLineValue([endLineValue, potentialEndLineValue], dates, todayLineValue, endLineValue);
                // create a new area path to the first endline
                if (transactionsBeforeFirstEndLine.length) {
                    setAreaPath(
                        createSteppedAreaPath(
                            [
                                ...transactionsBeforeFirstEndLine,
                                {
                                    action_date: firstEndLineDate,
                                    running_obligation_total: transactionsBeforeFirstEndLine[transactionsBeforeFirstEndLine.length - 1].running_obligation_total
                                }
                            ],
                            xScale,
                            yScale,
                            height,
                            padding.left,
                            'action_date',
                            'running_obligation_total'
                        )
                    );
                }
                // create a new area path after the first endline
                if (transactionsAfterFirstEndLine.length) {
                    const startingYValueForGreyShading = transactionsBeforeFirstEndLine.length ?
                        transactionsBeforeFirstEndLine[transactionsBeforeFirstEndLine.length - 1].running_obligation_total :
                        transactionsAfterFirstEndLine[0].running_obligation_total;
                    setAreaPathPastEndLine(createSteppedAreaPath(
                        [
                            {
                                action_date: firstEndLineDate,
                                running_obligation_total: startingYValueForGreyShading
                            },
                            ...transactionsAfterFirstEndLine
                        ],
                        xScale,
                        yScale,
                        height - 0.5,
                        padding.left,
                        'action_date',
                        'running_obligation_total'
                    ));
                }
            }
        }
    }, [
        todayLineValue,
        endLineValue,
        potentialEndLineValue,
        dates,
        xScale,
        yScale,
        height,
        padding,
        transactions,
        areaPathExtensionToTodayLine
    ]);
    // extend area path when last data point y value changes
    useEffect(() => {
        if (shouldExtendAreaPathWhenLastDataPointYValueChange(transactions, areaPathExtensionToTodayLine) && xScale && yScale) {
            const lastTransaction = transactions[transactions.length - 1];
            const className = areaPathPastEndLine ? 'area-path__past-end-line darker' : 'area-path';
            const colorForDescription = className === 'area-path' ? 'light blue' : 'grey';
            const description = `An area path of color ${colorForDescription} representing an
            extension of 0.5 pixels to the area path when the y value of the last transaction is greater than
            the second to last transaction`;

            const xAdjustment = xScale.invert(xAxisSpacing + 3) - (xDomain[0]);
            const heightAdjustment = areaPathPastEndLine ? height - 0.5 : height;

            setAreaPathExtensionLastDataPointYValueChange(
                {
                    path: createSteppedAreaPath(
                        [
                            {
                                x: lastTransaction.action_date,
                                y: lastTransaction.running_obligation_total
                            },
                            {
                                x: dayjs(lastTransaction.action_date.valueOf() + xAdjustment),
                                y: lastTransaction.running_obligation_total
                            }
                        ],
                        xScale,
                        yScale,
                        heightAdjustment,
                        padding.left,
                        'x',
                        'y'
                    ),
                    className,
                    description
                }
            );
        }
        else {
            setAreaPathExtensionLastDataPointYValueChange({ path: null, className: '', description: '' });
        }
    }, [
        xScale,
        yScale,
        height,
        padding,
        areaPathPastEndLine,
        transactions,
        xDomain,
        xAxisSpacing,
        areaPathExtensionToTodayLine
    ]);

    return (
        <g className="contract-grant-activity-chart__area-paths">
            {/* area path */}
            {areaPath &&
            <g tabIndex="0">
                <desc>{transactionPathDescription}</desc>
                <path
                    className="area-path"
                    d={areaPath} />
            </g>}
            {/* extend area path to today */}
            {areaPathExtensionToTodayLine &&
            <g tabIndex="0">
                <desc>{areaPathToTodayLineDescription}</desc>
                <path
                    className="area-path"
                    d={areaPathExtensionToTodayLine} />
            </g>}
            {/* extend area path past end line */}
            {areaPathPastEndLine &&
            <g tabIndex="0">
                <desc>{areaPathPastEndLineDescription}</desc>
                <path
                    className="area-path__past-end-line"
                    d={areaPathPastEndLine} />
            </g>}
            {/* area Path Extension Last Data Point Y Value Change */}
            {areaPathExtensionLastDataPointYValueChange.path &&
            <g tabIndex="0">
                <desc>{areaPathExtensionLastDataPointYValueChange.description}</desc>
                <path
                    className={areaPathExtensionLastDataPointYValueChange.className}
                    d={areaPathExtensionLastDataPointYValueChange.path} />
            </g>}
        </g>
    );
};

ContractGrantActivityChartAreaPaths.propTypes = propTypes;
export default ContractGrantActivityChartAreaPaths;
