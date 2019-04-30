/**
 * FederalAccountSummary-test.js
 * Created by Jonathan Hill 4/29/19
 */


import FederalAccountSummary from 'models/v2/awardsV2/FederalAccountSummary';
import { mockAwardFederalAccounts } from './mockAwardApi';

const account = mockAwardFederalAccounts.results[0];
const federalAccountSummary = Object.create(FederalAccountSummary);
federalAccountSummary.populate(account, 5000000);

describe('FederalAccountSummary Model', () => {
    it('should have private field federalAccountName', () => {
        expect(federalAccountSummary._federalAccountName).toEqual(account.account_title);
    });
    it('should have private field obligatedAmount', () => {
        expect(federalAccountSummary._obligatedAmount)
            .toEqual(account.total_transaction_obligated_amount);
    });
    it('should have field federalAccount', () => {
        expect(federalAccountSummary.federalAccount).toEqual(account.federal_account);
    });
    it('should have a field obligateAmount', () => {
        expect(federalAccountSummary.obligatedAmount).toEqual('$5,633');
    });
    describe('FederalAccountSummary Model federalAccountName', () => {
        // Test three scenarios
        // 1. name is < 34 chars
        it('should have a field percent', () => {
            account.account_title = 'Jimmy Timmy';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.federalAccountName).toEqual('JIMMY TIMMY');
        });
        // 2. name is 34 chars
        it('should have a field percent', () => {
            account.account_title = 'JimmyTimmyJimmyTimmyJimmyTimmy1';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.federalAccountName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY1');
        });
        // 3. name is > 34 chars
        it('should have a field percent', () => {
            account.account_title = 'JimmyTimmyJimmyTimmyJimmyTimmy1111JimmyTimmyJimmyTimmy';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.federalAccountName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY1...');
        });
    });
    describe('FederalAccountSummary Model Percents', () => {
        // Test all three scenarios
        // 1. Normal Percent 50%
        it('should have a field percent', () => {
            account.total_transaction_obligated_amount = 4000000;
            federalAccountSummary.populate(account, 5000000);
            expect(federalAccountSummary.percent).toEqual('80%');
        });
        // 2. Decimal Percent 0.04%
        it('should have a field percent', () => {
            account.total_transaction_obligated_amount = 2000;
            federalAccountSummary.populate(account, 5000000);
            expect(federalAccountSummary.percent).toEqual('0.04%');
        });
        // 3. Decimal Percent `Less than 0.01%`
        it('should have a field percent', () => {
            account.total_transaction_obligated_amount = 100;
            federalAccountSummary.populate(account, 5000000);
            expect(federalAccountSummary.percent).toEqual('Less than 0.01%');
        });
    });
});
