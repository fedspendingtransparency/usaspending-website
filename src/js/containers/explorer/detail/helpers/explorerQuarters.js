/**
 * explorerQuarters.js
 * Created by Kevin Li 2/12/18
 */

import moment from 'moment';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

export const handlePotentialStrings = (input) => {
    if (typeof input === 'string') {
        return parseInt(input, 10);
    }
    return input;
};

export const mostRecentQuarter = () => {
    // go back 45 days prior to today
    const todayAdjusted = moment().subtract(FiscalYearHelper.quarterCloseWindow, 'days');
    // determine the quarter that date was in
    let quarter = FiscalYearHelper.convertDateToQuarter(todayAdjusted);

    const year = FiscalYearHelper.defaultFiscalYear();

    // now go back one additional quarter (so we go to the most recently closed quarter, rather than
    // the active in-progress quarter)
    quarter -= 1;
    if (quarter === 0) {
        quarter = 4;
    }

    return {
        quarter,
        year
    };
};

export const lastCompletedQuarterInFY = (fy) => {
    // get the most recent available quarter and year
    const current = mostRecentQuarter();
    const sanitizedFY = handlePotentialStrings(fy);

    if (sanitizedFY < current.year) {
        // user wants a previous year's quarters
        // since we are no longer on that year, it must be completed
        return {
            quarter: 4,
            year: sanitizedFY
        };
    }

    // otherwise, return the current year's quarter
    return current;
};

export const availableQuartersInFY = (fy) => {
    const sanitizedFY = handlePotentialStrings(fy);
    // get the most recent available quarter and year
    const lastQuarter = lastCompletedQuarterInFY(sanitizedFY);
    if (lastQuarter.year > sanitizedFY) {
        // FY is in the future
        return {
            quarters: [],
            year: sanitizedFY
        };
    }

    const available = [];
    let firstQuarter = 1;
    if (sanitizedFY === FiscalYearHelper.earliestExplorerYear) {
        // in the first spending explorer year, the first quarter is not available
        firstQuarter = 2;
    }

    for (let i = firstQuarter; i <= lastQuarter.quarter; i++) {
        if (sanitizedFY >= FiscalYearHelper.earliestExplorerYear) {
            available.push(i);
        }
    }

    return {
        quarters: available,
        year: lastQuarter.year
    };
};

export const defaultQuarters = () => {
    const current = mostRecentQuarter();
    return availableQuartersInFY(current.year);
};
