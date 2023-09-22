/**
 * @jest-environment jsdom
 *
 * Created by Jonathan Hill 03/26/20
 */

import { cloneDeep } from 'lodash';
import { scaleLinear } from 'd3-scale';
import {
    areTransactionDatesOrAwardAmountsInvalid,
    getXDomain,
    beforeDate,
    afterDate,
    getLineValue,
    filteredAndSortedLinesFirstToLast,
    dateMatchingFirstLineValue,
    shouldExtendAreaPathWhenLastDataPointYValueChange,
    createSteppedAreaPath
} from 'helpers/contractGrantActivityHelper';
import {
    goodDates,
    badDates,
    badEndDates,
    badStartDate,
    badEndDate,
    badPotentialEndDate,
    noTransactionDates,
    oneTransaction,
    mockTransactions
} from '../testResources/mockContractGrantActivityHelper';

const dayjs = require('dayjs');

describe('Contract Grant Activity Helper', () => {
    describe('Is Bad Data', () => {
        it('should return true if any running total is negative', () => {
            const negativeTransactions = cloneDeep(mockTransactions).map((t, i) => {
                const data = t;
                data.running_obligation_total = -(i + 1);
                return data;
            });
            expect(areTransactionDatesOrAwardAmountsInvalid(goodDates, 'contract', negativeTransactions)).toBe(true);
        });
        it('should return true if all transaction do not have a date', () => {
            const noDates = cloneDeep(mockTransactions).map((x) => {
                const data = cloneDeep(x);
                data.action_date = dayjs(null);
                return data;
            });
            expect(areTransactionDatesOrAwardAmountsInvalid(goodDates, 'grant', noDates)).toBe(true);
        });
        it('should return true when there are no dates and one transaction', () => {
            const dates = {
                _startDate: '',
                _endDate: '',
                _potentialEndDate: ''
            };
            expect(areTransactionDatesOrAwardAmountsInvalid(dates, 'contract', oneTransaction)).toEqual(true);
            expect(areTransactionDatesOrAwardAmountsInvalid(dates, 'grant', oneTransaction)).toEqual(true);
        });
        describe('Grant', () => {
            // 3
            it('should return true when no transactions have dates', () => {
                expect(areTransactionDatesOrAwardAmountsInvalid(goodDates, 'grant', noTransactionDates)).toBe(true);
            });
            // 3
            it('should return true when there is no start date and end date exists and only one transaction', () => {
                const data = cloneDeep(badStartDate);
                data._endDate = dayjs('05/25/2011', 'MM/DD/YYYY'); 
                expect(areTransactionDatesOrAwardAmountsInvalid(data, 'grant', oneTransaction)).toBe(true);
            });
            // 4.b
            it('should return true when there is no start date and end date exists and only one transaction and transaction date is > than end date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = dayjs('05/25/2014', 'MM/DD/YYYY');
                expect(areTransactionDatesOrAwardAmountsInvalid(badStartDate, 'grant', newTransaction)).toBe(true);
            });
            // 5/b
            it('should return true when there is no end date and start date exists and only one transaction and transaction date is equal to start date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = dayjs('01/25/2011', 'MM/DD/YYYY');
                expect(areTransactionDatesOrAwardAmountsInvalid(badEndDate, 'grant', newTransaction)).toBe(true);
            });
        });
        describe('Contract', () => {
            // 3
            it('should return true when no transactions have dates', () => {
                expect(areTransactionDatesOrAwardAmountsInvalid(goodDates, 'contract', noTransactionDates)).toBe(true);
            });
            // 3
            it('should return true when no dates and one transaction', () => {
                expect(areTransactionDatesOrAwardAmountsInvalid(badDates, 'contract', oneTransaction)).toBe(true);
            });
            // 4.b
            it('should return true when there is no start date and potential end date exists and only one transaction and transaction date is > than potential end date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = dayjs('05/25/2019', 'MM/DD/YYYY');
                const newDates = cloneDeep(badStartDate);
                newDates._endDate = badEndDate._endDate;
                expect(areTransactionDatesOrAwardAmountsInvalid(newDates, 'contract', newTransaction)).toBe(true);
            });
            // 4.b
            it('should return true when there is no start date and current end date exists and only one transaction and transaction date is > than current end date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = dayjs('05/25/2014', 'MM/DD/YYYY');
                const newDates = cloneDeep(badStartDate);
                newDates._potentialEndDate = badPotentialEndDate._potentialEndDate;
                expect(areTransactionDatesOrAwardAmountsInvalid(newDates, 'contract', newTransaction)).toBe(true);
            });
            // 5.b
            it('should return true when there is no end date and start date exists and only one transaction and transaction date is === than start date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = dayjs('01/25/2011', 'MM/DD/YYYY');
                expect(areTransactionDatesOrAwardAmountsInvalid(badEndDates, 'contract', newTransaction)).toBe(true);
            });
        });
    });
    describe('getXDomain', () => {
        const data = cloneDeep(mockTransactions);
        const firstTransactionDate = data.shift().action_date.valueOf();
        const lastTransactionDate = data.pop().action_date.valueOf();
        const oneTransactionDate = oneTransaction[0].action_date.valueOf();
        describe('Only One Transaction', () => {
            describe('Grant', () => {
                // 5.a
                it('should return end domain as transaction date when one transaction and no end date', () => {
                    const domain = getXDomain(badEndDate, 'grant', oneTransaction);
                    expect(domain[0]).toBe(badEndDate._startDate.valueOf());
                    expect(domain[1]).toBe(oneTransactionDate);
                });
                // 4.a
                it('should return start domain as transaction date when one transaction and no start date', () => {
                    const domain = getXDomain(badStartDate, 'grant', oneTransaction);
                    expect(domain[0]).toBe(oneTransactionDate);
                    expect(domain[1]).toBe(badStartDate._endDate.valueOf());
                });
                it('should return dates as domain when good dates', () => {
                    const theDates = cloneDeep(goodDates);
                    theDates._endDate = dayjs('05/25/2020', 'MM/DD/YYYY');
                    const domain = getXDomain(theDates, 'grant', oneTransaction);
                    expect(domain[0]).toBe(theDates._startDate.valueOf());
                    expect(domain[1]).toBe(theDates._endDate.valueOf());
                });
            });
            describe('Contract', () => {
                // 5.a
                it('should return end domain as transaction date when one transaction and no end date', () => {
                    const domain = getXDomain(badEndDates, 'contract', oneTransaction);
                    expect(domain[0]).toBe(badEndDate._startDate.valueOf());
                    expect(domain[1]).toBe(oneTransactionDate);
                });
                // 4.a
                it('should return start domain as transaction date and end domain as potential end date when one transaction and no start date and potential end date exists', () => {
                    const domain = getXDomain(badStartDate, 'contract', oneTransaction);
                    expect(domain[0]).toBe(oneTransactionDate);
                    expect(domain[1]).toBe(badStartDate._potentialEndDate.valueOf());
                });
                // 4.a
                it('should return start domain as transaction date and end domain as current end date when one transaction and no start date and current end date exists and no potential end', () => {
                    const theDates = cloneDeep(badStartDate);
                    theDates._potentialEndDate = dayjs(null);
                    const domain = getXDomain(theDates, 'contract', oneTransaction);
                    expect(domain[0]).toBe(oneTransactionDate);
                    expect(domain[1]).toBe(theDates._endDate.valueOf());
                });
                it('should return dates as domain when good dates', () => {
                    const theDates = cloneDeep(goodDates);
                    const domain = getXDomain(goodDates, 'contract', oneTransaction);
                    expect(domain[0]).toBe(theDates._startDate.valueOf());
                    expect(domain[1]).toBe(theDates._potentialEndDate.valueOf());
                });
            });
        });
        describe('Grant', () => {
            // 6
            it('should return first and last transaction as start and end of domain when all bad dates', () => {
                const domain = getXDomain(badDates, 'grant', mockTransactions);
                expect(domain[0]).toBe(firstTransactionDate);
                expect(domain[1]).toBe(lastTransactionDate);
            });
            // 7
            it('should return transaction as start when bad start date', () => {
                const domain = getXDomain(badStartDate, 'grant', mockTransactions);
                expect(domain[0]).toBe(firstTransactionDate);
                expect(domain[1]).toBe(badStartDate._endDate.valueOf());
            });
            // 8
            it('should return transaction as end when no end date', () => {
                const domain = getXDomain(badEndDate, 'grant', mockTransactions);
                expect(domain[0]).toBe(badEndDate._startDate.valueOf());
                expect(domain[1]).toBe(lastTransactionDate);
            });
            it('should return dates as domain when good dates', () => {
                const domain = getXDomain(goodDates, 'grant', mockTransactions);
                expect(domain[0]).toBe(goodDates._startDate.valueOf());
                expect(domain[1]).toBe(goodDates._endDate.valueOf());
            });
        });
        describe('Contract', () => {
            // 6
            it('should return first and last transaction as start and end of domain when all bad dates', () => {
                const domain = getXDomain(badDates, 'contract', mockTransactions);
                expect(domain[0]).toBe(firstTransactionDate);
                expect(domain[1]).toBe(lastTransactionDate);
            });
            // 7
            it('should return transaction as start and potential as end when bad start date no current end', () => {
                const domain = getXDomain(badStartDate, 'contract', mockTransactions);
                expect(domain[0]).toBe(firstTransactionDate);
                expect(domain[1]).toBe(badStartDate._potentialEndDate.valueOf());
            });
            // 7
            it('should return transaction as start and current as end when bad start date no potential end', () => {
                const theDates = cloneDeep(badStartDate);
                theDates._potentialEndDate = dayjs(null);
                const domain = getXDomain(theDates, 'contract', mockTransactions);
                expect(domain[0]).toBe(firstTransactionDate);
                expect(domain[1]).toBe(theDates._endDate.valueOf());
            });
            // 8
            it('should return transaction as end when no end date', () => {
                const domain = getXDomain(badEndDates, 'contract', mockTransactions);
                expect(domain[0]).toBe(badEndDates._startDate.valueOf());
                expect(domain[1]).toBe(lastTransactionDate);
            });
            // 9
            it('should return potential as end when no current end date', () => {
                const domain = getXDomain(badEndDate, 'contract', mockTransactions);
                expect(domain[0]).toBe(badEndDate._startDate.valueOf());
                expect(domain[1]).toBe(badEndDate._potentialEndDate.valueOf());
            });
            it('should return dates as domain when good dates', () => {
                const domain = getXDomain(goodDates, 'contract', mockTransactions);
                expect(domain[0]).toBe(goodDates._startDate.valueOf());
                expect(domain[1]).toBe(goodDates._potentialEndDate.valueOf());
            });
        });
    });
    describe('beforeDate', () => {
        it('should return first date when first date is before second date', () => {
            expect(beforeDate(goodDates._startDate, goodDates._endDate).valueOf()).toBe(goodDates._startDate.valueOf());
        });
        it('should return second date when first date is after second date', () => {
            expect(beforeDate(goodDates._endDate, goodDates._startDate).valueOf()).toBe(goodDates._startDate.valueOf());
        });
    });
    describe('afterDate', () => {
        it('should return first date when first date is after second date', () => {
            expect(afterDate(goodDates._endDate, goodDates._startDate).valueOf()).toBe(goodDates._endDate.valueOf());
        });
        it('should return second date when first date is before second date', () => {
            expect(afterDate(goodDates._startDate, goodDates._endDate).valueOf()).toBe(goodDates._endDate.valueOf());
        });
    });
});

