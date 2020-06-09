/**
 * BudgetCategoriesTableColumns.jsx
 * Created by James Lee 6/5/20
 */
export const budgetDropdownColumns = {
    total_spending: [
        {
            title: 'totalObligations',
            displayName: 'Total Obligations'
        },
        {
            title: 'totalOutlays',
            displayName: 'Total Outlays'
        }
    ],
    award_spending: [
        {
            title: 'awardTotalObligations',
            displayName: 'Total Obligations'
        },
        {
            title: 'awardTotalOutlays',
            displayName: 'Total Outlays'
        }
    ]
    // face_value_of_loans: [
    //     {
    //         title: 'faceValueOfLoans',
    //         displayName: 'Face Value of Loans'
    //     }
    // ]
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
    defCode: 'def_code',
    emergencyFundingMandate: 'emergency_funding_mandate'
};

export const budgetFields = {
    totalObligations: 'total_obligations',
    totalOutlays: 'total_outlays',
    awardTotalObligations: 'award_total_obligations',
    awardTotalOutlays: 'award_total_outlays'
    // faceValueOfLoans: 'face_value_of_loans'
};

export const budgetDropdownFieldValues = {
    total_spending: 'Total Spending',
    award_spending: 'Award Spending'
    // face_value_of_loans: 'Face Value of Loans'
};

