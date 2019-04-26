/**
 * BaseFinancialSystemDetailsRow-test.js
 * Created by Lizzie Salita 3/13/18
 */

import BaseFinancialSystemDetailsRow from 'models/v2/awards/financialSystemDetails/BaseFinancialSystemDetailsRow';

const mockFinSys = {
    financial_accounts_by_awards_id: '456789',
    certified_date: '1987-01-02',
    transaction_obligated_amount: '3021.99',
    submission: {
        reporting_fiscal_year: '2017',
        reporting_fiscal_quarter: '2'
    },
    treasury_account: {
        federal_account: {
            account_title: 'Mock Account',
            agency_identifier: '123',
            main_account_code: '4567'
        },
        tas_rendering_label: 'tas',
        budget_function_title: 'General Government',
        budget_function_code: '1',
        budget_subfunction_title: 'Personnel Management',
        budget_subfunction_code: null
    },
    object_class: {
        object_class_name: 'Grants and Fixed Charges',
        object_class: '2'
    },
    program_activity: {
        program_activity_name: null,
        program_activity_code: '3'
    }
};

const finSysRow = Object.create(BaseFinancialSystemDetailsRow);
finSysRow.populate(mockFinSys);

describe('BaseFinancialSystemDetailsRow', () => {
    it('should format the submission date', () => {
        expect(finSysRow.submissionDate).toEqual('FY 2017 Q2');
    });
    it('should format the funding obligated amount', () => {
        expect(finSysRow.fundingObligated).toEqual('$3,022');
    });
    it('should create a federal account object', () => {
        expect(finSysRow.fedAccount).toEqual({
            title: 'Mock Account',
            id: '123-4567'
        });
    });
    it('should format the object class', () => {
        expect(finSysRow.objectClass).toEqual('Grants and Fixed Charges (2)');
    });
    it('should format the program activity', () => {
        expect(finSysRow.programActivity).toEqual('3');
    });
    it('should format the budget function', () => {
        expect(finSysRow.budgetFunction).toEqual('General Government (1)');
    });
    it('should format the budget sub-function', () => {
        expect(finSysRow.budgetSubFunction).toEqual('Personnel Management');
    });
});
