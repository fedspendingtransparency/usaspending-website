/**
 * BaseAgencyOverview-test.js
 * Created by Lizzie Salita 12/4/20
 */

import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';

export const mockAgency = {
    name: 'Mock Agency',
    agency_id: '456',
    website: 'https://home.treasury.gov/',
    toptier_code: '123',
    abbreviation: 'ABC',
    icon_filename: 'ABC.jpg',
    mission: 'Maintain a strong economy and create economic and job opportunities...',
    congressional_justification_url: 'https://www.treasury.gov/cj',
    about_agency_data: null,
    subtier_agency_count: 10,
    messages: []
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
