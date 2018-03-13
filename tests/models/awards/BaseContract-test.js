/**
 * BaseContract-test.js
 * Created by Lizzie Salita 3/12/18
 */

import BaseContract from 'models/v2/awards/BaseContract';

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
            awarding_office_name: '',
            awarding_office_code: '01'
        }
    }
};

const contract = Object.create(BaseContract);
contract.populate(mockApi);

describe('Base Contract getter functions', () => {
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
       });
       it('should use the office code if office name is not available', () => {
           expect(contract.awardingAgency.officeName).toEqual('01');
       });
    });
});
