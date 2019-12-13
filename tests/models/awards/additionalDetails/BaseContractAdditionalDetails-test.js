/**
 * BaseContractAdditionalDetails-test.js
 * Created by Lizzie Salita 3/20/18
 */

import BaseContractAdditionalDetails from 'models/award/additionalDetails/BaseContractAdditionalDetails';
import { mockContractApi } from '../mockAwardApi';

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
    it('should parse executive compensation', () => {
        expect(details.officers).toEqual({
            officer1: 'George Washington - $9,000',
            officer2: 'John Adams - $7,001',
            officer3: 'Thomas Jefferson - $6,000',
            officer4: 'James Madison - $5,000',
            officer5: '--'
        });
    });
});
