import {
    dateFormattedMonthDayYear,
    formatPublicationDates,
    formatMissingAccountBalancesData,
    showQuarterText,
    formatReportingDifferencesData
} from 'helpers/aboutTheDataHelper';

import {
    mockBalanceData,
    mockBadGTASTotal,
    mockBadResultsBalanceData,
    mockReportingDifferenceData,
    mockBadReportingDifferenceData
} from '../mockData';

describe('About The Data Helper', () => {
    describe('dateFormattedMonthDayYear', () => {
        it('should return null if falsy is passed', () => {
            expect(dateFormattedMonthDayYear('')).toBeNull();
        });
        it('should format the month of the date if a date is passed', () => {
            expect(dateFormattedMonthDayYear('2020-05-31T00:00:00Z')).toBe('05/31/2020');
        });
        it('should format the day of the date if a date is passed', () => {
            expect(dateFormattedMonthDayYear('2020-05-01T00:00:00Z')).toBe('05/01/2020');
        });
    });
    describe('formatPublicationDates', () => {
        const mockData = [
            {
                publication_date: "2020-05-01T00:00:00Z",
                certification_date: null
            },
            {
                publication_date: "2020-08-01T00:00:00Z",
                certification_date: "2020-08-31T00:00:00Z"
            },
            {
                publication_date: null,
                certification_date: null
            }
        ];
        const data = formatPublicationDates(mockData);
        it('handle null dates gracefully', () => {
            expect(data[0][1]).toBe('--');
            expect(data[2][0]).toBe('--');
            expect(data[2][1]).toBe('--');
        });
        it('should format dates if they exist', () => {
            expect(data[0][0]).toBe('05/01/2020');
            expect(data[1][0]).toBe('08/01/2020');
            expect(data[1][1]).toBe('08/31/2020');
        });
    });
    describe('formatMissingAccountBalancesData', () => {
        it('should handle no amount, or string amount being passed in results', () => {
            const badResultsData = formatMissingAccountBalancesData(mockBadResultsBalanceData);
            expect(badResultsData[0][1]).toBe('--');
            expect(badResultsData[0][2]).toBe('--');
            expect(badResultsData[1][1]).toBe('--');
            expect(badResultsData[1][2]).toBe('--');
        });
        it('should handle GTAS total being 0', () => {
            const badGTASData = formatMissingAccountBalancesData(mockBadGTASTotal);
            expect(badGTASData[0][2]).toBe('--');
            expect(badGTASData[1][2]).toBe('--');
        });
        it('should handle GTAS total being null', () => {
            mockBadGTASTotal.totalObligationsNotInGTAS = null;
            const badGTASData = formatMissingAccountBalancesData(mockBadGTASTotal);
            expect(badGTASData[0][2]).toBe('--');
            expect(badGTASData[1][2]).toBe('--');
        });
        it('should handle percent and money formatting', () => {
            const data = formatMissingAccountBalancesData(mockBalanceData);
            expect(data[0][1]).toBe('$2,323');
            expect(data[0][2]).toBe('5.2%');
            expect(data[1][1]).toBe('$0');
            expect(data[1][2]).toBe('0.0%');
        });
    });
    describe('showQuarterText', () => {
        it('should show quarter text for quarter one', () => {
            expect(showQuarterText(3)).toBeTruthy();
        });
        it('should show quarter text for quarter two', () => {
            expect(showQuarterText(6)).toBeTruthy();
        });
        it('should show quarter text for quarter three', () => {
            expect(showQuarterText(9)).toBeTruthy();
        });
        it('should show quarter text for quarter four', () => {
            expect(showQuarterText(12)).toBeTruthy();
        });
        it('should not show quarter text', () => {
            expect(showQuarterText(8)).toBeFalsy();
        });
    });
    describe('formatReportingDifferencesData', () => {
        it('should format reporting difference data', () => {
            expect(formatReportingDifferencesData(mockReportingDifferenceData)).toEqual(expect.arrayContaining([
                expect.arrayContaining([
                    "210-1503",
                    "$234,543,543",
                    "$456,438,768",
                    "-$221,895,225"
                ]),
                expect.arrayContaining([
                    "012-0212",
                    "$43,637,623",
                    "$20,486,582",
                    "$23,151,041"
                ])
            ]));
        });
        it('should format reporting difference data', () => {
            expect(formatReportingDifferencesData(mockBadReportingDifferenceData)).toEqual(expect.arrayContaining([
                expect.arrayContaining([
                    "--",
                    "--",
                    "--",
                    "--"
                ]),
                expect.arrayContaining([
                    "--",
                    "--",
                    "--",
                    "--"
                ])
            ]));
        });
    });
});
