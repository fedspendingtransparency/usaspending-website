/**
 * monthHelper.js
 * Created by michaelbray on 8/23/17.
 */

import moment from "moment";
import * as FiscalYearHelper from './fiscalYearHelper';

// Months are 1-indexed strings, starting with the first month in the fiscal year, which is October
// We parse the month, using 1 by default if the month is not a number
// To account for the Fiscal Year beginning in October, we subtract three months
// As moment months are 0-indexed, we need to actually subtract four months
const monthConversion = (m) =>
    moment().month(isNaN(parseInt(m, 10)) ? 1 : parseInt(m, 10)).subtract(4, "months");

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
