/**
 * @jest-environment jsdom
 * 
 * monthHelper-test.js
 * Created by michaelbray on 8/24/17.
 */

import * as MonthHelper from 'helpers/monthHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

describe('Month helper functions', () => {
    describe('convertNumToMonth', () => {
        it('should convert "1" to "October", as the first month in the fiscal year', () => {
            const month = MonthHelper.convertNumToMonth("1");
            expect(month).toEqual("October");
        });

        it('should convert "2" to "November"', () => {
            const month = MonthHelper.convertNumToMonth("2");
            expect(month).toEqual("November");
        });

        it('should convert "3" to "December"', () => {
            const month = MonthHelper.convertNumToMonth("3");
            expect(month).toEqual("December");
        });

        it('should convert "4" to "January"', () => {
            const month = MonthHelper.convertNumToMonth("4");
            expect(month).toEqual("January");
        });

        it('should convert "5" to "February"', () => {
            const month = MonthHelper.convertNumToMonth("5");
            expect(month).toEqual("February");
        });

        it('should convert "6" to "March"', () => {
            const month = MonthHelper.convertNumToMonth("6");
            expect(month).toEqual("March");
        });

        it('should convert "7" to "April"', () => {
            const month = MonthHelper.convertNumToMonth("7");
            expect(month).toEqual("April");
        });

        it('should convert "8" to "May"', () => {
            const month = MonthHelper.convertNumToMonth("8");
            expect(month).toEqual("May");
        });

        it('should convert "9" to "June"', () => {
            const month = MonthHelper.convertNumToMonth("9");
            expect(month).toEqual("June");
        });

        it('should convert "10" to "July"', () => {
            const month = MonthHelper.convertNumToMonth("10");
            expect(month).toEqual("July");
        });

        it('should convert "11" to "August"', () => {
            const month = MonthHelper.convertNumToMonth("11");
            expect(month).toEqual("August");
        });

        it('should convert "12" to "September"', () => {
            const month = MonthHelper.convertNumToMonth("12");
            expect(month).toEqual("September");
        });

        it('should convert any other input to "October"', () => {
            const month = MonthHelper.convertNumToMonth("test");
            expect(month).toEqual("October");
        });
    });

    describe('convertNumToShortMonth', () => {
        it('should convert "1" to "Oct", as the first month in the fiscal year', () => {
            const month = MonthHelper.convertNumToShortMonth("1");
            expect(month).toEqual("Oct");
        });

        it('should convert "2" to "Nov"', () => {
            const month = MonthHelper.convertNumToShortMonth("2");
            expect(month).toEqual("Nov");
        });

        it('should convert "3" to "Dec"', () => {
            const month = MonthHelper.convertNumToShortMonth("3");
            expect(month).toEqual("Dec");
        });

        it('should convert "4" to "Jan"', () => {
            const month = MonthHelper.convertNumToShortMonth("4");
            expect(month).toEqual("Jan");
        });

        it('should convert "5" to "Feb"', () => {
            const month = MonthHelper.convertNumToShortMonth("5");
            expect(month).toEqual("Feb");
        });

        it('should convert "6" to "Mar"', () => {
            const month = MonthHelper.convertNumToShortMonth("6");
            expect(month).toEqual("Mar");
        });

        it('should convert "7" to "Apr"', () => {
            const month = MonthHelper.convertNumToShortMonth("7");
            expect(month).toEqual("Apr");
        });

        it('should convert "8" to "May"', () => {
            const month = MonthHelper.convertNumToShortMonth("8");
            expect(month).toEqual("May");
        });

        it('should convert "9" to "Jun"', () => {
            const month = MonthHelper.convertNumToShortMonth("9");
            expect(month).toEqual("Jun");
        });

        it('should convert "10" to "Jul"', () => {
            const month = MonthHelper.convertNumToShortMonth("10");
            expect(month).toEqual("Jul");
        });

        it('should convert "11" to "Aug"', () => {
            const month = MonthHelper.convertNumToShortMonth("11");
            expect(month).toEqual("Aug");
        });

        it('should convert "12" to "Sep"', () => {
            const month = MonthHelper.convertNumToShortMonth("12");
            expect(month).toEqual("Sep");
        });

        it('should convert any other input to "Oct"', () => {
            const month = MonthHelper.convertNumToShortMonth("test");
            expect(month).toEqual("Oct");
        });
    });

    describe('convertMonthToFY', () => {
        it('should convert {"1", "2017"}  to "2016"', () => {
            const year = MonthHelper.convertMonthToFY("1", "2017");
            expect(year).toEqual(2016);
        });

        it('should convert {"2", "2017"}  to "2016"', () => {
            const year = MonthHelper.convertMonthToFY("2", "2017");
            expect(year).toEqual(2016);
        });

        it('should convert {"3", "2017"}  to "2016"', () => {
            const year = MonthHelper.convertMonthToFY("3", "2017");
            expect(year).toEqual(2016);
        });

        it('should convert {"4", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("4", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"5", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("5", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"6", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("6", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"7", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("7", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"8", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("8", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"9", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("9", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"10", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("10", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"11", "2017"}  to "2017"', () => {
            const year = MonthHelper.convertMonthToFY("11", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert {"12", "2017"}  to "2016"', () => {
            const year = MonthHelper.convertMonthToFY("12", "2017");
            expect(year).toEqual(2017);
        });

        it('should convert any other month to "2016"', () => {
            const year = MonthHelper.convertMonthToFY("asdf", "2017");
            expect(year).toEqual(2016);
        });

        it('should convert nonsense input to the current fiscal year' +
            'and apply the same month logic for October', () => {
            const year = MonthHelper.convertMonthToFY("1", "asdf");
            expect(year).toEqual(FiscalYearHelper.currentFiscalYear() - 1);
        });

        it('should convert nonsense input to the current fiscal year' +
            'and apply the same month logic for January', () => {
            const year = MonthHelper.convertMonthToFY("4", "asdf");
            expect(year).toEqual(FiscalYearHelper.currentFiscalYear());
        });
    });

    describe('convertPeriodToDate', () => {
        it('should convert {"1", "2017"}  to "October 2016"', () => {
            const date = MonthHelper.convertPeriodToDate("1", "2017");
            expect(date).toEqual("October 2016");
        });

        it('should convert {"2", "2017"}  to "November 2016"', () => {
            const date = MonthHelper.convertPeriodToDate("2", "2017");
            expect(date).toEqual("November 2016");
        });

        it('should convert {"3", "2017"}  to "December 2016"', () => {
            const date = MonthHelper.convertPeriodToDate("3", "2017");
            expect(date).toEqual("December 2016");
        });

        it('should convert {"4", "2017"}  to "January 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("4", "2017");
            expect(date).toEqual("January 2017");
        });

        it('should convert {"5", "2017"}  to "February 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("5", "2017");
            expect(date).toEqual("February 2017");
        });

        it('should convert {"6", "2017"}  to "March 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("6", "2017");
            expect(date).toEqual("March 2017");
        });

        it('should convert {"7", "2017"}  to "April 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("7", "2017");
            expect(date).toEqual("April 2017");
        });

        it('should convert {"8", "2017"}  to "May 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("8", "2017");
            expect(date).toEqual("May 2017");
        });

        it('should convert {"9", "2017"}  to "June 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("9", "2017");
            expect(date).toEqual("June 2017");
        });

        it('should convert {"10", "2017"}  to "July 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("10", "2017");
            expect(date).toEqual("July 2017");
        });

        it('should convert {"11", "2017"}  to "August 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("11", "2017");
            expect(date).toEqual("August 2017");
        });

        it('should convert {"12", "2017"}  to "September 2017"', () => {
            const date = MonthHelper.convertPeriodToDate("12", "2017");
            expect(date).toEqual("September 2017");
        });
    });

    describe('fullMonthFromAbbr', () => {
        it('should convert "Jan" to "January"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Jan")).toEqual("January");
        });

        it('should convert "Feb" to "February"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Feb")).toEqual("February");
        });

        it('should convert "Mar" to "March"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Mar")).toEqual("March");
        });

        it('should convert "Apr" to "April"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Apr")).toEqual("April");
        });

        it('should convert "May" to "May"', () => {
            expect(MonthHelper.fullMonthFromAbbr("May")).toEqual("May");
        });

        it('should convert "Jun" to "June"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Jun")).toEqual("June");
        });

        it('should convert "Jul" to "July"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Jul")).toEqual("July");
        });

        it('should convert "Aug" to "August"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Aug")).toEqual("August");
        });

        it('should convert "Sep" to "September"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Sep")).toEqual("September");
        });

        it('should convert "Oct" to "October"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Oct")).toEqual("October");
        });

        it('should convert "Nov" to "November"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Nov")).toEqual("November");
        });

        it('should convert "Dec" to "December"', () => {
            expect(MonthHelper.fullMonthFromAbbr("Dec")).toEqual("December");
        });
    });
});
