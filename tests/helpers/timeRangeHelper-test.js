/**
 * timeRangeHelper-test.js
 * Created by Lizzie Salita 3/19/18.
 */

import moment from 'moment';
import * as TimeRangeHelper from 'helpers/timeRangeHelper';

describe('Time Range Helper functions', () => {
    describe('convertDatesToRange', () => {
        it('should return an empty string for null values', () => {
            const range = TimeRangeHelper.convertDatesToRange(null, null);
            expect(range).toEqual('');
        });
        it('should return an empty string for non-moment values', () => {
            const range = TimeRangeHelper.convertDatesToRange('January', 'March');
            expect(range).toEqual('');
        });
        it('should use singular values for one month/year', () => {
            const start = moment('01-01-2018', 'MM-DD-YYYY');
            const end = moment('02-01-2019', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('1 year, 1 month');
        });
        it('should use plural values for multiple months/years', () => {
            const start = moment('01-01-2017', 'MM-DD-YYYY');
            const end = moment('03-15-2019', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('2 years, 2 months, 10 days');
        });
        it('should handle zero months', () => {
            const start = moment('01-01-2017', 'MM-DD-YYYY');
            const end = moment('01-02-2019', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('2 years');
        });
        it('should handle zero years', () => {
            const start = moment('01-01-2018', 'MM-DD-YYYY');
            const end = moment('06-15-2018', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('5 months, 11 days');
        });
        it('should return an empty string for zero years and zero months', () => {
            const start = moment('01-01-2018', 'MM-DD-YYYY');
            const end = moment('01-02-2018', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('1 day');
        });
    });
});
