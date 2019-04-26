/**
 * BaseContractAdditionalDetails-test.js
 * Created by Lizzie Salita 3/20/18
 */


import { mockContractApi } from '../mockAwardApi';
import BaseContractAdditionalDetails from 'models/v2/awards/additionalDetails/BaseContractAdditionalDetails';

const details = Object.create(BaseContractAdditionalDetails);
details.populate(mockContractApi.latest_transaction.contract_data);

describe('BaseContractAdditionalDetails', () => {
    it('should format psc code', () => {
        expect(details.pscCode).toEqual('psc: product/service description');
    });
    it('should format naics code', () => {
        expect(details.naicsCode).toEqual('naics');
    });
    it('should return -- for null values', () => {
        expect(details.clingerCohenAct).toEqual('--');
    });
});
