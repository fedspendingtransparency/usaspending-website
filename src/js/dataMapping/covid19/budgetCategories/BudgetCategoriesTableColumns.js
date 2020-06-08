/**
 * BudgetCategoriesTableColumns.jsx
 * Created by James Lee 6/5/20
 */
export const budgetDropdownColumns = {
    total_spending: [
        {
            title: 'totalObligatedAmount',
            displayName: 'Total Obligated Amount'
        },
        {
            title: 'totalOutlayedAmount',
            displayName: 'Total Outlayed Amount'
        }
    ],
    award_spending: [
        {
            title: 'awardTotalObligatedAmount',
            displayName: 'Total Obligated Amount'
        },
        {
            title: 'awardTotalOutlayedAmount',
            displayName: 'Total Outlayed Amount'
        }
    ],
    face_value_of_loans: [
        {
            title: 'faceValueOfLoans',
            displayName: 'Face Value of Loans'
        }
    ]
};

export const budgetColumns = {
    def_codes: [
        {
            title: 'defCode',
            displayName: "DEF Codes"
        },
        {
            title: 'emergencyFundingMandate',
            displayName: 'Emergency Funding Mandate'
        }
    ],
    agencies: [
        {
            title: 'name',
            displayName: 'Agencies'
        }
    ],
    object_classes: [
        {
            title: 'name',
            displayName: 'Object Classes'
        }
    ],
    program_activities: [
        {
            title: 'name',
            displayName: 'Program Activities'
        }
    ],
    federal_accounts: [
        {
            title: 'name',
            displayName: 'Federal Accounts'
        }
    ]
};

export const budgetFields = {
    totalObligatedAmount: 'total_obligated_amount',
    totalOutlayedAmount: 'total_outlayed_amount',
    awardTotalObligatedAmount: 'award_total_obligated_amount',
    awardTotalOutlayedAmount: 'award_total_outlayed_amount',
    faceValueOfLoans: 'face_value_of_loans'
};

export const budgetDropdownFieldValues = {
    total_spending: 'Total Spending',
    award_spending: 'Award Spending',
    face_value_of_loans: 'Face Value of Loans'
};

