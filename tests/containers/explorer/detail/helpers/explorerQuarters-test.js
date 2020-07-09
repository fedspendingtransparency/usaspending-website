/**
 * explorerQuarters-test.js
 * Created by Kevin Li 2/16/18
 */

import * as explorerQuarters from 'containers/explorer/detail/helpers/explorerQuarters';
import { getPeriodsPerQuarterByFy } from '../../../../../src/js/containers/explorer/detail/helpers/explorerQuarters';

const nativeDate = Date.now;

const mockDate = (date) => {
    // mock the current date
    const month = parseInt(date.substring(5, 7), 10) - 1; // month is zero-indexed
    const day = parseInt(date.substring(8), 10);
    const mock = new Date(date.substring(0, 4), month, day);
    Date.now = () => mock;
};

afterAll(() => {
    // restore the original, native date function
    Date.now = nativeDate;
});

describe('explorerQuarters', () => {
    describe('handlePotentialStrings', () => {
        it('should convert its input to an integer if it is a string', () => {
            const output = explorerQuarters.handlePotentialStrings('12');
            expect(output).toEqual(12);
        });
        it('should return its input otherwise', () => {
            const output = explorerQuarters.handlePotentialStrings(12);
            expect(output).toEqual(12);
        });
    });

    describe('mostRecentQuarter', () => {
        it('should return the most recently completed quarter', () => {
            mockDate('1912-06-01');
            const output = explorerQuarters.mostRecentQuarter();
            expect(output.quarter).toEqual(2);
        });
        it('should return the fiscal year of the most recently completed quarter', () => {
            mockDate('1912-06-01');
            const output = explorerQuarters.mostRecentQuarter();
            expect(output.year).toEqual(1912);
        });
        it('if less than 45 days have passed since the previous quarter closed, it should return the quarter before that', () => {
            mockDate('1912-04-01');
            const output = explorerQuarters.mostRecentQuarter();
            expect(output).toEqual({
                quarter: 1,
                year: 1912
            });
        });
        it('if less than 45 days have passed in the close of quarter 1, then it should return quarter 4 of the previous fiscal year', () => {
            mockDate('1912-02-01');
            const output = explorerQuarters.mostRecentQuarter();
            expect(output).toEqual({
                quarter: 4,
                year: 1911
            });
        });
        it('should use the previous fiscal year as the FY when the current date is between Oct 1 and Feb 14', () => {
            mockDate('2018-10-01');
            const output = explorerQuarters.mostRecentQuarter();
            expect(output).toEqual({
                quarter: 3,
                year: 2018
            });
        });
    });

    describe('lastCompletedQuarterInFY', () => {
        it('should return quarter 4 of past fiscal years', () => {
            mockDate('1912-06-01');
            const output = explorerQuarters.lastCompletedQuarterInFY('1899');
            expect(output).toEqual({
                quarter: 4,
                year: 1899
            });
        });
        it('should return the last closed quarter of the current fiscal year', () => {
            mockDate('1912-06-01');
            const output = explorerQuarters.lastCompletedQuarterInFY('1912');
            expect(output).toEqual({
                quarter: 2,
                year: 1912
            });
        });
        it('if less than 45 days have passed since the close of quarter 1 of the specified FY, it should return quarter 4 of the previous FY', () => {
            mockDate('1912-02-01');
            const output = explorerQuarters.lastCompletedQuarterInFY('1912');
            expect(output).toEqual({
                quarter: 4,
                year: 1911
            });
        });
        it('should accept both string and number FY values', () => {
            mockDate('1912-06-01');

            expect(explorerQuarters.lastCompletedQuarterInFY('1899'))
                .toEqual(explorerQuarters.lastCompletedQuarterInFY(1899));
        });
    });

    describe('availableQuartersInFY', () => {
        it('for a previous FY that is after 2017, it should return an array of all four quarters', () => {
            mockDate('2020-06-01');
            const output = explorerQuarters.availableQuartersInFY(2019);
            expect(output).toEqual({
                quarters: [1, 2, 3, 4],
                year: 2019
            });
        });
        it('for the current post-2017 fiscal year, it should return an array of each quarter that has been closed for at least 45 days to date', () => {
            mockDate('2020-06-01');
            const output = explorerQuarters.availableQuartersInFY(2020);
            expect(output).toEqual({
                quarters: [1, 2],
                year: 2020
            });
        });
        it('for FY 2017, it should return quarters 2, 3, and 4, but not quarter 1', () => {
            mockDate('2020-06-01');
            const output = explorerQuarters.availableQuartersInFY(2017);
            expect(output).toEqual({
                quarters: [2, 3, 4],
                year: 2017
            });
        });
        it('if the system clock returns a date within FY 2017, it should return an array of quarters that have been closed for at least 45 days to the system date, excluding quarter 1', () => {
            mockDate('2017-08-30');
            const output = explorerQuarters.availableQuartersInFY(2017);
            expect(output).toEqual({
                quarters: [2, 3],
                year: 2017
            });
        });
        it('if the system clock returns a date after 45 days of the close of Q1 2017, but prior to 45 days after the close of a later quarter, it should return an empty quarter array', () => {
            mockDate('2017-03-01');
            const output = explorerQuarters.availableQuartersInFY(2017);
            expect(output).toEqual({
                quarters: [],
                year: 2017
            });
        });
        it('should return an empty quarter array if an FY prior to 2017 is provided', () => {
            mockDate('2020-06-01');
            const output = explorerQuarters.availableQuartersInFY(1776);
            expect(output).toEqual({
                quarters: [],
                year: 1776
            });
        });
        it('should accept a string or number argument', () => {
            mockDate('2020-06-01');
            expect(explorerQuarters.availableQuartersInFY('2018'))
                .toEqual(explorerQuarters.availableQuartersInFY(2018));
        });
    });

    describe('defaultQuarters', () => {
        it('should return all the available quarters in the current year', () => {
            mockDate('2020-06-01');
            const output = explorerQuarters.defaultQuarters();
            expect(output).toEqual({
                quarters: [1, 2],
                year: 2020
            });
        });
        it('should return all the available quarters in the previous year if it has been less than 45 days since the close of quarter 1', () => {
            mockDate('2020-02-01');
            const output = explorerQuarters.defaultQuarters();
            expect(output).toEqual({
                quarters: [1, 2, 3, 4],
                year: 2019
            });
        });
    });
    describe('getPeriodsPerQuarterByFy', () => {
        it.each([
            [2019, 0, 1],
            [2020, 2, 3]
        ])('returns the correct array for fiscal year %i', (fy, resultIndex, expected) => {
            const result = getPeriodsPerQuarterByFy(fy);
            expect(result[resultIndex].length).toEqual(expected);
        });
    });
});
