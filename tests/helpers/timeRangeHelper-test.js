/**
 * @jest-environment jsdom
 * 
 * timeRangeHelper-test.js
 * Created by Lizzie Salita 3/19/18.
 */

import * as TimeRangeHelper from 'helpers/timeRangeHelper';

const dayjs = require('dayjs');

describe('Time Range Helper functions', () => {
    describe('convertDatesToRange', () => {
        it('should return an empty string for null values', () => {
            const range = TimeRangeHelper.convertDatesToRange(null, null);
            expect(range).toEqual('');
        });
        it('should return an empty string for non-dayjs values', () => {
            const range = TimeRangeHelper.convertDatesToRange('January', 'March');
            expect(range).toEqual('');
        });
        it('should use singular values for one month/year', () => {
            const start = dayjs('01-01-2018', 'MM-DD-YYYY');
            const end = dayjs('02-01-2019', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('1 year, 1 month');
        });
        it('should use plural values for multiple months/years', () => {
            const start = dayjs('01-01-2017', 'MM-DD-YYYY');
            const end = dayjs('03-15-2019', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('2 years, 2 months');
        });
        it('should handle zero months', () => {
            const start = dayjs('01-01-2017', 'MM-DD-YYYY');
            const end = dayjs('01-02-2019', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('2 years');
        });
        it('should handle zero years', () => {
            const start = dayjs('01-01-2018', 'MM-DD-YYYY');
            const end = dayjs('06-15-2018', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('5 months');
        });
        it('should return days when only days left', () => {
            const start = dayjs('01-01-2018', 'MM-DD-YYYY');
            const end = dayjs('01-02-2018', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('1 day');
        });
        it('should return an empty string for zero years and zero months and zero days', () => {
            const start = dayjs('01-01-2018', 'MM-DD-YYYY');
            const end = dayjs('01-01-2018', 'MM-DD-YYYY');
            const range = TimeRangeHelper.convertDatesToRange(start, end);
            expect(range).toEqual('');
        });
    });
});
