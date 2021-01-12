/**
 * BaseAgencyRow-test.js
 * Created by Lizzie Salita 11/20/20
 */

import BaseAgencyRow from 'models/v2/aboutTheData/BaseAgencyRow';
import CoreReportingRow from 'models/v2/aboutTheData/CoreReportingRow';
import { mockAPI } from 'containers/aboutTheData/AgencyTableMapping';

// TODO - update when API contracts are finalized
const mockAgencyRow = { ...mockAPI.submissions.data.results[0] };

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
    it('should have CoreReportingRow in its prototype chain', () => {
        expect(Object.getPrototypeOf(agencyRow)).toMatchObject(CoreReportingRow);
    });
});
