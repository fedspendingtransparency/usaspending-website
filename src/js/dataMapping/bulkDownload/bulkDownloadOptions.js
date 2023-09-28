/**
 * bulkDownloadOptions.js
 * Created by Lizzie Salita 11/1/17
 */

const dayjs = require('dayjs');

export const awardDownloadOptions = {
    awardLevels: [
        {
            id: 'prime-awards',
            lookupName: 'primeAwards',
            name: 'Prime Awards',
            filters: [
                'contracts',
                'idvs',
                'grants',
                'direct_payments',
                'loans',
                'insurance',
                'other'
            ]
        },
        {
            id: 'sub-awards',
            lookupName: 'subAwards',
            name: 'Sub-Awards',
            filters: [
                'sub_contracts',
                'sub_grants'
            ]
        }
    ],
    awardTypeLookups: {
        contracts: {
            label: 'Contracts',
            apiValues: ['A', 'B', 'C', 'D']
        },
        direct_payments: {
            label: 'Direct Payments',
            apiValues: ['10', '06']
        },
        grants: {
            label: 'Grants',
            apiValues: ['02', '03', '04', '05']
        },
        idvs: {
            label: 'Contract IDVs',
            apiValues: ['IDV_A', 'IDV_B', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E']
        },
        loans: {
            label: 'Loans',
            apiValues: ['07', '08']
        },
        insurance: {
            label: 'Insurance',
            apiValues: ['09']
        },
        other: {
            label: 'Other Financial Assistance',
            apiValues: ['11']
        },
        sub_grants: {
            label: 'Sub-Grants',
            apiValues: ['grant']
        },
        sub_contracts: {
            label: 'Sub-Contracts',
            apiValues: ['procurement']
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
    agencyTypes: [
        {
            name: 'awarding_agency',
            label: 'Awarding Agency',
            apiName: 'awarding',
            apiScopeName: 'awarding_agency_scope'
        },
        {
            name: 'funding_agency',
            label: 'Funding Agency',
            apiName: 'funding',
            apiScopeName: 'funding_agency_scope'
        }
    ],
    locationTypes: [
        {
            name: 'recipient_location',
            label: 'Recipient Location',
            apiName: 'recipient_locations',
            apiScopeName: 'recipient_scope'
        },
        {
            name: 'place_of_performance',
            label: 'Place of Performance',
            apiName: 'place_of_performance_locations',
            apiScopeName: 'place_of_performance_scope'
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
                startDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
                endDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            },
            {
                label: 'last 7 days',
                startDate: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            },
            {
                label: 'last 15 days',
                startDate: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            },
            {
                label: 'last 30 days',
                startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            },
            {
                label: 'last 60 days',
                startDate: dayjs().subtract(60, 'day').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            }
        ],
        column4: [
            {
                label: 'this month',
                startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            },
            {
                label: 'last 3 months',
                startDate: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            },
            {
                label: 'last 6 months',
                startDate: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            },
            {
                label: 'this year',
                startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD')
            },
            {
                label: 'last year',
                startDate: dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
                endDate: dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
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
            label: 'Account Balances (File\u00A0A)',
            apiName: 'account_balances',
            file: 'File A'
        },
        {
            name: 'accountBreakdown',
            label: 'Account Breakdown by Program Activity & Object Class (File\u00A0B)',
            apiName: 'object_class_program_activity',
            file: 'File B'
        },
        {
            name: 'accountBreakdownByAward',
            label: 'Account Breakdown by Award* (File\u00A0C)',
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
