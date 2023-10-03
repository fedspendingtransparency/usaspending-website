/**
 * @jest-environment jsdom
 * 
 * BaseContract-test.js
 * Created by David Trinh 10/10/18
 */

import BaseContract from 'models/v2/award/BaseContract';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/v2/award/BaseAwardRecipient";
import BaseParentAwardDetails from 'models/v2/award/BaseParentAwardDetails';
import CoreAwardAgency from "models/v2/award/CoreAwardAgency";
import BaseContractAdditionalDetails from "models/v2/award/additionalDetails/BaseContractAdditionalDetails";
import CorePeriodOfPerformance from 'models/v2/award/CorePeriodOfPerformance';
import CoreExecutiveDetails from 'models/v2/award/CoreExecutiveDetails';

import { mockContract } from './mockAwardApi';

const contract = Object.create(BaseContract);
contract.populate(mockContract);

describe('BaseContract', () => {
    describe('agencies', () => {
        it('should only populate an awarding/funding agency if it is available in the API response', () => {
            const emptyAgency = Object.create(CoreAwardAgency);
            expect(contract.awardingAgency).not.toEqual(emptyAgency);
            expect(contract.fundingAgency).toEqual(emptyAgency);
        });
        it('should format toptier and subtier names', () => {
            expect(Object.getPrototypeOf(contract.awardingAgency)).toEqual(CoreAwardAgency);
        });
    });
    describe('Place of Performance', () => {
        it('should be an object with CoreLocation in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.placeOfPerformance)).toEqual(CoreLocation);
        });
    });
    describe('Period of Performance', () => {
        it('should be an object with CorePeriodOfPerformance in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.periodOfPerformance)).toEqual(CorePeriodOfPerformance);
        });
    });
    describe('Recipient', () => {
        it('should be an object with BaseAwardRecipient in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.recipient)).toEqual(BaseAwardRecipient);
        });
    });
    describe('Additional Details', () => {
        it('should be an object with BaseContractAdditionalDetails in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.additionalDetails)).toEqual(BaseContractAdditionalDetails);
        });
    });
    describe('Executive Details', () => {
        it('should be an object with CoreExecutiveDetails in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.executiveDetails)).toEqual(CoreExecutiveDetails);
        });
    });
    it(' should create a parent award details property', () => {
        expect(Object.getPrototypeOf(contract.parentAwardDetails)).toEqual(BaseParentAwardDetails);
    });
});
