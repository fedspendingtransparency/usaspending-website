/**
 * fiscalYearHelper.js
 * Created by Kevin Li 1/24/17
 */

import moment from 'moment';
import kGlobalConstants from 'GlobalConstants';

export const earliestFiscalYear = 2008;
export const earliestExplorerYear = 2017;
export const earliestFederalAccountYear = 2017;

// How many days after the close of Q1 we want to wait before updating the default Fiscal Year
export const newFiscalYearSwitchoverDelayDays = 45;

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

// The default fiscal year is used on the Spending Explorer and Federal Account pages
export const defaultFiscalYear = () => {
    // Building in emergency override for the current fiscal year into the config
    if (kGlobalConstants.OVERRIDE_FISCAL_YEAR && kGlobalConstants.FISCAL_YEAR) {
        return kGlobalConstants.FISCAL_YEAR;
    }

    // Calculate the configurable delay for Q1 close so that we aren't requesting data
    // for a new FY when no data exists in it yet
    const today = moment();
    const newFiscalYearStartDate = moment()
        .startOf('year')
        .add(newFiscalYearSwitchoverDelayDays, 'days');
    const newFiscalYearEndDate = moment([moment().year(), '9', '30']);

    if (today.isSameOrAfter(newFiscalYearStartDate) && today.isSameOrBefore(newFiscalYearEndDate)) {
        return currentFiscalYear();
    }

    return currentFiscalYear() - 1;
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
    const month = moment(date).month();

    if (month >= 10 && month <= 12) {
        quarter = 1;
    }

    else if (month >= 1 && month <= 3) {
        quarter = 2;
    }

    else if (month >= 4 && month <= 6) {
        quarter = 3;
    }
    else if (month >= 7 && month <= 9) {
        quarter = 4;
    }

    return quarter;
};
