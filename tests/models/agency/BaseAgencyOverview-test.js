/**
 * BaseAgencyOverview-test.js
 * Created by Lizzie Salita 12/4/20
 */

import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';
const mockAgency = {
    name: 'Mock Agency',
    id: '456',
    website: 'https://home.treasury.gov/',
    code: '020',
    abbreviation: 'ABC'
};

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
