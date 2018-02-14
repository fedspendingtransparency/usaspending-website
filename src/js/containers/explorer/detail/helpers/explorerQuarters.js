/**
 * explorerQuarters.js
 * Created by Kevin Li 2/12/18
 */

import moment from 'moment';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

export const mostRecentQuarter = () => {
    // go back 45 days prior to today
    const todayAdjusted = moment('02/15/2018', 'MM/DD/YYYY').subtract(FiscalYearHelper.quarterCloseWindow, 'days');
    // determine the quarter that date was in
    let quarter = FiscalYearHelper.convertDateToQuarter(todayAdjusted);
    // use currentFiscalYear because we will perform the same logic (but in a more quarter-specific
    // manner) here as defaultFiscalYear
    let year = FiscalYearHelper.currentFiscalYear();

    // now go back one additional quarter (so we go to the most recently closed quarter, rather than
    // the active in-progress quarter)
    quarter -= 1;
    if (quarter === 0) {
        quarter = 4;
        year -= 1;
    }

    return {
        quarter,
        year
    };
};

export const availableQuarters = () => {
    const current = mostRecentQuarter();
    console.log('current', current);
    const available = [];
    let firstQuarter = 1;
    if (current.year === FiscalYearHelper.earliestExplorerYear) {
        // in the first spending explorer year, the first quarter is not available
        firstQuarter = 2;
    }

    for (let i = firstQuarter; i <= current.quarter; i++) {
        available.push(i);
    }

    return {
        quarters: available,
        year: current.year
    };
};

