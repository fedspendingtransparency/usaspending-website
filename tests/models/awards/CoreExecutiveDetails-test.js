/**
 * CoreExecutiveDetails-test.js
 * Created by David Trinh 10/6/18
 */

import CoreExecutiveDetails from 'models/v2/awards/CoreExecutiveDetails';
import { mockLoan } from './mockAwardApi';

const executiveDetails = Object.create(CoreExecutiveDetails);
executiveDetails.populateCore(mockLoan.executive_details);
console.log(executiveDetails);

describe('CoreExecutiveDetails', () => {
    it('should format executive name and amount if executive name exists', () => {
        expect(executiveDetails.officers.get("Officer 1")).toEqual('John Doe - $12,132');
    });
    it('should use a $0 when amount is unpopulated', () => {
        expect(executiveDetails.officers.get("Officer 2")).toEqual('Jake Doe - $0');
    });
    it('should use a -- when data is unpopulated', () => {
        const emptyExecutiveDetails = Object.create(CoreExecutiveDetails);
        const executiveDetailsData = [];
        emptyExecutiveDetails.populateCore(executiveDetailsData);
        expect(emptyExecutiveDetails.officers.get("Officer 1")).toEqual('--');
    });
    it('should have 5 executives listed when data is unpopulated', () => {
        const emptyExecutiveDetails = Object.create(CoreExecutiveDetails);
        const executiveDetailsData = [];
        emptyExecutiveDetails.populateCore(executiveDetailsData);
        expect(emptyExecutiveDetails.officers.size).toEqual(5);
    });
});