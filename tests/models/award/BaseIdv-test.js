/**
 * @jest-environment jsdom
 * 
 * BaseIdv-test.js
 * Created by Lizzie Salita 12/4/18
 */

import BaseIdv from 'models/v2/award/BaseIdv';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/v2/award/BaseAwardRecipient";
import CoreAwardAgency from "models/v2/award/CoreAwardAgency";
import BaseContractAdditionalDetails from "models/v2/award/additionalDetails/BaseContractAdditionalDetails";
import CoreExecutiveDetails from 'models/v2/award/CoreExecutiveDetails';
import BaseParentAwardDetails from 'models/v2/award/BaseParentAwardDetails';

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
    describe('Deducing the PSC Type based on the PSC Top Tier Code from the API', () => {
        it.each([
            ['PRODUCTS', '4'],
            ['RESEARCH AND DEVELOPMENT', 'A'],
            ['SERVICES', 'B'],
            ['PRODUCTS', undefined]
        ])(
            ('psc.toptier_code.description should be %s when %s is the psc.toptier_code.code'),
            (result, pscCode) => {
                const mockData = {
                    ...mockIdv,
                    psc_hierarchy: {
                        toptier_code: {
                            code: pscCode,
                            description: ''
                        }
                    }
                };
                contract.populate(mockData);
                expect(contract.psc.pscType.description).toEqual(result);
            }
        );
    });
});
