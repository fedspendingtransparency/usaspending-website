/**
 * bulkDownloadOptions.js
 * Created by Lizzie Salita 11/1/17
 */
import React from "react";
import { Link } from 'react-router';
import {awardTypeGroups, bulkDownloadAwardTypeGroups} from "../search/awardType";

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
            apiValues: bulkDownloadAwardTypeGroups.contracts
        },
        direct_payments: {
            label: 'Direct Payments',
            apiValues: bulkDownloadAwardTypeGroups.direct_payments
        },
        grants: {
            label: 'Grants',
            apiValues: bulkDownloadAwardTypeGroups.grants
        },
        idvs: {
            label: 'Contract IDVs',
            apiValues: bulkDownloadAwardTypeGroups.idvs
        },
        loans: {
            label: 'Loans',
            apiValues: bulkDownloadAwardTypeGroups.loans
        },
        insurance: {
            label: 'Insurance',
            apiValues: bulkDownloadAwardTypeGroups.insurance
        },
        other: {
            label: 'Other Financial Assistance',
            apiValues: bulkDownloadAwardTypeGroups.other
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
            apiScopeName: 'awarding_agency_scope',
            description: "Issues and administers the award, usually paying for funding out of its own budget"
        },
        {
            name: 'funding_agency',
            label: 'Funding Agency',
            apiName: 'funding',
            apiScopeName: 'funding_agency_scope',
            description: "Pays for the majority of funds for an award out of its budget"
        }
    ],
    locationTypes: [
        {
            name: 'recipient_location',
            label: 'Recipient Location',
            apiName: 'recipient_locations',
            apiScopeName: 'recipient_scope',
            description: "Legal business address of the recipient"
        },
        {
            name: 'place_of_performance',
            label: 'Place of Performance',
            apiName: 'place_of_performance_locations',
            apiScopeName: 'place_of_performance_scope',
            description: "Principal place of business, where the majority of the work is performed"
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
    timePeriodTypes: [
        {
            name: 'time_period',
            label: 'Time Period',
            description: 'Pre-selected periods of time, including government fiscal year (FY)'
        },
        {
            name: 'date_picker',
            label: 'Date Picker',
            description: 'Date ranges may span up to one year'
        }
    ],
    dateRangeButtons: [
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
        },
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
};

export const accountDownloadOptions = {
    accountLevels: [
        {
            name: 'federalAccount',
            label: 'Federal Account',
            apiName: 'federal_account',
            description: (
                <>
                    A set of Treasury spending accounts that are group under <br/>
                    a <Link style={{color: '#005ea2'}} to="/download_center/custom_account_data?glossary=federal-account">Federal Account Symbol</Link>   
                </>
            )
        },
        {
            name: 'treasuryAccount',
            label: 'Treasury Account',
            apiName: 'treasury_account',
            description: (
                <>
                    A <Link style={{color: '#005ea2'}} to="/download_center/custom_account_data?glossary=treasury-account-symbol-tas">Treasury Account Symbol</Link> code assigned to each <br/>
                    appropriation, receipt, or fund account including Period of <br/>
                    Availability.
                </>
            )
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
