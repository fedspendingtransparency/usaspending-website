import { aboutTheDataQueryString, dateFormattedMonthDayYear, formatPublicationDates } from 'helpers/aboutTheDataHelper';

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
});
