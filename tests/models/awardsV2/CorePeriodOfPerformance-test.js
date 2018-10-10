/**
 * CorePeriodOfPerformance-test.js
 * Created by David Trinh 10/6/18
 */

import CorePeriodOfPerformance from 'models/v2/awardsV2/CorePeriodOfPerformance';
import { mockLoan } from './mockAwardApi';

const periodOfPerformance = Object.create(CorePeriodOfPerformance);
const periodOfPerformanceData = {
    startDate: mockLoan.period_of_performance.period_of_performance_start_date,
    endDate: mockLoan.period_of_performance.period_of_performance_current_end_date
};
periodOfPerformance.populateCore(periodOfPerformanceData);


describe('CorePeriodOfPerformance', () => {
    it('should format the start date and end date', () => {
        expect(periodOfPerformance.startDate).toEqual('02/19/2004');
        expect(periodOfPerformance.endDate).toEqual('02/19/2005');
    });
});
