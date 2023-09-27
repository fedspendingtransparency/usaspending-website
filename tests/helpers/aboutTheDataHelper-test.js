/**
 * @jest-environment jsdom
 */
import {
    renderDeadline,
    formatPublicationDates,
    formatMissingAccountBalancesData,
    showQuarterText,
    formatReportingDifferencesData,
    getLastPeriodWithinQuarterByPeriod,
    isPeriodVisible,
    isPeriodSelectable,
    getPeriodWithTitleById,
    convertDatesToMilliseconds,
    getAllAgenciesEmail,
    getAgencyDetailEmail,
    getFederalBudget
} from 'helpers/aboutTheDataHelper';

import {
    mockBalanceData,
    mockBadGTASTotal,
    mockBadResultsBalanceData,
    mockReportingDifferenceData,
    mockBadReportingDifferenceData,
    mockSubmissions,
    mockDates,
    badMockDates
} from '../mockData/helpers/aboutTheDataHelper';

import { mockAPI } from '../containers/aboutTheData/mockData';

const mockFederalTotals = mockAPI.totals.data.results;

const mockPeriods = {
    data: {
        available_periods: mockSubmissions
    }
};

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

describe('About The Data Helper', () => {
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
            // or, 5hr offset America/New_York UTC-05:000
            expect(timeZone).toBe('America/New_York');
            expect(data[0][0]).toBe('04/30/2020');
            expect(data[1][0]).toBe('07/31/2020');
            expect(data[1][1]).toBe('08/30/2020');
        });
    });
    test.each([
        ['publication_date', '2020-05-01T00:00:00Z', { submissionDueDate: '2020-05-01T00:00:00Z' }, '04/30/2020'],
        ['certification_date', '2020-05-01T00:00:00Z', { certificationDueDate: '2020-05-01T00:00:00Z' }, '04/30/2020'],
        ['publication_date', '2020-05-01T00:00:00Z', { submissionDueDate: null }, '--'],
        ['certification_date', '2020-05-01T00:00:00Z', { certificationDueDate: null }, '--'],
        ['publication_date', '2020-05-01T00:00:00Z', { submissionDueDate: '' }, '--'],
        ['certification_date', '2020-05-01T00:00:00Z', { certificationDueDate: '' }, '--'],
        ['publication_date', null, {}, '--'],
        ['certification_date', null, {}, '--']
    ])('renderDeadline: for title %s when deadline is %s returns %s', (title, timestamp, obj, rtrn) => {
        expect(timeZone).toBe('America/New_York');
        if (title === 'publication_date') {
            expect(renderDeadline(title, obj)).toEqual(rtrn);
        }
        else {
            expect(renderDeadline(title, obj)).toEqual(rtrn);
        }
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
            expect(data[0][2]).toBe('5.16%');
            expect(data[1][1]).toBe('$0');
            expect(data[1][2]).toBe('0.00%');
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
                    "$234,543,543.00",
                    "$0.00",
                    "-$221,895,225.00"
                ]),
                expect.arrayContaining([
                    "012-0212",
                    "$0.00",
                    "$20,486,582.00",
                    "$23,151,041.00"
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
    describe('convertDatesToMilliseconds', () => {
        it('should convert dates to a number', () => {
            const dates = convertDatesToMilliseconds(mockDates);
            expect(typeof dates[0].publication_date).toBe('number');
            expect(typeof dates[0].certification_date).toBe('number');
            expect(typeof dates[1].publication_date).toBe('number');
            expect(typeof dates[1].certification_date).toBe('number');
        });
        it('should handle no data', () => {
            const dates = convertDatesToMilliseconds(badMockDates);
            expect(dates[0].publication_date).toBe(0);
            expect(dates[0].certification_date).toBe(0);
            expect(dates[1].publication_date).toBe(0);
            expect(dates[1].certification_date).toBe(0);
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
    expect(getPeriodWithTitleById('3').title).toEqual('Q1 / P03');
    expect(getPeriodWithTitleById('4').title).toEqual('P04');
    expect(getPeriodWithTitleById('5').title).toEqual('P05');
    expect(getPeriodWithTitleById('6').title).toEqual('Q2 / P06');

    expect(getPeriodWithTitleById('7').title).toEqual('P07');
    expect(getPeriodWithTitleById('8').title).toEqual('P08');
    expect(getPeriodWithTitleById('9').title).toEqual('Q3 / P09');
    expect(getPeriodWithTitleById('10').title).toEqual('P10');
    expect(getPeriodWithTitleById('11').title).toEqual('P11');
    expect(getPeriodWithTitleById('12').title).toEqual('Q4 / P12');
});


test.each([
    ['2021', '3', 'submissions', 'https://www.usaspending.gov/submission-statistics/?fy=2021&period=3&tab=submissions'],
    ['2020', '4', 'submissions', 'https://www.usaspending.gov/submission-statistics/?fy=2020&period=4&tab=submissions'],
    ['2020', '3', 'publications', 'https://www.usaspending.gov/submission-statistics/?fy=2020&period=3&tab=publications'],
    ['2017', '12', 'submissions', 'https://www.usaspending.gov/submission-statistics/?fy=2017&period=12&tab=submissions'],
    ['2020', '3', 'submissions', 'https://www.usaspending.gov/submission-statistics/?fy=2020&period=3&tab=submissions']
])('when fy is %s, period is %s and active tab is %s the body returns the correct url: %s', (fy, period, tab, url) => {
    const v = getAllAgenciesEmail(fy, period, tab);
    expect(v.body.includes('fy')).toEqual(true);
    expect(v.body.includes('period')).toEqual(true);
    expect(v.body.includes('tab')).toEqual(true);
    expect(v.body.includes(fy)).toEqual(true);
    expect(v.body.includes(period)).toEqual(true);
    expect(v.body.includes(tab)).toEqual(true);
    const baseURL = 'https://www.usaspending.gov/submission-statistics/?';
    const queryParams = encodeURIComponent(url.split('?')[1]);
    expect(v.body.includes(`${baseURL}${queryParams}`)).toEqual(true);
});

test('getAgencyDetailEmail', () => {
    expect(getAgencyDetailEmail('test', '123').body.includes('test')).toEqual(true);
    expect(getAgencyDetailEmail('test', '123').subject.includes('test')).toEqual(true);
});

test('getFederalBudget returns total budgetary resources for the given latest period', () => {
    expect(getFederalBudget(mockFederalTotals, {
        year: 2020,
        period: 7
    })).toEqual(10000);
    expect(getFederalBudget(mockFederalTotals, {
        year: 2020,
        period: 6
    })).toEqual(8000.72);
    expect(getFederalBudget(mockFederalTotals, {
        year: 2000,
        period: 8
    })).toEqual(10002);
});
