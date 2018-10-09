/**
 * CoreExecutiveDetails-test.js
 * Created by David Trinh 10/6/18
 */

import CoreExecutiveDetails from 'models/v2/awards/CoreExecutiveDetails';
import { mockLoan } from './mockAwardApi';

const executiveDetails = Object.create(CoreExecutiveDetails);
executiveDetails.populateCore(mockLoan.executive_details);

describe('CoreExecutiveDetails', () => {
    it('should parse executive compensation', () => {
        expect(executiveDetails.officers).toEqual({
            officer1: "John Doe - $12,132",
            officer2: "Jake Doe - $0",
            officer3: "--"
        });
    });
    it('should parse executive compensation even without data', () => {
        const emptyExecutiveDetails = Object.create(CoreExecutiveDetails);
        const executiveDetailsData = [];
        emptyExecutiveDetails.populateCore(executiveDetailsData);
        expect(emptyExecutiveDetails.officers).toEqual({
            officer1: "--",
            officer2: "--",
            officer3: "--",
            officer4: "--",
            officer5: "--"
        });
    });
});
