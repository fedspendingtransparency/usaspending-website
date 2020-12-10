/**
 * BaseReportingPeriodRow-test.js
 * Created by Lizzie Salita 12/8/20
 */

import BaseReportingPeriodRow from 'models/v2/aboutTheData/BaseReportingPeriodRow';

const mockReportingPeriodRow = {
    fiscal_year: 2020,
    fiscal_period: 12,
    current_total_budget_authority_amount: 8361447130497.72,
    recent_publication_date: "2020-01-10T11:59:21Z",
    tas_account_discrepancies_totals: {
        missing_tas_accounts_count: 1000
    },
    obligation_difference: 436376232652.87
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
    it('should format the obligation difference to the cent', () => {
        expect(reportingPeriodRow.obligationDifference).toEqual('$436,376,232,652.87');
    });
    it('should format missing TAS count', () => {
        expect(reportingPeriodRow.missingTASCount).toEqual('1,000');
    });
    it('should format the most recent publication date', () => {
        expect(reportingPeriodRow.mostRecentPublicationDate).toEqual('01/10/2020');
    });
    it('should handle no data for the total federal budget', () => {
        expect(reportingPeriodRow.percentOfBudget).toEqual('--');
    });
    it('should calculate the percentage when federal budget is provided', () => {
        const rowWithBudget = Object.create(BaseReportingPeriodRow);
        rowWithBudget.populate(mockReportingPeriodRow, 10000000000000);
        expect(rowWithBudget.percentOfBudget).toEqual('83.6%');
    });
});
