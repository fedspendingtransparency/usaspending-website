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
    // face_value_of_loans: [
    //     {
    //         title: 'faceValueOfLoans',
    //         displayName: 'Face Value of Loans'
    //     }
    // ]
};

export const totalBudgetaryResourcesColumn = {
    title: 'totalBudgetaryResources',
    displayName: 'Total Budgetary Resources'
};

export const budgetColumns = {
    agencies: [
        {
            title: 'name',
            displayName: 'Agencies'
        }
    ],
    def_codes: [
        {
            title: 'defCode',
            displayName: "DEF Code"
        },
        {
            title: 'emergencyFundingMandate',
            displayName: 'Emergency Funding Mandate'
        }
    ],
    object_classes: [
        {
            title: 'name',
            displayName: 'Object Classes'
        }
    ],
    federal_accounts: [
        {
            title: 'name',
            displayName: 'Federal Accounts'
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
    // faceValueOfLoans: 'face_value_of_loans'
};

export const budgetDropdownFieldValues = {
    total_spending: 'Total Spending',
    award_spending: 'Award Spending'
    // face_value_of_loans: 'Face Value of Loans'
};
