/**
 * Created by Jonathan Hill 03/26/20
 */

import moment from 'moment';
import { cloneDeep } from 'lodash';
import { isBadData } from 'helpers/contractGrantActivityHelper';
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
        describe('Grant', () => {
            // 3
            it('should return true when no transactions have dates', () => {
                expect(isBadData(goodDates, 'grant', noTransactionDates)).toBe(true);
            });
            // 3
            it('should return true when there is no start date and end date exists and only one transaction', () => {
                expect(isBadData(badStartDate, 'grant', oneTransaction)).toBe(true);
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
});

// Cases for Bad Data and the X Domain

// 1.	Given we have any PoP end date exists, the last PoP date used for the end of the x domain.
//    a.	If the last transaction action date > the end date.
//        i.	We will use the last transaction action date and the end of the x domain.
// 2.	Given we have a PoP start date.
//    a.	If the first transaction action date is < the start date.
//        i.	We will use the first transaction action date as the start of the x domain.
// 3.	No PoP start and end date and only one transaction, or no transactions have dates.
//    a.	Display data is not suitable for charting message.
// 4.	No PoP start date, do have a PoP end date and only one transaction.
//    a.	Draw chart as normal, with no start date line.
//    b.	If transaction action_date > end date, Display data is not suitable for charting message.
// 5.	No PoP end date, do have a PoP start date and only one transaction
//    a.	Draw chart as normal, but no end date line.
//    b.	If transaction action_date < start date, Display data is not suitable for charting message.
// 6.	No PoP start and PoP end date when we have transaction data.
//    a.	We will use the transaction data start and end dates (meaning action date for earliest transaction (based on action_date) and latest (same)) and will not show the start and end lines.
// 7.	No PoP start date when we have a PoP end date.
//    a.	We will use the first transaction date as the start and will not show the start line and we will show the end date line.
// 8.	No PoP end date (for grants) and No PoP current or potential end date (for contracts ) when we have the start date.
//    a.	We will use the last transaction date as the end and will not show the end line and we will show the start line.
// 9.	No PoP potential end date but there is a current end date (for contracts ).
//    a.	We will use the current end date as the end and will not show the potential end date line and will show the start line.
// 10.	The PoP start date is less than the first transaction date.
//    a.	Draw the chart normally—meaning beginning at the start date in this case.
// 11.	The PoP start date is greater than the first transaction date.
//    a.	We will use the first transaction date for the start and show the start date line.
// 12.	The PoP end date is less than the last transaction.
//    a.	We will use the last transaction date for the end and will show the end date line.
// 13.	If a date line’s underlying data is absent. Or the “potential award amount” data is not present
//    a.	We will not show any start/end/current/potential date line or ‘potential award amount’ line without underlying data to support it.
// 14.	No transaction data when we have a start and end date.
//    a.	No situation where we don’t have transaction data
