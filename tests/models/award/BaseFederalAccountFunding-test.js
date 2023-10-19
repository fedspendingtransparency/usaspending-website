/**
 * @jest-environment jsdom
 * 
 * BaseFederalAccountFunding-test.js
 * Created by Kwadwo 04/04/19
 */

import BaseFederalAccount from 'models/v2/award/BaseFederalAccountFunding';
import { mockFederalAccountFunding } from './mockAwardApi';

import { decodedAwardId, encodedAwardId } from "../../mockData";

const row = Object.create(BaseFederalAccount);
row.populate(mockFederalAccountFunding.results[0], "idv");

describe('Base Financial Assistance', () => {
    describe('generatedId', () => {
        it('generatedId should be encoded or empty string', () => {
            const rowWithNoId = Object.create(BaseFederalAccount);
            rowWithNoId.populate({ ...mockFederalAccountFunding, generated_unique_award_id: null }, 'idv');
            expect(rowWithNoId.generatedId).toEqual('');

            const rowWithId = Object.create(BaseFederalAccount);
            rowWithId.populate({ ...mockFederalAccountFunding.results[0], generated_unique_award_id: decodedAwardId }, "idv");
            expect(rowWithId.generatedId).toEqual(encodedAwardId);
        });
    });
    describe('Submission Date', () => {
        it('should format the submission date', () => {
            expect(row.submissionDate).toEqual('FY 2018 Q2');
        });
        const newData = mockFederalAccountFunding.results[0];
        newData.is_quarterly_submission = false;
        const newRow = Object.create(BaseFederalAccount);
        newRow.populate(newData, 'idv');
        it('should format the submission period', () => {
            expect(newRow.submissionDate).toEqual('FY 2018 P01/P02');
        });
    });
    describe('Funding Obligated Amount', () => {
        it('should format the funding obligated amount', () => {
            expect(row.fundingObligated).toEqual('$9,469');
        });
        it('should format the funding obligated amount to -- only when when NaN', () => {
            const rowWithNull = Object.create(BaseFederalAccount);
            rowWithNull.populate({
                ...mockFederalAccountFunding.results[0],
                transaction_obligated_amount: null
            }, "idv");
            expect(rowWithNull.fundingObligated).toEqual('--');

            const rowWithZero = Object.create(BaseFederalAccount);
            rowWithZero.populate({
                ...mockFederalAccountFunding.results[0],
                transaction_obligated_amount: 0
            }, "idv");
            expect(rowWithZero.fundingObligated).toEqual('$0');
        });
    });
    describe('Object Class', () => {
        it('should format the object class', () => {
            expect(row.objectClass).toEqual('111 - Research Bread Types');
        });
    });
    describe('Program Activity', () => {
        it('should format the program activity', () => {
            expect(row.programActivity).toEqual('1111 - Sandwich Logistics');
        });
    });
    describe('Account Number', () => {
        it('should format the account number using the agency id and main account code', () => {
            expect(row.accountNumber).toEqual('091-1901');
        });
        it('should format account number for nonIdvs as well', () => {
            const nonIdv = Object.create(BaseFederalAccount);
            nonIdv.populate({ federal_account: "123-456", ...mockFederalAccountFunding.results[0] }, "contract");
            expect(nonIdv.federalAccountCode).toEqual('123-456');
        });
    });
    describe('disasterEmergencyFundCode', () => {
        it('should return -- when it does not exist', () => {
            const fakeRow = Object.create(BaseFederalAccount);
            const fakeData = { ...mockFederalAccountFunding.results[0] };
            fakeData.disaster_emergency_fund_code = null;
            fakeRow.populate(fakeData);
            expect(fakeRow.disasterEmergencyFundCode).toEqual('--');
        });
    });
    describe('grossOutlayAmount', () => {
        it('should format the account number using the agency id and main account code', () => {
            const fakeRow = Object.create(BaseFederalAccount);
            fakeRow.populate(mockFederalAccountFunding.results[0]);
            expect(fakeRow.grossOutlayAmount).toEqual('$111');
        });
    });
});
