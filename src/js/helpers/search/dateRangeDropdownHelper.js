/**
 * dateRangeDropdownHelper.js
 * Created by Brian Petway
 */

const dayjs = require('dayjs');

export const dateRangeDropdownTimePeriods = [
    {
        value: 'yesterday',
        startDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        label: 'Yesterday'
    },
    {
        value: 'last-seven-days',
        startDate: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Last 7 days'
    },
    {
        value: 'last-fifteen-days',
        startDate: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Last 15 days'
    },
    {
        value: 'last-thirty-days',
        startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Last 30 days'
    },
    {
        value: 'last-sixty-days',
        startDate: dayjs().subtract(60, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Last 60 days'
    },
    {
        value: 'current-month',
        startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'This month'
    },
    {
        value: 'last-three-months',
        startDate: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Last 3 months'
    },
    {
        value: 'last-six-months',
        startDate: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Last 6 months'
    },
    {
        value: 'last-twelve-months',
        startDate: dayjs().subtract(12, 'month').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Last 12 months'
    },
    {
        value: 'last-calendar-year',
        startDate: dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
        endDate: dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
        label: 'Last year (Jan - Dec)'
    },
    {
        value: 'year-to-date',
        startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        label: 'Year-to-date (Jan - today)'
    }
];

export default dateRangeDropdownTimePeriods;
