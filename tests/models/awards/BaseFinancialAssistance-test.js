/**
 * BaseFinancialAssistance-test.js
 * Created by Lizzie Salita 3/13/18
 */

import BaseFinancialAssistance from 'models/v2/awards/BaseFinancialAssistance';

const mockApi = {
    category: 'loans',
    total_subsidy_cost: '1045.62',
    awarding_agency: {
        toptier_agency: {
            name: 'Department of Sandwiches'
        },
        subtier_agency: {
            name: 'Department of Subs'
        }
    },
    latest_transaction: {
        assistance_data: {
            awarding_office_code: '01',
            cfda_number: '789',
            cfda_title: 'Mock CFDA Title',
            face_value_loan_guarantee: '1023.4'
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
        location: {
            address_line1: '602 Trumball Street',
            address_line2: 'Apt 2',
            city_name: 'Pawnee',
            state_code: 'IN',
            zip5: '12345'
        }
    }
};

const loan = Object.create(BaseFinancialAssistance);
loan.populate(mockApi);

describe('Base Financial Assistance', () => {
    describe('monetary values', () => {
        it('should format the loan face value', () => {
            expect(loan.faceValue).toEqual('$1,023');
        });
        it('should format the subsidy amount', () => {
            expect(loan.subsidy).toEqual('$1,046');
        });
    });
    describe('cfdaProgram', () => {
       it('should format the CFDA fields', () => {
          expect(loan.cfdaProgram).toEqual('789 - Mock CFDA Title');
       });
    });
    describe('agencies', () => {
        it('should only create an awarding/funding agency if it is available in the API response', () => {
            expect(loan.awardingAgency).toBeTruthy();
            expect(loan.fundingAgency).toBeFalsy();
        });
        it('should format toptier and subtier names', () => {
            expect(loan.awardingAgency.name).toEqual('Department of Sandwiches');
            expect(loan.awardingAgency.subtierName).toEqual('Department of Subs');
            expect(loan.awardingAgency.officeName).toEqual('01');
        });
    });
    describe('Place of Performance', () => {
        it('should format the regional address', () => {
            expect(loan.placeOfPerformance.regionalAddress).toEqual('Pawnee, IN 12345');
        });
        it('should format the full address', () => {
            expect(loan.placeOfPerformance.fullAddress).toEqual('Pawnee, IN 12345\nCongressional District: IN-04')
        });
    });
    describe('Recipient', () => {
        it('should create a BaseAwardRecipient object with the recipient data', () => {
            expect(loan.recipient.duns).toEqual('ABC123');
            expect(loan.recipient.internalId).toEqual('11111');
        });
    });
});
