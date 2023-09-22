/**
 * @jest-environment jsdom
 * 
 * CoreExecutiveDetails-test.js
 * Created by David Trinh 10/6/18
 */

import CoreExecutiveDetails from 'models/v2/award/CoreExecutiveDetails';
import { mockContract } from './mockAwardApi';

const executiveDetails = Object.create(CoreExecutiveDetails);
executiveDetails.populateCore(mockContract.executive_details);

describe('CoreExecutiveDetails', () => {
    it('should parse executive compensation', () => {
        expect(executiveDetails.officers).toEqual({
            "Officer 1": "John Doe - $12,132",
            "Officer 2": "Jake Doe - $0"
        });
    });
    it('should parse executive compensation even without data', () => {
        const emptyExecutiveDetails = Object.create(CoreExecutiveDetails);
        const executiveDetailsData = [];
        emptyExecutiveDetails.populateCore(executiveDetailsData);
        expect(emptyExecutiveDetails.officers).toEqual({
            "Officer 1": "--",
            "Officer 2": "--",
            "Officer 3": "--",
            "Officer 4": "--",
            "Officer 5": "--"
        });
    });
});
