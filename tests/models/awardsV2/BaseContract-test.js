/**
 * BaseContract-test.js
 * Created by David Trinh 10/10/18
 */

import BaseContract from 'models/v2/awardsV2/BaseContract';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/v2/awardsV2/BaseAwardRecipient";
import CoreAwardAgency from "models/v2/awardsV2/CoreAwardAgency";
import BaseContractAdditionalDetails from "models/v2/awardsV2/additionalDetails/BaseContractAdditionalDetails";
import CorePeriodOfPerformance from 'models/v2/awardsV2/CorePeriodOfPerformance';
import CoreExecutiveDetails from 'models/v2/awardsV2/CoreExecutiveDetails';

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
                    ...mockContract,
                    psc_hierarchy: {
                        toptier_code: {
                            code: pscCode,
                            description: ''
                        }
                    }
                };
                contract.populate(mockData);
                expect(contract.psc.toptier_code.description).toEqual(result);
            }
        );
    });
});
