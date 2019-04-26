/**
 * fiscalYearHelper-test.js
 * Created by Kevin Li 1/25/17
 */

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import moment from 'moment';

const expectedStartYear = 2008;

describe('Fiscal Year helper functions', () => {
    it(`should use ${expectedStartYear} as its earliest available fiscal year`, () => {
        // if this test fails, it usually just means we need to update our tests to use the current
        // fiscalYearHelper's earliest fiscal year
        expect(FiscalYearHelper.earliestFiscalYear).toEqual(expectedStartYear);
    });

    describe('currentFiscalYear', () => {
        it('should use the current calendar year as the fiscal year for every month before October', () => {
            // override the moment's library's internal time to a known mocked date
            const mockedDate = moment('2015-04-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2015);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });

        it('should use the next calendar year as the fiscal year for months on or after October', () => {
            // override the moment's library's internal time to a known mocked date
            const mockedDate = moment('2015-11-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2016);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
    });

    describe('defaultFiscalYear', () => {
        it('should use the previous fiscal year as the fiscal year on February 14', () => {
            // override the moment's library's internal time to a known mocked date
            const mockedDate = moment('2018-02-14', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.defaultFiscalYear();
            expect(currentFY).toEqual(2017);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });

        it('should use the current fiscal year as the fiscal year on February 15', () => {
            // override the moment's library's internal time to a known mocked date
            const mockedDate = moment('2018-02-15', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.defaultFiscalYear();
            expect(currentFY).toEqual(2018);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });


        it('should use the previous fiscal year as the fiscal year on October 1st', () => {
            // override the moment's library's internal time to a known mocked date
            const mockedDate = moment('2018-10-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.defaultFiscalYear();
            expect(currentFY).toEqual(2018);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });

        it('should delay the switchover to 2019 until March 21, 2019', () => {
            const mockedDate = moment('2019-03-20', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.defaultFiscalYear();
            expect(currentFY).toEqual(2018);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });

        it('should return 2019 on March 21, 2019', () => {
            const mockedDate = moment('2019-03-21', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.defaultFiscalYear();
            expect(currentFY).toEqual(2019);

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
    });

    describe('convertFYtoDateRange', () => {
        it('should convert a given fiscal year to an array of start, end date strings', () => {
            const fy = '2016';
            const expectedDates = ['2015-10-01', '2016-09-30'];

            expect(FiscalYearHelper.convertFYToDateRange(fy)).toEqual(expectedDates);
        });
    });

    describe('convertDateToFY', () => {
        it('should convert a Moment object to the fiscal year it occurs within', () => {
            const firstDate = moment('2015-12-01', 'YYYY-MM-DD');
            const firstFy = 2016;

            expect(FiscalYearHelper.convertDateToFY(firstDate)).toEqual(firstFy);

            const secondDate = moment('2015-01-01', 'YYYY-MM-DD');
            const secondFy = 2015;

            expect(FiscalYearHelper.convertDateToFY(secondDate)).toEqual(secondFy);
        });
    });

    describe('getTrailingTwelveMonths', () => {
        it('should return an array containing today as an end date and the year one year ago as the start date', () => {
            const mockedDate = moment('2019-05-20', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);
            const expectedDates = ['2018-05-20', '2019-05-20'];

            expect(FiscalYearHelper.getTrailingTwelveMonths()).toEqual(expectedDates);
        });
    });
});
