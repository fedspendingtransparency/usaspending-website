/**
 * BaseReportingPeriodRow-test.js
 * Created by Lizzie Salita 12/8/20
 */

import BaseReportingPeriodRow from 'models/v2/aboutTheData/BaseReportingPeriodRow';
import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';

export const mockReportingPeriodRow = {
    fiscal_year: 2020,
    fiscal_period: 12,
    current_total_budget_authority_amount: 8361447130497.72,
    recent_publication_date: "2020-01-10T11:59:21Z",
    tas_account_discrepancies_totals: {
        missing_tas_accounts_count: 1000,
        gtas_obligation_total: 234567
    },
    percent_of_total_budgetary_resources: 2.189,
    obligation_difference: 436376232652.87,
    unlinked_contract_award_count: 20002,
    unlinked_assistance_award_count: 10001,
    assurance_statement_url: 'https://files.usaspending.gov/agency_submissions/Raw%20DATA%20Act%20Files/2020/Q1/097%20-%20Department%20of%20Defense%20(DOD)/2020-Q1-097_Department%20of%20Defense%20(DOD)-Assurance_Statement.txt'
};

const reportingPeriodRow = Object.create(BaseReportingPeriodRow);
reportingPeriodRow.populate(mockReportingPeriodRow);

describe('BaseReportingPeriodRow', () => {
    it('should format the reporting period when the period corresponds to a quarter', () => {
        expect(reportingPeriodRow.reportingPeriod).toEqual('FY 2020: Q4 / P12');
    });
    it('should format the reporting period when the period does not correspond to a quarter', () => {
        const period7 = {
            ...mockReportingPeriodRow,
            fiscal_period: 7
        };
        const reportingPeriodRowMod = Object.create(BaseReportingPeriodRow);
        reportingPeriodRowMod.populate(period7);
        expect(reportingPeriodRowMod.reportingPeriod).toEqual('FY 2020: P07');
    });
    it('should correctly format period 02 to indicate it includes P01', () => {
        const period2 = {
            ...mockReportingPeriodRow,
            fiscal_period: 2
        };
        const reportingPeriodRowMod = Object.create(BaseReportingPeriodRow);
        reportingPeriodRowMod.populate(period2);
        expect(reportingPeriodRowMod.reportingPeriod).toEqual('FY 2020: P01 - P02');
    });
    it('should format the percent of budgetary resources', () => {
        expect(reportingPeriodRow.percentOfBudget).toEqual('2.19%');
    });
    it('should have CoreReportingRow in its prototype chain', () => {
        expect(Object.getPrototypeOf(reportingPeriodRow)).toMatchObject(CoreReportingRow);
    });
});
