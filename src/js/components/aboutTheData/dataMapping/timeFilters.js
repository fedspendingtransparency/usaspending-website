// the last periods in a quarter
export const lastPeriods = ["3", "6", "9", "12"];

export const cssOrderClassByPeriodId = {
    1: 'order-1',
    2: 'order-1',
    3: 'order-2',
    4: 'order-3',
    5: 'order-4',
    6: 'order-5',
    7: 'order-6',
    8: 'order-7',
    9: 'order-8',
    10: 'order-9',
    11: 'order-10',
    12: 'order-11'
};

export const periodsPerQuarter = [
    [
        { title: 'P01 - P02', id: '2', className: 'double-period' },
        { title: 'Q1 P03', id: '3', className: 'last-period-per-quarter' }
    ],
    [
        { title: 'P04', id: '4' },
        { title: 'P05', id: '5' },
        { title: 'Q2 P06', id: '6', className: 'last-period-per-quarter' }
    ],
    [
        { title: 'P07', id: '7' },
        { title: 'P08', id: '8' },
        { title: 'Q3 P09', id: '9', className: 'last-period-per-quarter' }
    ],
    [
        { title: 'P10', id: '10' },
        { title: 'P11', id: '11' },
        { title: 'Q4 P12', id: '12', className: 'last-period-per-quarter' }
    ]
];
