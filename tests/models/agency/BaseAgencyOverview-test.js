/**
 * BaseAgencyOverview-test.js
 * Created by Lizzie Salita 12/4/20
 */

import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';
import { mockAgency } from 'helpers/agencyV2Helper';

const agencyOverview = Object.create(BaseAgencyOverview);
agencyOverview.populate(mockAgency);

describe('BaseAgencyOverview', () => {
    it('should format the agency name', () => {
        expect(agencyOverview.name).toEqual('Mock Agency (ABC)');
    });
    it('should handle an agency with no abbreviation', () => {
        const missingAbbrev = {
            ...mockAgency,
            abbreviation: ''
        };
        const agencyOverviewMod = Object.create(BaseAgencyOverview);
        agencyOverviewMod.populate(missingAbbrev);
        expect(agencyOverviewMod.name).toEqual('Mock Agency');
    });
});
