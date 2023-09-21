/**
 * fiscalYearHelper-test.js
 * Created by Kevin Li 1/25/17
 */

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

const dayjs = require('dayjs');

const expectedStartYear = 2008;

describe('Fiscal Year helper functions', () => {
    it(`should use ${expectedStartYear} as its earliest available fiscal year`, () => {
        // if this test fails, it usually just means we need to update our tests to use the current
        // fiscalYearHelper's earliest fiscal year
        expect(FiscalYearHelper.earliestFiscalYear).toEqual(expectedStartYear);
    });

    describe('currentFiscalYear', () => {
        it('should use the current calendar year as the fiscal year for every month before October', () => {
            // override the dayjs's library's internal time to a known mocked date
            const mockedDate = dayjs('2015-04-01', 'YYYY-MM-DD').toDate();
            dayjs.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2015);

            // reset dayjs's date to the current time
            dayjs.now = () => (new Date());
        });

        it('should use the current calendar year as the fiscal year on Sept 30', () => {
            // override the dayjs's library's internal time to a known mocked date
            const mockedDate = dayjs('2015-09-30', 'YYYY-MM-DD').toDate();
            dayjs.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2015);

            // reset dayjs's date to the current time
            dayjs.now = () => (new Date());
        });

        it('should use the next calendar year as the fiscal year for months on or after October', () => {
            // override the dayjs's library's internal time to a known mocked date
            const mockedDate = dayjs('2015-11-01', 'YYYY-MM-DD').toDate();
            dayjs.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2016);

            // reset dayjs's date to the current time
            dayjs.now = () => (new Date());
        });

        it('should use the next calendar year as the fiscal year on October 1', () => {
            // override the dayjs's library's internal time to a known mocked date
            const mockedDate = dayjs('2015-10-01', 'YYYY-MM-DD').toDate();
            dayjs.now = () => (mockedDate);

            const currentFY = FiscalYearHelper.currentFiscalYear();
            expect(currentFY).toEqual(2016);

            // reset dayjs's date to the current time
            dayjs.now = () => (new Date());
        });
    });

    describe('isFyValid', () => {
        it('should recognize valid fiscal year values', () => {
            expect(FiscalYearHelper.isFyValid(2008)).toEqual(true);
            expect(FiscalYearHelper.isFyValid('2011')).toEqual(true);
        });

        it('should recognize invalid fiscal year values', () => {
            expect(FiscalYearHelper.isFyValid(2007)).toEqual(false);
            expect(FiscalYearHelper.isFyValid('2007')).toEqual(false);
            expect(FiscalYearHelper.isFyValid('word')).toEqual(false);
            expect(FiscalYearHelper.isFyValid()).toEqual(false);
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
        it('should convert a dayjs object to the fiscal year it occurs within', () => {
            const firstDate = dayjs('2015-12-01', 'YYYY-MM-DD');
            const firstFy = 2016;

            expect(FiscalYearHelper.convertDateToFY(firstDate)).toEqual(firstFy);

            const secondDate = dayjs('2015-01-01', 'YYYY-MM-DD');
            const secondFy = 2015;

            expect(FiscalYearHelper.convertDateToFY(secondDate)).toEqual(secondFy);
        });
    });

    describe('getTrailingTwelveMonths', () => {
        it('should return an array containing today as an end date and the year one year ago as the start date', () => {
            const mockedDate = dayjs('2019-05-20', 'YYYY-MM-DD').toDate();
            dayjs.now = () => (mockedDate);
            const expectedDates = ['2018-05-20', '2019-05-20'];

            expect(FiscalYearHelper.getTrailingTwelveMonths()).toEqual(expectedDates);
        });
    });
    
    describe('nearestQuarterDate', () => {
        describe('Fiscal Quarter 1 Oct-Dec', () => {
            it('10-14-2019 - should return this quarter start quarter date in millis', () => {
                const mockedDate = dayjs('10-14-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('10-01-2019', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
            it('12-01-2019 - should return future quarter start date in millis', () => {
                const mockedDate = dayjs('12-15-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('01-01-2020', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
        });
        describe('Fiscal Quarter 2 Jan-March', () => {
            it('01-14-2019 - should return this quarter start quarter date in millis', () => {
                const mockedDate = dayjs('01-14-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('01-01-2019', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
            it('02-15-2019 - should return future quarter start date in millis', () => {
                const mockedDate = dayjs('02-15-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('04-01-2019', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
        });
        describe('Fiscal Quarter 3 April-June', () => {
            it('04-14-2019 - should return this quarter start quarter date in millis', () => {
                const mockedDate = dayjs('04-14-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('04-01-2019', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
            it('05-29-2019 - should return future quarter start date in millis', () => {
                const mockedDate = dayjs('05-29-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('07-01-2019', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
        });
        describe('Fiscal Quarter 4 July-September', () => {
            it('07-14-2019 - should return this quarter start quarter date in millis', () => {
                const mockedDate = dayjs('07-14-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('07-01-2019', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
            it('08-29-2019 - should return future quarter start date in millis', () => {
                const mockedDate = dayjs('08-29-2019', 'MM-DD-YYYY').valueOf();
                const expectedDate = dayjs('10-01-2019', 'MM-DD-YYYY').valueOf();
                expect(FiscalYearHelper.nearestQuarterDate(mockedDate)).toEqual(expectedDate);
            });
        });
    });
    describe('allFiscalYears', () => {
        it('returns the years within the range provided including the min/max of the range', () => {
            const years = FiscalYearHelper.allFiscalYears(1990, 2000);
            expect(years.length).toEqual(11);
            expect(years.includes(1990)).toBe(true);
            expect(years.includes(2000)).toBe(true);
        });
    });
});
