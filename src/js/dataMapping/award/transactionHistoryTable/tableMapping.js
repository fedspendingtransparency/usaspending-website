export const transactionsTableMapping = {
    idv: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number'
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date'
        },
        {
            columnWidth: 150,
            displayName: 'Amount',
            right: true,
            title: 'federal_action_obligation'
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type'
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description'
        }
    ],
    loan: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number'
        },
        {
            columnWidth: 150,
            displayName: 'CFDA Number',
            right: false,
            title: 'cfda_number'
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date'
        },
        {
            columnWidth: 150,
            displayName: 'Loan Face Value',
            right: true,
            title: 'face_value_loan_guarantee'
        },
        {
            columnWidth: 250,
            displayName: 'Loan Subsidy Cost (Total Obligations To Date)',
            right: true,
            title: 'original_loan_subsidy_cost'
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type'
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description'
        }
    ],
    contract: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number'
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date'
        },
        {
            columnWidth: 150,
            displayName: 'Amount',
            right: false,
            title: 'federal_action_obligation'
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type'
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description'
        }
    ],
    assistance: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number'
        },
        {
            columnWidth: 150,
            displayName: 'Assistance Listing',
            right: false,
            title: 'cfda_number'
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date'
        },
        {
            columnWidth: 150,
            displayName: 'Amount',
            right: true,
            title: 'federal_action_obligation'
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type'
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description'
        }
    ]
};

export const federalAccountsTableMapping = {
    idv: [
        {
            columnWidth: 150,
            displayName: 'Submission Period',
            right: false,
            title: 'reporting_fiscal_date'
        },
        {
            columnWidth: 150,
            displayName: 'Award ID',
            right: false,
            title: 'piid'
        },
        {
            columnWidth: 300,
            displayName: 'Funding Agency',
            right: false,
            title: 'funding_agency_name'
        },
        {
            columnWidth: 300,
            displayName: 'Awarding Agency',
            right: false,
            title: 'awarding_agency_name'
        },
        {
            columnWidth: 100,
            displayName: 'DEFC',
            right: false,
            title: 'disaster_emergency_fund_code'
        },
        {
            columnWidth: 500,
            displayName: 'Federal Account Name',
            right: false,
            title: 'account_title'
        },
        {
            columnWidth: 300,
            displayName: 'Program Activity',
            right: false,
            title: 'program_activity_name'
        },
        {
            columnWidth: 300,
            displayName: 'Object Class',
            right: false,
            title: 'object_class'
        },
        {
            columnWidth: 250,
            displayName: 'Funding Obligated',
            right: true,
            title: 'transaction_obligated_amount'
        },
        {
            columnWidth: 250,
            displayName: 'Outlayed Amount (Beginning of FY to Period End)',
            right: true,
            title: 'gross_outlay_amount'
        }
    ],
    otherFunding: [
        {
            columnWidth: 150,
            displayName: 'Submission Period',
            right: false,
            title: 'reporting_fiscal_date'
        },
        {
            columnWidth: 500,
            displayName: 'Federal Account',
            right: false,
            title: 'account_title'
        },
        {
            columnWidth: 300,
            displayName: 'Funding Agency',
            right: false,
            title: 'funding_agency_name'
        },
        {
            columnWidth: 300,
            displayName: 'Awarding Agency',
            right: false,
            title: 'awarding_agency_name'
        },
        {
            columnWidth: 100,
            displayName: 'DEFC',
            right: false,
            title: 'disaster_emergency_fund_code'
        },
        {
            columnWidth: 300,
            displayName: 'Program Activity',
            right: false,
            title: 'program_activity_name'
        },
        {
            columnWidth: 300,
            displayName: 'Object Class',
            right: false,
            title: 'object_class'
        },
        {
            columnWidth: 250,
            displayName: 'Funding Obligated',
            right: true,
            title: 'transaction_obligated_amount'
        },
        {
            columnWidth: 250,
            displayName: 'Outlayed Amount (Beginning of FY to Period End)',
            right: true,
            title: 'gross_outlay_amount'
        }
    ]
};

export const subawardTableMapping = [
    {
        columnWidth: 150,
        displayName: 'Sub-Award ID',
        right: false,
        title: 'subaward_number'
    },
    {
        columnWidth: 300,
        displayName: 'Recipient Name',
        right: false,
        title: 'recipient_name'
    },
    {
        columnWidth: 150,
        displayName: 'Action Date',
        right: false,
        title: 'action_date'
    },
    {
        columnWidth: 150,
        displayName: 'Amount',
        right: true,
        title: 'amount'
    },
    {
        columnWidth: 300,
        displayName: 'Sub-Award Description',
        right: false,
        title: 'description'
    }
];
