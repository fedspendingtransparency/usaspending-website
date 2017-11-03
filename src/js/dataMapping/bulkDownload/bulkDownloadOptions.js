/**
 * bulkDownloadOptions.js
 * Created by Lizzie Salita 11/1/17
 */

export const awardDownloadOptions = {
    awardLevels: [
        {
            name: 'prime_awards',
            label: 'Prime Awards'
        },
        {
            name: 'sub_awards',
            label: 'Sub Awards'
        }
    ],
    awardTypes: [
        {
            name: 'contracts',
            label: 'Contracts'
        },
        {
            name: 'grants',
            label: 'Grants'
        },
        {
            name: 'direct_payments',
            label: 'Direct Payments'
        },
        {
            name: 'loans',
            label: 'Loans'
        },
        {
            name: 'other_financial_assistance',
            label: 'Other Financial Assistance'
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
    ]
};
