import {
    dateFormattedMonthDayYear,
    formatPublicationDates,
    formatMissingAccountBalancesData,
    showQuarterText,
    formatReportingDifferencesData,
    getLastPeriodWithinQuarterByPeriod, isPeriodVisible, isPeriodSelectable, getPeriodWithTitleById
} from 'helpers/aboutTheDataHelper';

import {
    mockBalanceData,
    mockBadGTASTotal,
    mockBadResultsBalanceData,
    mockReportingDifferenceData,
    mockBadReportingDifferenceData,
    mockSubmissions
} from '../mockData/helpers/aboutTheDataHelper';

const mockPeriods = {
    data: {
        available_periods: mockSubmissions
    }
};

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
                    "$0",
                    "-$221,895,225"
                ]),
                expect.arrayContaining([
                    "012-0212",
                    "$0",
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
test('getLastPeriodWithinQuarterByPeriod returns correct value for each quarter', () => {
    expect(getLastPeriodWithinQuarterByPeriod('1')).toEqual('3');
    expect(getLastPeriodWithinQuarterByPeriod('2')).toEqual('3');
    expect(getLastPeriodWithinQuarterByPeriod('3')).toEqual('3');
    expect(getLastPeriodWithinQuarterByPeriod('4')).toEqual('6');
    expect(getLastPeriodWithinQuarterByPeriod('5')).toEqual('6');
    expect(getLastPeriodWithinQuarterByPeriod('6')).toEqual('6');
    expect(getLastPeriodWithinQuarterByPeriod('7')).toEqual('9');
    expect(getLastPeriodWithinQuarterByPeriod('8')).toEqual('9');
    expect(getLastPeriodWithinQuarterByPeriod('9')).toEqual('9');
    expect(getLastPeriodWithinQuarterByPeriod('10')).toEqual('12');
    expect(getLastPeriodWithinQuarterByPeriod('11')).toEqual('12');
    expect(getLastPeriodWithinQuarterByPeriod('12')).toEqual('12');
});

test('isPeriodSelectable determines when period is not selectable in the UI (only quarters are selectable pre 2020) ', () => {
    // 2018 serves as an example for every year prior to 2020:
    const twentyEighteen = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2018);
    expect(isPeriodSelectable(twentyEighteen, '1')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '2')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '3')).toEqual(true);
    expect(isPeriodSelectable(twentyEighteen, '4')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '5')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '6')).toEqual(true);
    expect(isPeriodSelectable(twentyEighteen, '7')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '8')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '9')).toEqual(true);
    expect(isPeriodSelectable(twentyEighteen, '10')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '11')).toEqual(false);
    expect(isPeriodSelectable(twentyEighteen, '12')).toEqual(true);

    // 2020: sad year RIP Kobe
    const twentyTwenty = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2020);
    expect(isPeriodSelectable(twentyTwenty, '1')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '2')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '3')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '4')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '5')).toEqual(false);
    expect(isPeriodSelectable(twentyTwenty, '6')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '7')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '8')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '9')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '10')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '11')).toEqual(true);
    expect(isPeriodSelectable(twentyTwenty, '12')).toEqual(true);
});

test('isPeriodVisible determines if a period has available data (perhaps may not be selectable but is still visible)', () => {
    // period may not exist in availablePeriods but is present implicitly via corresponding quarter
    const twentyEighteen = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2018);
    expect(isPeriodVisible(twentyEighteen, '1')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '2')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '3')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '4')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '5')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '6')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '7')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '8')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '9')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '10')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '11')).toEqual(true);
    expect(isPeriodVisible(twentyEighteen, '12')).toEqual(true);

    // 2020: sad year RIP Kobe
    const twentyTwenty = mockPeriods.data.available_periods.filter(({ submission_fiscal_year: y }) => y === 2020);
    expect(isPeriodVisible(twentyTwenty, '1')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '2')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '3')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '4')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '5')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '6')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '7')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '8')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '9')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '10')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '11')).toEqual(true);
    expect(isPeriodVisible(twentyTwenty, '12')).toEqual(true);

    const twentyTwentyOne = [];
    expect(isPeriodVisible(twentyTwentyOne, '3')).toEqual(false);
});

test('getPeriodWithTitleById returns correct title for period', () => {
    expect(getPeriodWithTitleById('1').title).toEqual('P01 - P02');
    expect(getPeriodWithTitleById('2').title).toEqual('P01 - P02');
    expect(getPeriodWithTitleById('3').title).toEqual('Q1 P03');
    expect(getPeriodWithTitleById('4').title).toEqual('P04');
    expect(getPeriodWithTitleById('5').title).toEqual('P05');
    expect(getPeriodWithTitleById('6').title).toEqual('Q2 P06');

    expect(getPeriodWithTitleById('7').title).toEqual('P07');
    expect(getPeriodWithTitleById('8').title).toEqual('P08');
    expect(getPeriodWithTitleById('9').title).toEqual('Q3 P09');
    expect(getPeriodWithTitleById('10').title).toEqual('P10');
    expect(getPeriodWithTitleById('11').title).toEqual('P11');
    expect(getPeriodWithTitleById('12').title).toEqual('Q4 P12');
});
