/**
 * BaseFederalAccountFunding-test.js
 * Created by Kwadwo 04/04/19
 */

import BaseFederalAccount from 'models/v2/awardsV2/BaseFederalAccountFunding';
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
    });
    describe('Funding Obligated Amount', () => {
        it('should format the funding obligated amount', () => {
            expect(row.fundingObligated).toEqual('$9,469');
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
});