describe('Line Helper', () => {
    it('should return null if no date', () => {
        expect(getLineValue()).toBeNull();
    });
    it('should return null if date isNaN', () => {
        expect(getLineValue(dayjs(''))).toBeNull();
    });
    it('should return a number if date exists', () => {
        expect(getLineValue(goodDates._startDate, [goodDates._startDate.subtract(7, 'd'), goodDates._startDate.add(7, 'd')])).toBe(goodDates._startDate.valueOf());
    });
    it('should return null when date is less than domain', () => {
        expect(getLineValue(3, [10, 20])).toBeNull();
    });
    it('should return null when date is greater than domain', () => {
        expect(getLineValue(25, [10, 20])).toBeNull();
    });
});

describe(' Filtered and Sorted Lines First To Last', () => {
    const lines = [3, null, 2];
    it('should sort and filter lines', () => {
        expect(filteredAndSortedLinesFirstToLast(lines)).toEqual([2, 3]);
    });
});

describe('Date Matching First Line Value', () => {
    it('should match today line date', () => {
        const lines = [
            goodDates._startDate.valueOf(), 
            goodDates._endDate.valueOf(),
            goodDates._potentialEndDate.valueOf()
        ];
        expect(dateMatchingFirstLineValue(lines, goodDates, goodDates._startDate.valueOf(), goodDates._endDate).valueOf())
            .toEqual(goodDates._startDate.valueOf());
    });
    it('should match end line date', () => {
        const lines = [
            null, 
            goodDates._endDate.valueOf(),
            goodDates._potentialEndDate.valueOf()
        ];
        expect(dateMatchingFirstLineValue(lines, goodDates, goodDates._startDate.valueOf(), goodDates._endDate.valueOf()).valueOf())
            .toEqual(goodDates._endDate.valueOf());
    });
});

