/**
 * CoreAwardAgency-test.js
 * Created by Lizzie Salita 3/20/18
 */

import CoreAwardAgency from 'models/award/CoreAwardAgency';
import { mockLoanApi } from './mockAwardApi';

const agency = Object.create(CoreAwardAgency);
const agencyData = {
    name: mockLoanApi.awarding_agency.toptier_agency.name,
    subtierName: mockLoanApi.awarding_agency.subtier_agency.name,
    officeName: mockLoanApi.latest_transaction.assistance_data.awarding_office_name
};
agency.populateCore(agencyData);

describe('CoreAwardAgency', () => {
    it('should format toptier, subtier, and office names', () => {
        expect(agency.name).toEqual('Department of Sandwiches');
        expect(agency.subtierName).toEqual('Department of Subs');
        expect(agency.officeName).toEqual('Office of Cheesesteak');
    });
    it('should return an empty string for missing data', () => {
        const incompleteAgency = Object.create(CoreAwardAgency);
        const missingData = {
            name: null,
            subtierName: undefined
        };
        incompleteAgency.populateCore(missingData);

        expect(incompleteAgency.name).toEqual('--');
        expect(incompleteAgency.subtierName).toEqual('');
        expect(incompleteAgency.officeName).toEqual('');
    });
    it('should use a -- for agency name when it is unpopulated', () => {
        const emptyAgency = Object.create(CoreAwardAgency);
        expect(emptyAgency.name).toEqual('--');
    });
});
