export const accountColumns = {
    budget_function: [
        {
            title: 'name',
            displayName: 'Budget Function'
        },
        {
            title: 'obligatedAmount',
            displayName: 'Obligated Amount'
        },
        {
            title: 'percentOfTotalObligations',
            displayName: '% of Total Obligations'
        },
        {
            title: 'grossOutlayAmount',
            displayName: 'Gross Outlay Amount'
        }
    ],
    program_activity: [
        {
            title: 'name',
            displayName: 'Program Activity'
        },
        {
            title: 'obligatedAmount',
            displayName: 'Obligated Amount',
            right: true
        },
        {
            title: 'percentOfTotalObligations',
            displayName: '% of Total Obligations',
            right: true
        },
        {
            title: 'grossOutlayAmount',
            displayName: 'Gross Outlay Amount',
            right: true
        }
    ],
    object_class: [
        {
            title: 'name',
            displayName: 'Object Class'
        },
        {
            title: 'obligatedAmount',
            displayName: 'Obligated Amount',
            right: true
        },
        {
            title: 'percentOfTotalObligations',
            displayName: '% of Total Obligations',
            right: true
        },
        {
            title: 'grossOutlayAmount',
            displayName: 'Gross Outlay Amount',
            right: true
        }
    ],
    federal_account: [
        {
            title: 'name',
            displayName: 'Federal Account'
        },
        {
            title: 'obligatedAmount',
            displayName: 'Obligated Amount',
            right: true
        },
        {
            title: 'percentOfTotalObligations',
            displayName: '% of Total Obligations',
            right: true
        },
        {
            title: 'grossOutlayAmount',
            displayName: 'Gross Outlay Amount',
            right: true
        }
    ]
};

export const subagencyColumns = [
    {
        title: 'name',
        displayName: 'Sub-Agency Name'
    },
    {
        title: 'totalObligations',
        displayName: 'Award Obligations',
        right: true
    },
    {
        title: 'transactionCount',
        displayName: 'Number of Transactions',
        right: true
    },
    {
        title: 'newAwardCount',
        displayName: 'Number of New Awards',
        right: true
    }
];

export const subagencyFields = {
    name: 'name',
    totalObligations: 'total_obligations',
    transactionCount: 'transaction_count',
    newAwardCount: 'new_award_count'
};

export const accountFields = {
    name: 'name',
    grossOutlayAmount: 'gross_outlay_amount',
    obligatedAmount: 'obligated_amount',
    percentOfTotalObligations: 'obligated_amount'
};
