/**
 * @jest-environment jsdom
 * 
 * CoreAwardAgency-test.js
 * Created by David Trinh 10/10/18
 */

import CoreAwardAgency from 'models/v2/award/CoreAwardAgency';
import { mockLoan } from './mockAwardApi';

const agency = Object.create(CoreAwardAgency);
const agencyData = {
    id: 123,
    hasAgencyPage: mockLoan.awarding_agency.has_agency_page,
    toptierName: mockLoan.awarding_agency.toptier_agency.name,
    toptierAbbr: mockLoan.awarding_agency.toptier_agency.abbreviation,
    subtierName: mockLoan.awarding_agency.subtier_agency.name,
    officeName: mockLoan.awarding_agency.office_agency_name
};
agency.populateCore(agencyData);

describe('CoreAwardAgency', () => {
    it('should have an id field', () => {
        expect(agency.id).toEqual(123);
    });
    it('should have an agency page field', () => {
        expect(agency.hasAgencyPage).toEqual(true);
    });
    it('should format toptier, subtier, and office names', () => {
        expect(agency.toptierName).toEqual('Department of Defense');
        expect(agency.subtierName).toEqual('Department of Navy');
        expect(agency.officeName).toEqual('STRATEGIC SYSTEMS');
    });
    it('should return an empty string for missing data', () => {
        const incompleteAgency = Object.create(CoreAwardAgency);
        const missingData = {
            toptierName: null,
            subtierName: undefined
        };
        incompleteAgency.populateCore(missingData);

        expect(incompleteAgency.toptierName).toEqual('--');
        expect(incompleteAgency.subtierName).toEqual('');
        expect(incompleteAgency.officeName).toEqual('');
    });
    it('should use a -- for agency name when it is unpopulated', () => {
        const emptyAgency = Object.create(CoreAwardAgency);
        expect(emptyAgency.toptierName).toEqual('--');
    });
    it('should format the name and abbreviation when both are provided', () => {
        expect(agency.formattedToptier).toEqual('Department of Defense (DOD)');
    });
});
