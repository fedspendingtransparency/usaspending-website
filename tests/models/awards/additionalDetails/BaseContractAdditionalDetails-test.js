/**
 * BaseContractAdditionalDetails-test.js
 * Created by Lizzie Salita 3/20/18
 */


import { mockContract } from '../mockAwardApi';
import BaseContractAdditionalDetails from 'models/v2/awards/additionalDetails/BaseContractAdditionalDetails';

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
