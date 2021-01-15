/**
 * BaseAgencyRow-test.js
 * Created by Lizzie Salita 11/20/20
 */

import BaseAgencyRow from 'models/v2/aboutTheData/BaseAgencyRow';
import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';

const mockAgencyRow = {
    agency_name: "Department of Health and Human Services",
    abbreviation: "DHHS",
    agency_code: "020",
    agency_id: 123,
    current_total_budget_authority_amount: 8361.72,
    recent_publication_date: "2020-01-10T11:59:21Z",
    recent_publication_date_certified: false,
    tas_account_discrepancies_totals: {
        gtas_obligation_total: 55234,
        tas_accounts_total: 23923,
        tas_obligation_not_in_gtas_total: 343345,
        missing_tas_accounts_count: 20
    },
    obligation_difference: 436376232652.87,
    federalTotal: {
        fiscal_year: 2018,
        fiscal_period: 3,
        total_budgetary_resources: 10000
    }
};

const agencyRow = Object.create(BaseAgencyRow);
agencyRow.populate(mockAgencyRow);

describe('BaseAgencyRow', () => {
    it('should format the agency name', () => {
        expect(agencyRow.name).toEqual('Department of Health and Human Services (DHHS)');
    });
    it('should handle an agency with no abbreviation', () => {
        const missingAbbrev = {
            ...mockAgencyRow,
            abbreviation: ''
        };
        const agencyRowMod = Object.create(BaseAgencyRow);
        agencyRowMod.populate(missingAbbrev);
        expect(agencyRowMod.name).toEqual('Department of Health and Human Services');
    });
    describe('percentage of total federal budget', () => {
        it('should calculate and format the percent of the federal budget', () => {
            expect(agencyRow._federalTotal).toEqual(10000);
            expect(agencyRow._budgetAuthority).toEqual(8361.72);
            expect(agencyRow.percentageOfTotalFederalBudget).toEqual('83.62%');
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
