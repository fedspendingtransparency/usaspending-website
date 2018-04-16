/**
 * bulkDownloadOptions.js
 * Created by Lizzie Salita 11/1/17
 */

import moment from 'moment';

export const awardDownloadOptions = {
    awardLevels: [
        {
            name: 'primeAwards',
            label: 'Prime Awards',
            apiName: 'prime_awards'
        },
        {
            name: 'subAwards',
            label: 'Sub Awards',
            apiName: 'sub_awards'
        }
    ],
    awardTypes: [
        {
            name: 'contracts',
            label: 'Contracts',
            apiName: 'contracts'
        },
        {
            name: 'grants',
            label: 'Grants',
            apiName: 'grants'
        },
        {
            name: 'directPayments',
            label: 'Direct Payments',
            apiName: 'direct_payments'
        },
        {
            name: 'loans',
            label: 'Loans',
            apiName: 'loans'
        },
        {
            name: 'otherFinancialAssistance',
            label: 'Other Financial Assistance',
            apiName: 'other_financial_assistance'
        }
    ],
    dateTypes: [
        {
            name: 'action_date',
            label: 'Action Date',
            description: 'When an award action is issued or signed by an agency in its award system'
        },
        {
            name: 'last_modified_date',
            label: 'Last Modified Date',
            description: 'When the details of a reported award action were last updated'
        }
    ],
    fileFormats: [
        {
            name: 'csv',
            label: 'CSV',
            disabled: false
        },
        {
            name: 'tsv',
            label: 'TSV',
            disabled: true
        },
        {
            name: 'xml',
            label: 'XML',
            disabled: true
        }
    ],
    dateRangeButtons: {
        column3: [
            {
                label: 'yesterday',
                startDate: moment().subtract(1, 'day').format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'day').format('YYYY-MM-DD')
            },
            {
                label: 'last 7 days',
                startDate: moment().subtract(1, 'week').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                label: 'last 15 days',
                startDate: moment().subtract(15, 'day').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                label: 'last 30 days',
                startDate: moment().subtract(30, 'day').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                label: 'last 60 days',
                startDate: moment().subtract(60, 'day').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            }
        ],
        column4: [
            {
                label: 'this month',
                startDate: moment().startOf('month').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                label: 'last 3 months',
                startDate: moment().subtract(3, 'month').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                label: 'last 6 months',
                startDate: moment().subtract(6, 'month').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                label: 'this year',
                startDate: moment().startOf('year').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                label: 'last year',
                startDate: moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
            }
        ]
    }
};
