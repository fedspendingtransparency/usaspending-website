/**
 * BaseFinancialAssistance-test.js
 * Created by Lizzie Salita 3/13/18
 */

import BaseFinancialAssistance from 'models/award/BaseFinancialAssistance';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/award/BaseAwardRecipient";
import CoreAwardAgency from "models/award/CoreAwardAgency";

import { mockLoanApi } from './mockAwardApi';

const loan = Object.create(BaseFinancialAssistance);
loan.populate(mockLoanApi);

describe('Base Financial Assistance', () => {
    describe('monetary values', () => {
        it('should format the loan face value', () => {
            expect(loan.faceValue).toEqual('$1,023');
        });
        it('should format the subsidy amount', () => {
            expect(loan.subsidy).toEqual('$1,006');
        });
    });
    describe('cfdaProgram', () => {
        it('should format the CFDA fields', () => {
            expect(loan.cfdaProgram).toEqual('789 - Mock CFDA Title');
        });
    });
    describe('agencies', () => {
        it('should only create an awarding/funding agency if it is available in the API response', () => {
            const emptyAgency = Object.create(CoreAwardAgency);
            expect(loan.awardingAgency).not.toEqual(emptyAgency);
            expect(loan.fundingAgency).toEqual(emptyAgency);
        });
        it('should be an object with CoreAwardAgency in its prototype chain', () => {
            expect(Object.getPrototypeOf(loan.awardingAgency)).toEqual(CoreAwardAgency);
        });
    });
    describe('Place of Performance', () => {
        it('should be an object with CoreLocation in its prototype chain', () => {
            expect(Object.getPrototypeOf(loan.placeOfPerformance)).toEqual(CoreLocation);
        });
    });
    describe('Recipient', () => {
        it('should be an object with BaseAwardRecipient in its prototype chain', () => {
            expect(Object.getPrototypeOf(loan.recipient)).toEqual(BaseAwardRecipient);
        });
    });
});
