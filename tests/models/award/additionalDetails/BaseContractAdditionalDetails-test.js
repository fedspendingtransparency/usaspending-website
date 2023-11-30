/**
 * @jest-environment jsdom
 * 
 * BaseContractAdditionalDetails-test.js
 * Created by David Trinh 10/10/18
 */

import BaseContractAdditionalDetails from 'models/v2/award/additionalDetails/BaseContractAdditionalDetails';
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
    it('should return the string \'TRUE\' for true boolean values', () => {
        const trueContractDetails = Object.assign({}, mockIdv.latest_transaction_contract_data, {
            small_business_competitive: true
        });
        const updatedDetailsTrue = Object.create(BaseContractAdditionalDetails);
        updatedDetailsTrue.populate(trueContractDetails);

        expect(updatedDetailsTrue.smallBusinessCompetitive).toEqual('TRUE');
    });
    it('should return the string \'FALSE\' for true boolean values', () => {
        expect(details.smallBusinessCompetitive).toEqual('FALSE');
    });
    it('should return \'--\' for null/undefined values', () => {
        const nullContractDetails = Object.assign({}, mockIdv.latest_transaction_contract_data, {
            small_business_competitive: null
        });
        const updatedDetailsNull = Object.create(BaseContractAdditionalDetails);
        updatedDetailsNull.populate(nullContractDetails);

        expect(updatedDetailsNull.smallBusinessCompetitive).toEqual('--');
    });
    describe('National Interest Action', () => {
        it('should store the NIA description', () => {
            expect(details.nationalInterestActionDesc).toEqual('Mock NIA description');
        });
        it('should display "NONE" when the value is "NONE"', () => {
            const noneNIA = Object.assign({}, mockIdv.latest_transaction_contract_data, {
                national_interest_action_description: 'NONE'
            });
            const updatedDetails = Object.create(BaseContractAdditionalDetails);
            updatedDetails.populate(noneNIA);

            expect(updatedDetails.nationalInterestActionDesc).toEqual('NONE');
        });
        it('should display "--" when the value is null', () => {
            const nullNIA = Object.assign({}, mockIdv.latest_transaction_contract_data, {
                national_interest_action_description: null
            });
            const updatedDetails = Object.create(BaseContractAdditionalDetails);
            updatedDetails.populate(nullNIA);

            expect(updatedDetails.nationalInterestActionDesc).toEqual('--');
        });
    });
});
