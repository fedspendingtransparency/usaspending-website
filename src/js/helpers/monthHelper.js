/**
 * monthHelper.js
 * Created by michaelbray on 8/23/17.
 */

import * as FiscalYearHelper from './fiscalYearHelper';

const dayjs = require('dayjs');

// Months are 1-indexed strings, starting with the first month in the fiscal year, which is October
// We parse the month, using 1 by default if the month is not a number
// To account for the Fiscal Year beginning in October, we subtract three months
// As dayjs months are 0-indexed, we need to actually subtract four months
const monthConversion = (m) =>
    dayjs().month(isNaN(parseInt(m, 10)) ? 1 : parseInt(m, 10)).subtract(4, "months");

export const convertNumToMonth = (m) => monthConversion(m).format("MMMM");

export const convertNumToShortMonth = (m) => monthConversion(m).format("MMM");

export const convertMonthToFY = (m, y) => {
    const parsedMonth = isNaN(parseInt(m, 10)) ? 1 : parseInt(m, 10);
    const parsedYear = isNaN(parseInt(y, 10))
        ? FiscalYearHelper.currentFiscalYear()
        : parseInt(y, 10);

    if (parsedMonth <= 3) {
        return parsedYear - 1;
    }
    return parsedYear;
};

export const convertPeriodToDate = (period, fy) => {
    const parsedPeriod = isNaN(parseInt(period, 10)) ? 1 : parseInt(period, 10);
    const parsedFy = isNaN(parseInt(fy, 10))
        ? FiscalYearHelper.currentFiscalYear()
        : parseInt(fy, 10);
    const month = convertNumToMonth(period);
    // In Oct, Nov, and Dec, subtract 1 from the Fiscal Year for the calendar year
    const year = (parsedPeriod <= 3) ? parsedFy - 1 : parsedFy;
    return `${month} ${year}`;
};

export const fullMonthFromAbbr = (abbr) => {
    const mapping = [];
    mapping.Jan = 'January';
    mapping.Feb = 'February';
    mapping.Mar = 'March';
    mapping.Apr = 'April';
    mapping.May = 'May';
    mapping.Jun = 'June';
    mapping.Jul = 'July';
    mapping.Aug = 'August';
    mapping.Sep = 'September';
    mapping.Oct = 'October';
    mapping.Nov = 'November';
    mapping.Dec = 'December';

    return mapping[abbr];
};
