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
    object_class: [
        {
            title: 'name',
            displayName: 'Object Class'
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
    federal_account: [
        {
            title: 'name',
            displayName: 'Federal Account'
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
    ]
};

export const subagencyColumns = [
    {
        title: 'name',
        displayName: 'Agency Name'
    },
    {
        title: 'totalObligations',
        displayName: 'Award Obligations'
    },
    {
        title: 'transactionCount',
        displayName: 'Number of Transactions'
    },
    {
        title: 'newAwardCount',
        displayName: 'Number of New Awards'
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
