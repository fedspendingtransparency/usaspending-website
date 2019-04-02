/**
 * BaseContractAdditionalDetails-test.js
 * Created by David Trinh 10/10/18
 */

import BaseContractAdditionalDetails from 'models/v2/awardsV2/additionalDetails/BaseContractAdditionalDetails';
import { mockContract } from '../mockAwardApi';

const details = Object.create(BaseContractAdditionalDetails);
details.populate(mockContract.latest_transaction_contract_data);

describe('BaseContractAdditionalDetails', () => {
    it('should format psc code', () => {
        expect(details.pscCode).toEqual('t324242: 423we');
    });
    it('should format naics code', () => {
        expect(details.naicsCode).toEqual('35353');
    });
    it('should return -- for null values', () => {
        expect(details.clingerCohenAct).toEqual('--');
    });
});
