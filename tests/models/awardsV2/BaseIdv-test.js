/**
 * BaseIdv-test.js
 * Created by Lizzie Salita 12/4/18
 */

import BaseIdv from 'models/award//BaseIdv';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/award//BaseAwardRecipient";
import CoreAwardAgency from "models/award//CoreAwardAgency";
import BaseContractAdditionalDetails from "models/award//additionalDetails/BaseContractAdditionalDetails";
import CoreExecutiveDetails from 'models/award//CoreExecutiveDetails';
import BaseParentAwardDetails from 'models/award//BaseParentAwardDetails';

import { mockIdv } from './mockAwardApi';

const contract = Object.create(BaseIdv);
contract.populate(mockIdv);

describe('BaseIdv', () => {
    describe('agency', () => {
        it('should format toptier and subtier names', () => {
            expect(Object.getPrototypeOf(contract.awardingAgency)).toEqual(CoreAwardAgency);
            expect(Object.getPrototypeOf(contract.fundingAgency)).toEqual(CoreAwardAgency);
        });
    });
    describe('Place of Performance', () => {
        it('should be an object with CoreLocation in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.placeOfPerformance)).toEqual(CoreLocation);
        });
    });
    describe('Parent Award Details', () => {
        it('should be an object with parentAwardDetails in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.parentAwardDetails)).toEqual(BaseParentAwardDetails);
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
});
