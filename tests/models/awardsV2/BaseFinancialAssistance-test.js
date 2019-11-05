/**
 * BaseFinancialAssistance-test.js
 * Created by David Trinh 10/10/18
 */

import BaseFinancialAssistance, { emptyCfda } from 'models/v2/awardsV2/BaseFinancialAssistance';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/v2/awardsV2/BaseAwardRecipient";
import CoreAwardAgency from "models/v2/awardsV2/CoreAwardAgency";
import CorePeriodOfPerformance from 'models/v2/awardsV2/CorePeriodOfPerformance';

import { mockLoan } from './mockAwardApi';

const loan = Object.create(BaseFinancialAssistance);
loan.populate(mockLoan);

describe('Base Financial Assistance', () => {
    describe('cfdaProgram', () => {
        it('should format the CFDA fields', () => {
            expect(loan.cfdaProgram).toEqual('0.3 - bigger');
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
    describe('Period of Performance', () => {
        it('should be an object with CorePeriodOfPerformance in its prototype chain', () => {
            expect(Object.getPrototypeOf(loan.periodOfPerformance)).toEqual(CorePeriodOfPerformance);
        });
    });
    describe('Recipient', () => {
        it('should be an object with BaseAwardRecipient in its prototype chain', () => {
            expect(Object.getPrototypeOf(loan.recipient)).toEqual(BaseAwardRecipient);
        });
    });

    describe('biggestCfda', () => {
        it('should return the largest CFDA', () => {
            const award = Object.create(BaseFinancialAssistance);
            award.populate(mockLoan);
            expect(award.biggestCfda.cfdaTitle).toEqual('bigger');
        });
        it('should handle an empty array', () => {
            const award = Object.create(BaseFinancialAssistance);
            award.populate({ ...mockLoan, cfda_info: [{}] });
            expect(award.biggestCfda).toEqual(emptyCfda);
        });
    });
});
