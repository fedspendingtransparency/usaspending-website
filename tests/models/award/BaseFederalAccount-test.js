/**
 * @jest-environment jsdom
 * 
 * BaseFederalAccount-test.js
 * Created by Jonathan Hill 4/29/19
 */


import BaseFederalAccount from 'models/v2/award/BaseFederalAccount';
import { mockAwardFederalAccounts } from './mockAwardApi';

const account = mockAwardFederalAccounts.results[0];
let federalAccount = new BaseFederalAccount(account, 271716259.64);

describe('BaseFederalAccount Model', () => {
    it('should have field _federalAccountName', () => {
        expect(federalAccount._federalAccountName).toEqual(account.account_title);
    });
    it('should have field _obligatedAmount', () => {
        expect(federalAccount._obligatedAmount)
            .toEqual(account.total_transaction_obligated_amount);
    });
    it('should have field _federalAccount', () => {
        expect(federalAccount.federalAccount).toEqual(account.federal_account);
    });
    it('should have field _percent', () => {
        expect(federalAccount._percent)
            .toEqual((account.total_transaction_obligated_amount / 271716259.64) * 100);
    });
    it('should have field _fundingAgencyName', () => {
        expect(federalAccount._fundingAgencyName)
            .toEqual(account.funding_agency_name);
    });
    it('should have field _fundingAgencyAbbreviation', () => {
        expect(federalAccount._fundingAgencyAbbreviation)
            .toEqual(account.funding_agency_abbreviation);
    });
    it('should have field _fundingAgencyId', () => {
        expect(federalAccount._fundingAgencyId)
            .toEqual(account.funding_agency_id);
    });
    it('should have a field _total', () => {
        expect(federalAccount._total).toEqual(271716259.64);
    });
    it('should have a field obligatedAmount', () => {
        expect(federalAccount.obligatedAmount).toEqual("$42,029,540");
    });
    describe('BaseFederalAccount Model federalAccountName', () => {
        // Test three scenarios
        // 1. name is < 34 chars
        it('should format federalAccountName < 36 characters properly', () => {
            account.account_title = 'Jimmy Timmy';
            federalAccount = new BaseFederalAccount(account, 100);
            expect(federalAccount.federalAccountName).toEqual('JIMMY TIMMY');
        });
        // 2. name is 34 chars
        it('should format federalAccountName = 36 characters properly', () => {
            account.account_title = 'JimmyTimmyJimmyTimmyJimmyTimmy111111';
            federalAccount = new BaseFederalAccount(account, 100);
            expect(federalAccount.federalAccountName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY111111');
        });
        // 3. name is > 34 chars
        it('should format federalAccountName > 36 characters properly', () => {
            account.account_title = 'JimmyTimmyJimmyTimmyJimmyTimmy1111JimmyTimmyJimmyTimmy';
            federalAccount = new BaseFederalAccount(account, 100);
            expect(federalAccount.federalAccountName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY1111JI...');
        });
    });
    describe('BaseFederalAccount Model Percents', () => {
        // Test all three scenarios
        // 1. Normal Percent 50%
        it('should format a normal percent properly', () => {
            account.total_transaction_obligated_amount = 4000000;
            federalAccount = new BaseFederalAccount(account, 5000000);
            expect(federalAccount.percent).toEqual('80%');
        });
        // 2. Decimal Percent 0.04%
        it('should format a percent < 1 properly', () => {
            account.total_transaction_obligated_amount = 2000;
            federalAccount = new BaseFederalAccount(account, 5000000);
            expect(federalAccount.percent).toEqual('0.04%');
        });
        // 3. Decimal Percent `Less than 0.01%`
        it('should format a percent < 0.01 properly', () => {
            account.total_transaction_obligated_amount = 100;
            federalAccount = new BaseFederalAccount(account, 5000000);
            expect(federalAccount.percent).toEqual('Less than 0.01%');
        });
        // 4. Percentage is Zero
        it('should format a negative percent', () => {
            account.total_transaction_obligated_amount = 0;
            federalAccount = new BaseFederalAccount(account, 5000000);
            expect(federalAccount.percent).toEqual('0%');
        });
        // 5. Percentage is Negative
        it('should format a negative percent', () => {
            account.total_transaction_obligated_amount = -100;
            federalAccount = new BaseFederalAccount(account, 5000000);
            expect(federalAccount.percent).toEqual('N/A');
        });
    });
    describe('BaseFederalAccount Model fundingAgencyName', () => {
        // Test three scenarios
        // 1. name is < 34 chars
        it('should format fundingAgencyName < 36 characters properly', () => {
            account.funding_agency_name = 'Jimmy Timmy';
            federalAccount = new BaseFederalAccount(account, 100);
            expect(federalAccount.fundingAgencyName).toEqual('JIMMY TIMMY');
        });
        // 2. name is 34 chars
        it('should format fundingAgencyName = 36 characters properly', () => {
            account.funding_agency_name = 'JimmyTimmyJimmyTimmyJimmyTimmy111111';
            federalAccount = new BaseFederalAccount(account, 100);
            expect(federalAccount.fundingAgencyName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY111111');
        });
        // 3. name is > 34 chars
        it('should format fundingAgencyName > 36 characters properly', () => {
            account.funding_agency_name = 'JimmyTimmyJimmyTimmyJimmyTimmy1111JimmyTimmyJimmyTimmy';
            federalAccount = new BaseFederalAccount(account, 100);
            expect(federalAccount.fundingAgencyName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY1111JI...');
        });
    });
});
