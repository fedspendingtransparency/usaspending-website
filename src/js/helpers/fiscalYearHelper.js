/**
 * fiscalYearHelper.js
 * Created by Kevin Li 1/24/17
 */

import moment from 'moment';

export const earliestFiscalYear = 2008;
export const earliestExplorerYear = 2017;
export const earliestFederalAccountYear = 2017;

// number of days to wait after the close of each quarter before enabling it
export const quarterCloseWindow = 45;

// The current fiscal year is used on the Advanced Search and Download Center pages
export const currentFiscalYear = () => {
    // determine the current fiscal year
    const currentMonth = moment().month();
    let currentFY = moment().year();
    if (currentMonth >= 9) {
    // months are zero-indexed, so 9 is October
    // starting in October we are in the next fiscal year
        currentFY = moment().year() + 1;
    }

    return currentFY;
};

export const isFyValid = (fy) => {
    const fyVal = parseInt(fy, 10);
    return !!fyVal && fyVal >= earliestFiscalYear;
};

export const convertFYToDateRange = (fy) => {
    const startingYear = fy - 1;
    const endingYear = fy;

    return [`${startingYear}-10-01`, `${endingYear}-09-30`];
};

export const convertDateToFY = (date) => {
    // date needs to be a moment object
    let year = date.year();
    const month = date.month();

    if (month >= 9) {
        year += 1;
    }

    return year;
};

export const convertQuarterToDate = (qtr, year) => {
    // returns the last date of the fiscal quarter
    let date = '';
    let outputYear = parseInt(year, 10);
    switch (qtr) {
        case 1:
            outputYear = year - 1;
            date = `${outputYear}-12-31`;
            break;
        case 2:
            date = `${outputYear}-03-31`;
            break;
        case 3:
            date = `${outputYear}-06-30`;
            break;
        case 4:
            date = `${outputYear}-09-30`;
            break;
        default:
            date = '';
    }
    return date;
};

export const convertDateToQuarter = (date) => {
    // Returns the fiscal quarter that the date falls in
    let quarter = 0;
    const month = moment.isMoment(date)
        ? date.month()
        : moment(date).month();

    if (month >= 9 && month <= 11) {
        quarter = 1;
    }

    else if (month >= 0 && month <= 2) {
        quarter = 2;
    }

    else if (month >= 3 && month <= 5) {
        quarter = 3;
    }
    else if (month >= 6 && month <= 8) {
        quarter = 4;
    }

    return quarter;
};

export const nearestQuarterDate = (date) => {
    // Returns the nearest fiscal quarter date
    const momentDate = moment(date);
    const month = momentDate.month();
    const milliseconds = momentDate.valueOf();

    // get the previous and future quarter months
    let prev;
    let future;
    // first quarter
    if (month >= 9 && month <= 11) {
        prev = '10';
        future = '01';
    }
    // second quarter
    else if (month >= 0 && month <= 2) {
        prev = '01';
        future = '04';
    }
    // third quarter
    else if (month >= 3 && month <= 5) {
        prev = '04';
        future = '07';
    }
    // fourth quarter
    else if (month >= 6 && month <= 8) {
        prev = '07';
        future = '10';
    }

    const prevYear = momentDate.year();
    let futureYear = momentDate.year();
    if (month === 11 || month === 10 || month === 9) futureYear += 1;

    // get the previous & future quarter start dates for comparison
    const prevMillis = moment(`${prev}-01-${prevYear}`, "MM-DD-YYYY").valueOf();
    const futureMillis = moment(`${future}-01-${futureYear}`, "MM-DD-YYYY").valueOf();

    const prevDifference = milliseconds - prevMillis;
    const futureDifference = futureMillis - milliseconds;
    // return the closest quarter date
    return (prevDifference < futureDifference) ? prevMillis : futureMillis;
};

export const getTrailingTwelveMonths = () => {
    const oneYearAgo = moment().subtract(1, 'year');
    return [oneYearAgo.format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
};

export const allFiscalYears = (earliestYear = earliestFiscalYear, latestYear = currentFiscalYear()) => {
    const years = [...new Array(latestYear - earliestYear)];
    return years
        .reduce((listOfYears, _, i) => {
            listOfYears.push(earliestYear + i + 1);
            return listOfYears;
        }, [earliestYear])
        .sort((a, b) => b - a);
};

export const getFiscalYearsWithLatestAndAll = (earliestYear, latestYear) => []
    .concat([
        { value: 'latest', name: 'Trailing 12 Months' },
        { value: 'all', name: 'All Fiscal Years' }
    ])
    .concat(
        allFiscalYears(earliestYear, latestYear)
            .map((int) => ({ name: `FY ${int}`, value: int }))
    );
