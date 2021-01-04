/**
 * ReportingOverviewRow-test.js
 * Created by Lizzie Salita 11/20/20
 */

import ReportingOverviewRow from 'models/v2/aboutTheData/ReportingOverviewRow';
import { mockAPI } from 'containers/aboutTheData/AgencyTableMapping';

// TODO - update when API contracts are finalized
const mockAgencyRow = { ...mockAPI.submissions.data.results[0] };

const agencyRow = Object.create(ReportingOverviewRow);
agencyRow.populate(mockAgencyRow);

describe('ReportingOverviewRow', () => {
    it('should format the agency name', () => {
        expect(agencyRow.name).toEqual('Department of Health and Human Services (DHHS)');
    });
    it('should handle an agency with no abbreviation', () => {
        const missingAbbrev = {
            ...mockAgencyRow,
            abbreviation: ''
        };
        const agencyRowMod = Object.create(ReportingOverviewRow);
        agencyRowMod.populate(missingAbbrev);
        expect(agencyRowMod.name).toEqual('Department of Health and Human Services');
    });
    it('should format the budget authority', () => {
        expect(agencyRow.budgetAuthority).toEqual('$8,361,447,130,498');
    });
    it('should format the obligation difference', () => {
        expect(agencyRow.obligationDifference).toEqual('$436,376,232,653');
    });
    it('should format the discrepancy count', () => {
        expect(agencyRow.discrepancyCount).toEqual('20');
    });
    it('should format the publication date', () => {
        expect(agencyRow.publicationDate).toEqual('01/10/2020');
    });
});
