/**
 * @jest-environment jsdom
 * 
 * BaseFundingRollup-test.js
 * Created by Lizzie Salita 8/19/19
 */

import BaseFundingRollup from 'models/v2/award/BaseFundingRollup';
import { mockAwardFundingMetaData } from './mockAwardApi';

const summary = Object.create(BaseFundingRollup);
summary.populate(mockAwardFundingMetaData);

const zeroSummary = Object.create(BaseFundingRollup);
zeroSummary.populate({
    total_transaction_obligated_amount: 0,
    awarding_agency_count: 0,
    funding_agency_count: 0,
    federal_account_count: 0
});

describe('Base Funding Rollup', () => {
    describe('Total Obligated Amount', () => {
        it('should format the total transaction obligated amount', () => {
            expect(summary.obligatedAmount).toEqual('$42,946,881.56');
        });
        it('should default to N/A when the amount is $0', () => {
            expect(zeroSummary.obligatedAmount).toEqual('N/A');
        });
    });
    describe('Awarding Agency Count', () => {
        it('should set the Awarding Agency Count', () => {
            expect(summary.awardingAgencyCount).toEqual(27);
        });
        it('should default to N/A when the count is 0', () => {
            expect(zeroSummary.awardingAgencyCount).toEqual('N/A');
        });
    });
    describe('Funding Agency Count', () => {
        it('should set the Funding Agency Count', () => {
            expect(summary.fundingAgencyCount).toEqual(28);
        });
        it('should default to N/A when the cunt is 0', () => {
            expect(zeroSummary.fundingAgencyCount).toEqual('N/A');
        });
    });
    describe('Federal Account Count', () => {
        it('should set the Federal Account Count', () => {
            expect(summary.federalAccountCount).toEqual(47);
        });
        it('should default to N/A when the count is 0', () => {
            expect(zeroSummary.federalAccountCount).toEqual('N/A');
        });
    });
});
