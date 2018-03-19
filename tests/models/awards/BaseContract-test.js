/**
 * BaseContract-test.js
 * Created by Lizzie Salita 3/12/18
 */

import BaseContract from 'models/v2/awards/BaseContract';
import CoreLocation from "models/v2/CoreLocation";

const mockApi = {
    category: 'contract',
    base_and_all_options_value: 1023.75,
    total_obligation: 1023.1,
    awarding_agency: {
        toptier_agency: {
            name: 'Department of Sandwiches'
        },
        subtier_agency: {
            name: 'Department of Subs'
        }
    },
    latest_transaction: {
        contract_data: {
            idv_type: 'mock idv type',
            contract_award_type_desc: 'mock contract type',
            awarding_office_name: 'Office of Cheesesteak',
            product_or_service_code: 'psc',
            product_or_service_co_desc: 'product/service description',
            naics: 'naics',
            naics_description: null,
            clinger_cohen_act_planning: null
        }
    },
    place_of_performance: {
        city_name: 'Pawnee',
        county_name: 'Wamapoke',
        state_code: 'IN',
        state: 'Indiana',
        zip5: '12345',
        congressional_code: '04'
    },
    recipient: {
        legal_entity_id: '11111',
        recipient_name: 'Entertainment 720',
        recipient_unique_id: 'ABC123',
        business_types_description: null,
        nonprofit_organization: true,
        minority_owned_business: true,
        location: {
            address_line1: '602 Trumball Street',
            address_line2: 'Apt 2',
            city_name: 'Pawnee',
            state_code: 'IN',
            zip5: '12345'
        },
        officers: {
            officer_1_name: 'George Washington',
            officer_1_amount: '9000.00',
            officer_2_name: 'John Adams',
            officer_2_amount: '7000.99',
            officer_3_name: 'Thomas Jefferson',
            officer_3_amount: '6000.01',
            officer_4_name: 'James Madison',
            officer_4_amount: '5000.00'
        }
    }
};

const contract = Object.create(BaseContract);
contract.populate(mockApi);

describe('BaseContract', () => {
    describe('monetary values', () => {
        it('should format the contract amount', () => {
            expect(contract.amount).toEqual('$1,024');
        });
        it('should format the obligated amount', () => {
            expect(contract.obligation).toEqual('$1,023');
        });
    });
    describe('awardType', () => {
        it('should return the idv type for the idv category', () => {
            const mockIdv = Object.assign({}, mockApi, {
                category: null
            });
            const idv = Object.create(BaseContract);
            idv.populate(mockIdv);

            expect(idv.awardType).toEqual('mock idv type');
        });
        it('should return the contract type otherwise', () => {
            expect(contract.awardType).toEqual('mock contract type');
        });
    });
    describe('agencies', () => {
        it('should only create an awarding/funding agency if it is available in the API response', () => {
            expect(contract.awardingAgency).toBeTruthy();
            expect(contract.fundingAgency).toBeFalsy();
        });
        it('should format toptier and subtier names', () => {
            expect(contract.awardingAgency.name).toEqual('Department of Sandwiches');
            expect(contract.awardingAgency.subtierName).toEqual('Department of Subs');
            expect(contract.awardingAgency.officeName).toEqual('Office of Cheesesteak');
        });
    });
    describe('Place of Performance', () => {
        it('should be an object with CoreLocation in its prototype chain', () => {
            const locationObject = Object.create(CoreLocation);

            expect(Object.getPrototypeOf(locationObject)).toEqual(Object.getPrototypeOf(contract.placeOfPerformance));
        });
    });
    describe('Recipient', () => {
        it('should parse the business categories', () => {
            expect(contract.recipient.businessTypes).toEqual([
                'Minority Owned Business',
                'Nonprofit Organization'
            ]);
        });
        it('should parse executive compensation', () => {
            expect(contract.recipient.officers).toEqual({
                officer1: 'George Washington - $9,000',
                officer2: 'John Adams - $7,001',
                officer3: 'Thomas Jefferson - $6,000',
                officer4: 'James Madison - $5,000',
                officer5: '--'
            });
        });
        it('should have a location property with CoreLocation in its prototype chain', () => {
            const locationObject = Object.create(CoreLocation);

            expect(Object.getPrototypeOf(locationObject)).toEqual(Object.getPrototypeOf(contract.recipient.location));
        });
    });
    describe('Additional Details', () => {
        it('should create an additional details property when contract data is available', () => {
            expect(contract.additionalDetails).toBeTruthy();
        });
        it('should format psc code', () => {
            expect(contract.additionalDetails.pscCode).toEqual('psc: product/service description');
        });
        it('should format naics code', () => {
            expect(contract.additionalDetails.naicsCode).toEqual('naics');
        });
        it('should return -- for null values', () => {
            expect(contract.additionalDetails.clingerCohenAct).toEqual('--');
        });
    });
});
