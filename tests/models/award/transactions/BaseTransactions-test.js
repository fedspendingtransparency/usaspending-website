/**
 * @jest-environment jsdom
 * 
 * BaseTransactions-test.js
 * Created by Lizzie Salita 3/13/18
 */

import BaseContractTransaction from "models/v2/award/transactions/BaseContractTransaction";
import BaseAssistanceTransaction from "models/v2/award/transactions/BaseAssistanceTransaction";
import BaseLoanTransaction from "models/v2/award/transactions/BaseLoanTransaction";

const mockContractTransaction = {
    federal_action_obligation: '1230.4'
};

const mockAssistanceTransaction = {
    federal_action_obligation: '1230.4',
    original_loan_subsidy_cost: '1230.4',
    action_type: 'a',
    cfda_number: '12.345'
};

const mockLoanTransaction = {
    face_value_loan_guarantee: '1230.4',
    original_loan_subsidy_cost: '234.58',
    cfda_number: '12.345'
};

const contractTransaction = Object.create(BaseContractTransaction);
contractTransaction.populate(mockContractTransaction);

const assistanceTransaction = Object.create(BaseAssistanceTransaction);
assistanceTransaction.populate(mockAssistanceTransaction);

const loanTransaction = Object.create(BaseLoanTransaction);
loanTransaction.populate(mockLoanTransaction);

describe('Base Transactions', () => {
    describe('BaseContractTransaction', () => {
        it('should format the federal action obligation', () => {
            expect(contractTransaction.federalActionObligation).toEqual('$1,230');
        });
        it('should format the original loan subsidy cost', () => {
            expect(assistanceTransaction.originalLoanSubsidyCost).toEqual('$1,230');
        });
    });
    describe('BaseAssistanceTransaction', () => {
        it('should format the federal action obligation', () => {
            expect(assistanceTransaction.federalActionObligation).toEqual('$1,230');
        });
        it('should format the original loan subsidy cost', () => {
            expect(assistanceTransaction.originalLoanSubsidyCost).toEqual('$1,230');
        });
        it('should convert the action type', () => {
            expect(assistanceTransaction._actionTypeDescription).toEqual('New');
        });
        it('should contain the cfda number', () => {
            expect(assistanceTransaction.cfdaNumber).toEqual('12.345');
        });
    });
    describe('BaseLoanTransaction', () => {
        it('should format the face value', () => {
            expect(loanTransaction.faceValue).toEqual('$1,230');
        });
        it('should format the subsidy value', () => {
            expect(loanTransaction.subsidy).toEqual('$235');
        });
        it('should contain the cfda number', () => {
            expect(assistanceTransaction.cfdaNumber).toEqual('12.345');
        });
    });
});