describe('Should Extend Area Path Y Value Change', () => {
  // transactions, areaPathExtensionToTodayLine
    it('should return false when transactions <= 1', () => {
        expect(shouldExtendAreaPathWhenLastDataPointYValueChange([], '')).toEqual(false);
    });
    it('should return false when the last transaction running total does not change', () => {
        const transactions = [
            {
                running_obligation_total: 1
            },
            {
                running_obligation_total: 1
            }
        ];
        expect(shouldExtendAreaPathWhenLastDataPointYValueChange(transactions, '')).toEqual(false);
    });
    it('should return false when we extend to the today line', () => {
        const transactions = [
            {
                running_obligation_total: 1
            },
            {
                running_obligation_total: 2
            }
        ];
        expect(shouldExtendAreaPathWhenLastDataPointYValueChange(transactions, 2345)).toEqual(false);
    });
    it('should return true when all criteria is met', () => {
        const transactions = [
            {
                running_obligation_total: 1
            },
            {
                running_obligation_total: 2
            }
        ];
        expect(shouldExtendAreaPathWhenLastDataPointYValueChange(transactions, null)).toEqual(true);
    });
});

describe('Create Stepped Area Path', () => {
    it('should create a stepped area path', () => {
        const transactions = [
            {
                running_obligation_total: 1000,
                action_date: goodDates._startDate
            },
            {
                running_obligation_total: 2000,
                action_date: goodDates._endDate
            },
            {
                running_obligation_total: 3000,
                action_date: goodDates._potentialEndDate
            }
        ];
        const xScale = scaleLinear(
            [transactions[0].action_date, transactions[2].action_date],
            [0, 300]
        );
        const yScale = scaleLinear(
            [transactions[0].running_obligation_total, transactions[2].running_obligation_total],
            [0, 400]
        );
        
        const path = createSteppedAreaPath(
            mockTransactions,
            xScale, // d3 linear scale
            yScale, // d3 linear scale
            400, // height of the graph
            { left: 45 }, // horizontal padding for the svg
            'action_date', // x property of the data point must be dayjs object
            'running_obligation_total' // y property of the data point
        );
        const steppedPath = path.split('').reduce((acc, char) => {
            if (char === 'M' || char === 'H' || char === 'V' || char === 'Z') acc.push(char);
            return acc;
        }, []);
        expect(steppedPath).toEqual(['M', 'V', 'H', 'V', 'H', 'V', 'H', 'V', 'Z']);
    });
});
