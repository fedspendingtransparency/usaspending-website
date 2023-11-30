/**
 * @jest-environment jsdom
 * 
 * BaseAgencyOverview-test.js
 * Created by Lizzie Salita 12/4/20
 */

import BaseAgencyOverview from 'models/v2/agency/BaseAgencyOverview';

// eslint-disable-next-line import/prefer-default-export
export const mockAgency = {
    fiscal_year: 1999,
    name: 'Mock Agency',
    agency_id: 456,
    website: 'https://home.treasury.gov/',
    toptier_code: '123',
    abbreviation: 'ABC',
    icon_filename: 'ABC.jpg',
    mission: 'Maintain a strong economy and create economic and job opportunities...',
    congressional_justification_url: 'https://www.treasury.gov/cj',
    about_agency_data: null,
    subtier_agency_count: 10,
    def_codes: [
        {
            code: "Q",
            public_law: "Excluded from tracking (uses non-emergency/non-disaster designated appropriations)",
            title: null,
            urls: null,
            disaster: null
        },
        {
            code: "E",
            public_law: "Emergency P.L. 116-20",
            title: "Additional Supplemental Appropriations for Disaster Relief Act, 2019",
            urls: "https://www.congress.gov/116/plaws/publ20/PLAW-116publ20.pdf",
            disaster: null
        },
        {
            code: "C",
            public_law: "Emergency P.L. 115-123",
            title: "Bipartisan Budget Act of 2018",
            urls: "https://www.congress.gov/115/plaws/publ123/PLAW-115publ123.htm",
            disaster: null
        },
        {
            code: "J",
            public_law: "Wildfire Suppression P.L. 116-94",
            title: "Further Consolidated Appropriations Act, 2020",
            urls: "https://www.congress.gov/bill/116th-congress/house-bill/1865/text",
            disaster: null
        },
        {
            code: "M",
            public_law: "Emergency P.L. 116-127",
            title: "Families First Coronavirus Response Act",
            urls: "https://www.congress.gov/116/plaws/publ127/PLAW-116publ127.pdf",
            disaster: "covid_19"
        }
    ],
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
    it('should return only covid def codes', () => {
        expect(agencyOverview.covidDefCodes.length).toEqual(1);
    });
});
