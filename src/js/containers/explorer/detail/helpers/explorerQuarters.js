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

export const lastPeriodByQuarter = {
    1: '3',
    2: '6',
    3: '9',
    4: '12'
};

export const quarters = ['1', '2', '3', '4'];
export const periods = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

// before 2020, we show periods in such a way that relative to the api we're actually selecting quarters.
const periodsPerQuarterPre2020 = [
    [{ title: '1 - 3', id: '1', className: 'double-period' }],
    [{ title: '4 - 6', id: '2', className: 'double-period' }],
    [{ title: '7 - 9', id: '3', className: 'double-period' }],
    [{ title: '10 - 12', id: '4', className: 'double-period-extra-wide' }]
];

// after 2020, we show periods, in such a way that relative to the api we're allowing selection of actual periods.
export const periodsPerQuarterPost2020 = [
    [
        { title: '1 - 2', id: '2', className: 'double-period' },
        { title: '3', id: '3' }
    ],
    [
        { title: '4', id: '4' },
        { title: '5', id: '5' },
        { title: '6', id: '6' }
    ],
    [
        { title: '7', id: '7' },
        { title: '8', id: '8' },
        { title: '9', id: '9' }
    ],
    [
        { title: '10', id: '10' },
        { title: '11', id: '11' },
        { title: '12', id: '12' }
    ]
];

// for 2020, we show periods and quarters; for quarters 1 - 2, as before 2020; for quarters 3 - 4, as we do after 2020.
export const periodsPerQuarterDuring2020 = [
    [{ title: '1 - 3', id: '3', className: 'double-period' }],
    [{ title: '4 - 6', id: '6', className: 'double-period' }],
    [
        { title: '7', id: '7' },
        { title: '8', id: '8' },
        { title: '9', id: '9' }
    ],
    [
        { title: '10', id: '10' },
        { title: '11', id: '11' },
        { title: '12', id: '12' }
    ]
];

export const getPeriodsPerQuarterByFy = (fy) => {
    if (fy > 2020) return periodsPerQuarterPost2020;
    if (fy === 2020) return periodsPerQuarterDuring2020;
    return periodsPerQuarterPre2020;
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
