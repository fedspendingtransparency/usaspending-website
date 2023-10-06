/**
 * @jest-environment jsdom
 * 
 * BaseAgencyRow-test.js
 * Created by Lizzie Salita 11/20/20
 */

import BaseAgencyRow from 'models/v2/aboutTheData/BaseAgencyRow';
import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';
import { mockAPI } from '../../containers/aboutTheData/mockData';

const mockAgencyRow = {
    ...mockAPI.submissions.data.results[0],
    federalTotal: {
        total_budgetary_resources: 10000
    }
};

const agencyRow = Object.create(BaseAgencyRow);
agencyRow.populate(mockAgencyRow);

describe('BaseAgencyRow', () => {
    it('should format the agency name', () => {
        expect(agencyRow.name).toEqual('Mock Agency (ABC)');
    });
    it('should handle an agency with no abbreviation', () => {
        const missingAbbrev = {
            ...mockAgencyRow,
            abbreviation: ''
        };
        const agencyRowMod = Object.create(BaseAgencyRow);
        agencyRowMod.populate(missingAbbrev);
        expect(agencyRowMod.name).toEqual('Mock Agency');
    });
    describe('percentage of total federal budget', () => {
        it('should calculate and format the percent of the federal budget', () => {
            expect(agencyRow._federalTotal).toEqual(10000);
            expect(agencyRow._budgetAuthority).toEqual(8000.72);
            expect(agencyRow.percentageOfTotalFederalBudget).toEqual('80.01%');
        });
        it('should display -- if the percent cannot be computed', () => {
            const missingFederalBudget = {
                ...mockAgencyRow,
                federalTotal: {
                    total_budgetary_resources: 0
                }
            };
            const agencyMissingBudget = Object.create(BaseAgencyRow);
            agencyMissingBudget.populate(missingFederalBudget);
            expect(agencyMissingBudget.percentageOfTotalFederalBudget).toEqual('--');
        });
    });
    it('should have CoreReportingRow in its prototype chain', () => {
        expect(Object.getPrototypeOf(agencyRow)).toMatchObject(CoreReportingRow);
    });
});
