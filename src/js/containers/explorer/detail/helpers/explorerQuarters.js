/**
 * explorerQuarters.js
 * Created by Kevin Li 2/12/18
 */

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
    [{ title: '1 - 3', id: '1', className: 'triple-period' }],
    [{ title: '4 - 6', id: '2', className: 'triple-period' }],
    [{ title: '7 - 9', id: '3', className: 'triple-period' }],
    [{ title: '10 - 12', id: '4', className: 'triple-period--extra-wide' }]
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
    [{ title: '1 - 3', id: '3', className: 'triple-period' }],
    [{ title: '4 - 6', id: '6', className: 'triple-period' }],
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
