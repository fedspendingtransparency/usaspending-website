/**
 * @jest-environment jsdom
 * 
 * BaseReportingPeriodRow-test.js
 * Created by Lizzie Salita 12/8/20
 */

import BaseReportingPeriodRow from 'models/v2/aboutTheData/BaseReportingPeriodRow';
import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';

import { mockReportingPeriodRow } from '../../containers/aboutTheData/mockData';

const mockResult = mockReportingPeriodRow.data.results[0];
const reportingPeriodRow = Object.create(BaseReportingPeriodRow);
reportingPeriodRow.populate(mockResult);

describe('BaseReportingPeriodRow', () => {
    it('should format the reporting period when the period corresponds to a quarter', () => {
        expect(reportingPeriodRow.reportingPeriod).toEqual('FY 2020: Q4 / P12');
    });
    it('should format the reporting period when the period does not correspond to a quarter', () => {
        const period7 = {
            ...mockResult,
            fiscal_period: 7
        };
        const reportingPeriodRowMod = Object.create(BaseReportingPeriodRow);
        reportingPeriodRowMod.populate(period7);
        expect(reportingPeriodRowMod.reportingPeriod).toEqual('FY 2020: P07');
    });
    it('should correctly format period 02 to indicate it includes P01', () => {
        const period2 = {
            ...mockResult,
            fiscal_period: 2
        };
        const reportingPeriodRowMod = Object.create(BaseReportingPeriodRow);
        reportingPeriodRowMod.populate(period2);
        expect(reportingPeriodRowMod.reportingPeriod).toEqual('FY 2020: P01 - P02');
    });
    it('should have CoreReportingRow in its prototype chain', () => {
        expect(Object.getPrototypeOf(reportingPeriodRow)).toMatchObject(CoreReportingRow);
    });
    it('should format the percent of budgetary resources', () => {
        expect(reportingPeriodRow.percentOfBudget).toEqual('2.10%');
    });
    it('should handle null percent of budgetary resources', () => {
        const noPercentage = mockReportingPeriodRow.data.results[0];
        noPercentage.percent_of_total_budgetary_resources = null;
        reportingPeriodRow.populate(noPercentage);
        expect(reportingPeriodRow.percentOfBudget).toEqual('--');
    });
    it('should handle 0 percent of budgetary resources', () => {
        const noPercentage = mockReportingPeriodRow.data.results[0];
        noPercentage.percent_of_total_budgetary_resources = 0;
        reportingPeriodRow.populate(noPercentage);
        expect(reportingPeriodRow.percentOfBudget).toEqual('0.00%');
    });
});
