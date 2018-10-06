/**
 * BaseFinancialAssistance-test.js
 * Created by Lizzie Salita 3/13/18
 */

import BaseFinancialAssistance from 'models/v2/awards/BaseFinancialAssistance';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/v2/awards/BaseAwardRecipient";
import CoreAwardAgency from "models/v2/awards/CoreAwardAgency";

import { mockLoan } from './mockAwardApi';

const loan = Object.create(BaseFinancialAssistance);
loan.populate(mockLoan);

describe('Base Financial Assistance', () => {
    describe('monetary values', () => {
        it('should format the loan face value', () => {
            expect(loan.faceValue).toEqual('$24,343');
        });
        it('should format the subsidy amount', () => {
            expect(loan.subsidy).toEqual('$123');
        });
    });
    describe('cfdaProgram', () => {
        it('should format the CFDA fields', () => {
            expect(loan.cfdaProgram).toEqual('0.434 - Flood Insurance');
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
