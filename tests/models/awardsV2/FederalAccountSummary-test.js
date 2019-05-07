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
    it('should have private field fundingAgencyName', () => {
        expect(federalAccountSummary._fundingAgencyName)
            .toEqual(account.funding_agency_name);
    });
    it('should have private field fundingAgencyAbbreviation', () => {
        expect(federalAccountSummary._fundingAgencyAbbreviation)
            .toEqual(account.funding_agency_abbreviation);
    });
    it('should have private field fundingAgencyAbbreviation', () => {
        expect(federalAccountSummary._fundingAgencyId)
            .toEqual(account.funding_agency_id);
    });
    it('should have field federalAccount', () => {
        expect(federalAccountSummary.federalAccount).toEqual(account.federal_account);
    });
    it('should have a field obligateAmount', () => {
        expect(federalAccountSummary.obligatedAmount).toEqual("$42,029,540");
    });
    describe('FederalAccountSummary Model federalAccountName', () => {
        // Test three scenarios
        // 1. name is < 34 chars
        it('should format federalAccountName < 36 characters properly', () => {
            account.account_title = 'Jimmy Timmy';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.federalAccountName).toEqual('JIMMY TIMMY');
        });
        // 2. name is 34 chars
        it('should format federalAccountName = 36 characters properly', () => {
            account.account_title = 'JimmyTimmyJimmyTimmyJimmyTimmy111111';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.federalAccountName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY111111');
        });
        // 3. name is > 34 chars
        it('should format federalAccountName > 36 characters properly', () => {
            account.account_title = 'JimmyTimmyJimmyTimmyJimmyTimmy1111JimmyTimmyJimmyTimmy';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.federalAccountName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY1111JI...');
        });
    });
    describe('FederalAccountSummary Model Percents', () => {
        // Test all three scenarios
        // 1. Normal Percent 50%
        it('should format a normal percent properly', () => {
            account.total_transaction_obligated_amount = 4000000;
            federalAccountSummary.populate(account, 5000000);
            expect(federalAccountSummary.percent).toEqual('80%');
        });
        // 2. Decimal Percent 0.04%
        it('should format a percent < 1 properly', () => {
            account.total_transaction_obligated_amount = 2000;
            federalAccountSummary.populate(account, 5000000);
            expect(federalAccountSummary.percent).toEqual('0.04%');
        });
        // 3. Decimal Percent `Less than 0.01%`
        it('should format a percent < 0.01 properly', () => {
            account.total_transaction_obligated_amount = 100;
            federalAccountSummary.populate(account, 5000000);
            expect(federalAccountSummary.percent).toEqual('Less than 0.01%');
        });
    });
    describe('FederalAccountSummary Model fundingAgencyName', () => {
        // Test three scenarios
        // 1. name is < 34 chars
        it('should format fundingAgencyName < 36 characters properly', () => {
            account.funding_agency_name = 'Jimmy Timmy';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.fundingAgencyName).toEqual('JIMMY TIMMY');
        });
        // 2. name is 34 chars
        it('should format fundingAgencyName = 36 characters properly', () => {
            account.funding_agency_name = 'JimmyTimmyJimmyTimmyJimmyTimmy111111';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.fundingAgencyName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY111111');
        });
        // 3. name is > 34 chars
        it('should format fundingAgencyName > 36 characters properly', () => {
            account.funding_agency_name = 'JimmyTimmyJimmyTimmyJimmyTimmy1111JimmyTimmyJimmyTimmy';
            federalAccountSummary.populate(account, 100);
            expect(federalAccountSummary.fundingAgencyName).toEqual('JIMMYTIMMYJIMMYTIMMYJIMMYTIMMY1111JI...');
        });
    });
});
