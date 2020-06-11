/**
 * BudgetCategoriesTableColumns.jsx
 * Created by James Lee 6/5/20
 */
export const budgetDropdownColumns = {
    total_spending: [
        {
            title: 'totalOutlay',
            displayName: 'Total Outlays'
        },
        {
            title: 'totalObligation',
            displayName: 'Total Obligations'
        }
    ],
    award_spending: [
        {
            title: 'awardOutlay',
            displayName: 'Award Outlays'
        },
        {
            title: 'awardObligation',
            displayName: 'Award Obligations'
        }
    ]
};

export const totalBudgetaryResourcesColumn = {
    title: 'totalBudgetaryResources',
    displayName: 'Total Budgetary Resources'
};

export const budgetColumns = {
    federal_account: [
        {
            title: 'name',
            displayName: 'Federal Accounts'
        }
    ],
    def_code: [
        {
            title: 'defCode',
            displayName: "Public Laws"
        },
        {
            title: 'emergencyFundingMandate',
            displayName: 'Emergency Funding Mandate'
        }
    ],
    agency: [
        {
            title: 'name',
            displayName: 'Agencies'
        }
    ],
    object_class: [
        {
            title: 'name',
            displayName: 'Object Classes'
        }
    ]
};

export const budgetColumnFields = {
    defCode: 'code',
    emergencyFundingMandate: 'description',
    name: 'description'
};

export const budgetFields = {
    total_spending: {
        totalObligation: 'total_obligation',
        totalOutlay: 'total_outlay'
    },
    award_spending: {
        awardObligation: 'award_obligation',
        awardOutlay: 'award_outlay'
    }
};

export const budgetDropdownFieldValues = {
    total_spending: 'Total Spending',
    award_spending: 'Award Spending'
};
