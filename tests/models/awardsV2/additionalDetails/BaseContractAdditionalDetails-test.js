/**
 * BaseContractAdditionalDetails-test.js
 * Created by David Trinh 10/10/18
 */

import BaseContractAdditionalDetails from 'models/v2/awardsV2/additionalDetails/BaseContractAdditionalDetails';
import { mockIdv } from '../mockAwardApi';

const details = Object.create(BaseContractAdditionalDetails);
details.populate(mockIdv.latest_transaction_contract_data);

describe('BaseContractAdditionalDetails', () => {
    it('should format PSC', () => {
        expect(details.pscCode).toEqual('1560: AIRFRAME STRUCTURAL COMPONENTS');
    });
    it('should format NAICS', () => {
        expect(details.naicsCode).toEqual('336413: OTHER AIRCRAFT PARTS AND AUXILIARY EQUIPMENT MANUFACTURING');
    });
    it('should correctly format elements with a code and no description', () => {
        expect(details.dodAcquisitionProgram).toEqual('000');
    });
    it('should correctly format elements with a description and no code', () => {
        expect(details.extentCompeted).toEqual('NOT COMPETED UNDER SAP');
    });
    it('should return -- for elements with no code or description', () => {
        expect(details.subcontractingPlan).toEqual('--');
    });
    it('should return -- for null values', () => {
        expect(details.clingerCohenAct).toEqual('--');
    });
});
