/**
 * Created by Jonathan Hill 03/26/20
 */

import moment from 'moment';
import { cloneDeep } from 'lodash';
import {
    isBadData,
    getXDomain,
    beforeDate,
    afterDate,
    lineHelper
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

describe('Contract Grant Activity Helper', () => {
    describe('Is Bad Data', () => {
        it('should return true if any running total is negative', () => {
            const negativeTransactions = cloneDeep(mockTransactions).map((t, i) => {
                const data = t;
                data.running_obligation_total = -(i + 1);
                return data;
            });
            expect(isBadData(goodDates, 'contract', negativeTransactions)).toBe(true);
        });
        it('should return true if all transaction do not have a date', () => {
            const noDates = cloneDeep(mockTransactions).map((x) => {
                const data = cloneDeep(x);
                data.action_date = moment(null);
                return data;
            });
            expect(isBadData(goodDates, 'grant', noDates)).toBe(true);
        });
        describe('Grant', () => {
            // 3
            it('should return true when no transactions have dates', () => {
                expect(isBadData(goodDates, 'grant', noTransactionDates)).toBe(true);
            });
            // 3
            it('should return true when there is no start date and end date exists and only one transaction', () => {
                const data = cloneDeep(badStartDate);
                data._endDate = moment('05/25/2011', 'MM/DD/YYYY'); 
                expect(isBadData(data, 'grant', oneTransaction)).toBe(true);
            });
            // 4.b
            it('should return true when there is no start date and end date exists and only one transaction and transaction date is > than end date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = moment('05/25/2014', 'MM/DD/YYYY');
                expect(isBadData(badStartDate, 'grant', newTransaction)).toBe(true);
            });
            // 5/b
            it('should return true when there is no end date and start date exists and only one transaction and transaction date is < than start date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = moment('05/25/2009', 'MM/DD/YYYY');
                expect(isBadData(badEndDate, 'grant', newTransaction)).toBe(true);
            });
        });
        describe('Contract', () => {
            // 3
            it('should return true when no transactions have dates', () => {
                expect(isBadData(goodDates, 'contract', noTransactionDates)).toBe(true);
            });
            // 3
            it('should return true when no dates and one transaction', () => {
                expect(isBadData(badDates, 'contract', oneTransaction)).toBe(true);
            });
            // 4.b
            it('should return true when there is no start date and potential end date exists and only one transaction and transaction date is > than potential end date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = moment('05/25/2019', 'MM/DD/YYYY');
                const newDates = cloneDeep(badStartDate);
                newDates._endDate = badEndDate._endDate;
                expect(isBadData(newDates, 'contract', newTransaction)).toBe(true);
            });
            // 4.b
            it('should return true when there is no start date and current end date exists and only one transaction and transaction date is > than current end date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = moment('05/25/2014', 'MM/DD/YYYY');
                const newDates = cloneDeep(badStartDate);
                newDates._potentialEndDate = badPotentialEndDate._potentialEndDate;
                expect(isBadData(newDates, 'contract', newTransaction)).toBe(true);
            });
            // 5.b
            it('should return true when there is no end date and start date exists and only one transaction and transaction date is < than start date', () => {
                const newTransaction = cloneDeep(oneTransaction);
                newTransaction[0].action_date = moment('05/25/2009', 'MM/DD/YYYY');
                expect(isBadData(badEndDates, 'contract', newTransaction)).toBe(true);
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
                    theDates._endDate = moment('05/25/2020', 'MM/DD/YYYY');
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
                    theDates._potentialEndDate = moment(null);
                    const domain = getXDomain(theDates, 'contract', oneTransaction);
                    expect(domain[0]).toBe(oneTransactionDate);
                    expect(domain[1]).toBe(theDates._endDate.valueOf());
                });
                it('should return dates as domain when good dates', () => {
                    const theDates = cloneDeep(goodDates);
                    theDates._potentialEndDate = moment('05/25/2020', 'MM/DD/YYYY');
                    const domain = getXDomain(goodDates, 'contract', oneTransaction);
                    expect(domain[0]).toBe(goodDates._startDate.valueOf());
                    expect(domain[1]).toBe(goodDates._potentialEndDate.valueOf());
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
                theDates._potentialEndDate = moment(null);
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
        expect(lineHelper()).toBeNull();
    });
    it('should return null if date isNaN', () => {
        expect(lineHelper(moment(''))).toBeNull();
    });
    it('should return a number if date exists', () => {
        expect(lineHelper(goodDates._startDate)).toBe(goodDates._startDate.valueOf());
    });
});
