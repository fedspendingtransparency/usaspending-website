/**
 * fiscalYearHelper.js
 * Created by Kevin Li 1/24/17
 */

import moment from 'moment';

export const earliestFiscalYear = 2009;

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
