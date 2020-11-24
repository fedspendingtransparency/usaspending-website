import {
    aboutTheDataQueryString,
    dateFormattedMonthDayYear,
    formatPublicationDates,
    formatMissingAccountBalancesData,
    showQuarterText
} from 'helpers/aboutTheDataHelper';

import { mockBalanceData, mockBadGTASTotal, mockBadResultsBalanceData } from '../mockData';

const defaultParams = {
    fiscalYear: 2020,
    fiscalPeriod: 8,
    search: 'yolo',
    page: 2,
    limit: 10,
    order: 'desc',
    sort: 'publication_date'
};

describe('About The Data Helper', () => {
    describe('aboutTheDataQueryString', () => {
        it('should return empty string when there are no params', () => {
            expect(aboutTheDataQueryString({})).toBe('');
        });
        it('should format a query string with all params', () => {
            expect(aboutTheDataQueryString(defaultParams).includes('?')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('fiscal_year=2020')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&fiscal_period=8')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&search=yolo')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&page=2')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&limit=10')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&order=desc')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&sort=publication_date')).toBeTruthy();
        });
        it('should not include any params not passed', () => {
            delete defaultParams.page;
            expect(aboutTheDataQueryString(defaultParams).includes('?')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('fiscal_year=2020')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&fiscal_period=8')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&search=yolo')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&page=2')).toBeFalsy();
            expect(aboutTheDataQueryString(defaultParams).includes('page=2')).toBeFalsy();
            expect(aboutTheDataQueryString(defaultParams).includes('page')).toBeFalsy();
            expect(aboutTheDataQueryString(defaultParams).includes('page=')).toBeFalsy();
            expect(aboutTheDataQueryString(defaultParams).includes('&limit=10')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&order=desc')).toBeTruthy();
            expect(aboutTheDataQueryString(defaultParams).includes('&sort=publication_date')).toBeTruthy();
        });
        it('should encode the search param', () => {
            defaultParams.search = 'beast mode';
            expect(aboutTheDataQueryString(defaultParams).includes('&search=beast%20mode')).toBeTruthy();
        });
    });
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
        it('should show quarter text for quarter one', () => {
            expect(showQuarterText(6)).toBeTruthy();
        });
        it('should show quarter text for quarter one', () => {
            expect(showQuarterText(9)).toBeTruthy();
        });
        it('should show quarter text for quarter one', () => {
            expect(showQuarterText(12)).toBeTruthy();
        });
        it('should show quarter text for quarter one', () => {
            expect(showQuarterText(8)).toBeFalsy();
        });
    });
});
