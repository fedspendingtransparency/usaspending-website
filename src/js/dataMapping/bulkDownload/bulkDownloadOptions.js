/**
 * bulkDownloadOptions.js
 * Created by Lizzie Salita 11/1/17
 */

import moment from 'moment';

export const awardDownloadOptions = {
    awardLevels: [
        {
            id: 'prime-awards',
            lookupName: 'primeAwards',
            name: 'Prime Awards',
            filters: [
                'contracts',
                'direct_payments',
                'grants',
                'idvs',
                'loans',
                'other'
            ]
        },
        {
            id: 'sub-awards',
            lookupName: 'subAwards',
            name: 'Sub-Awards',
            filters: [
                'sub_grants',
                'sub_contracts'
            ]
        }
    ],
    awardTypeLookups: {
        contracts: {
            label: 'Contracts',
            apiName: 'contracts'
        },
        direct_payments: {
            label: 'Direct Payments',
            apiName: 'direct_payments'
        },
        grants: {
            label: 'Grants',
            apiName: 'grants'
        },
        idvs: {
            label: 'IDVs',
            apiName: 'idvs'
        },
        loans: {
            label: 'Loans',
            apiName: 'loans'
        },
        other: {
            label: 'Other',
            apiName: 'other_financial_assistance'
        },
        sub_grants: {
            label: 'Sub-Grants',
            apiName: 'grant'
        },
        sub_contracts: {
            label: 'Sub-Contracts',
            apiName: 'procurement'
        }
    },
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
    locationTypes: [
        {
            name: 'recipient_location',
            label: 'Recipient Location',
            apiName: 'recipient_locations'
        },
        {
            name: 'place_of_performance',
            label: 'Place of Performance',
            apiName: 'place_of_performance_locations'
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
            disabled: false
        },
        {
            name: 'pstxt',
            label: 'TXT (Pipe Delimited)',
            disabled: false
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

export const accountDownloadOptions = {
    accountLevels: [
        {
            name: 'federalAccount',
            label: 'Federal Account',
            apiName: 'federal_account',
            description: 'Aggregate of Treasury Accounts'
        },
        {
            name: 'treasuryAccount',
            label: 'Treasury Account',
            apiName: 'treasury_account',
            description: 'Includes Period of Availability'
        }
    ],
    submissionTypes: [
        {
            name: 'accountBalances',
            label: 'Account Balances',
            apiName: 'account_balances',
            file: 'File A'
        },
        {
            name: 'accountBreakdown',
            label: 'Account Breakdown by Program Activity & Object Class',
            apiName: 'object_class_program_activity',
            file: 'File B'
        },
        {
            name: 'accountBreakdownByAward',
            label: 'Account Breakdown by Award*',
            apiName: 'award_financial',
            file: 'File C'
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
    ]
};
