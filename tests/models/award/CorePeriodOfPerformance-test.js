/**
 * @jest-environment jsdom
 * 
 * CorePeriodOfPerformance-test.js
 * Created by David Trinh 10/6/18
 */

import CorePeriodOfPerformance from 'models/v2/award/CorePeriodOfPerformance';
import { mockLoan, mockContract } from './mockAwardApi';

const periodOfPerformance = Object.create(CorePeriodOfPerformance);
const periodOfPerformanceData = {
    startDate: mockLoan.period_of_performance.start_date,
    endDate: mockLoan.period_of_performance.end_date,
    lastModifiedDate: mockLoan.period_of_performance.last_modified_date,
    potentialEndDate: mockContract.period_of_performance.potential_end_date,
    awardDate: mockLoan.date_signed
};
periodOfPerformance.populateCore(periodOfPerformanceData);


describe('CorePeriodOfPerformance', () => {
    it('should format the dates to MM/DD/YYYY', () => {
        expect(periodOfPerformance.startDate).toEqual('02/19/2004');
        expect(periodOfPerformance.endDate).toEqual('02/19/2005');
        expect(periodOfPerformance.awardDate).toEqual('02/18/2005');
        expect(periodOfPerformance.lastModifiedDate).toEqual('03/01/2006');
        expect(periodOfPerformance.potentialEndDate).toEqual('04/30/2027');
    });
    it('should format the dates to MMM DD, YYYY', () => {
        expect(periodOfPerformance.startDateLong).toEqual('Feb 19, 2004');
        expect(periodOfPerformance.endDateLong).toEqual('Feb 19, 2005');
        expect(periodOfPerformance.awardDateLong).toEqual('Feb 18, 2005');
        expect(periodOfPerformance.lastModifiedDateLong).toEqual('Mar 01, 2006');
        expect(periodOfPerformance.potentialEndDateLong).toEqual('Apr 30, 2027');
    });
});
