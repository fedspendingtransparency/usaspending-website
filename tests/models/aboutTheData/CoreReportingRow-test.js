/**
 * CoreReportingRow-test.js
 * Created by Lizzie Salita 1/12/21
 */

import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';
import { mockReportingPeriodRow } from './BaseReportingPeriodRow-test';

const row = Object.create(CoreReportingRow);
row.populateCore(mockReportingPeriodRow);

describe('Core Reporting Row model', () => {
    it('should format the budget authority', () => {
        expect(row.budgetAuthority).toEqual('$8,361,447,130,497.72');
    });
    it('should format the obligation difference', () => {
        expect(row.obligationDifference).toEqual('$436,376,232,652.87');
    });
    it('should format the discrepancy count', () => {
        expect(row.discrepancyCount).toEqual('1,000');
    });
    it('should format the publication date', () => {
        expect(row.mostRecentPublicationDate).toEqual('01/10/2020');
    });
    it('should store the raw GTAS Obligation Total', () => {
        expect(row._gtasObligationTotal).toEqual(234567);
    });
    it('should format the unlinked contracts count', () => {
        expect(row.unlinkedContracts).toEqual('20,002');
    });
    it('should format the unlinked assistance awards count', () => {
        expect(row.unlinkedAssistance).toEqual('10,001');
    });
    describe('missing counts', () => {
        const missingCounts = {
            ...mockReportingPeriodRow,
            unlinked_contract_award_count: null,
            unlinked_assistance_award_count: null
        };
        const missingCountsRow = Object.create(CoreReportingRow);
        missingCountsRow.populateCore(missingCounts);
        it('should display -- if the unlinked contracts count is null', () => {
            expect(missingCountsRow.unlinkedContracts).toEqual('--');
        });
        it('should display -- if the unlinked assistance awards count is null', () => {
            expect(missingCountsRow.unlinkedAssistance).toEqual('--');
        });
    });
    describe('zero counts', () => {
        const zeroCounts = {
            ...mockReportingPeriodRow,
            unlinked_contract_award_count: 0,
            unlinked_assistance_award_count: 0
        };
        const zeroCountsRow = Object.create(CoreReportingRow);
        zeroCountsRow.populateCore(zeroCounts);
        it('should display -- if the unlinked contracts count is null', () => {
            expect(zeroCountsRow.unlinkedContracts).toEqual('0');
        });
        it('should display -- if the unlinked assistance awards count is null', () => {
            expect(zeroCountsRow.unlinkedAssistance).toEqual('0');
        });
    });
});
