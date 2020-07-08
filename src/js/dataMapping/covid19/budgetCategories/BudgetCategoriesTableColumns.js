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
    ],
    loan_spending: [
        {
            title: 'faceValueOfLoan',
            displayName: 'Face Value of Loans'
        },
        {
            title: 'countOfLoan',
            displayName: 'Count of Loans'
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
    ],
    def_code: [
        {
            title: 'defCode',
            displayName: "DEF Code"
        },
        {
            title: 'emergencyFundingMandate',
            displayName: 'Emergency Funding Mandate'
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
        totalObligation: 'obligation',
        totalOutlay: 'outlay'
    },
    award_spending: {
        awardObligation: 'obligation',
        awardOutlay: 'outlay'
    },
    loan_spending: {
        faceValueOfLoan: 'face_value_of_loan',
        countOfLoan: 'count'
    }
};

export const budgetDropdownFieldValues = {
    total_spending: 'Total Spending',
    award_spending: 'Award Spending',
    loan_spending: 'Loan Spending'
};

export const apiSpendingTypes = {
    total_spending: 'total',
    award_spending: 'award'
};

export const budgetCategoriesCssMappingTypes = {
    federal_account: 'federal-account',
    def_code: 'def-code',
    agency: 'agency',
    object_class: 'object-class'
};

export const budgetCategoriesSort = {
    federal_account: {
        total_spending: {
            sort: 'totalBudgetaryResources',
            order: 'desc'
        },
        award_spending: {
            sort: 'awardObligation',
            order: 'desc'
        },
        loan_spending: {
            sort: 'faceValueOfLoan',
            order: 'desc'
        }
    },
    def_code: {
        total_spending: {
            sort: 'totalBudgetaryResources',
            order: 'desc'
        },
        award_spending: {
            sort: 'awardObligation',
            order: 'desc'
        },
        loan_spending: {
            sort: 'faceValueOfLoan',
            order: 'desc'
        }
    },
    agency: {
        total_spending: {
            sort: 'totalBudgetaryResources',
            order: 'desc'
        },
        award_spending: {
            sort: 'awardObligation',
            order: 'desc'
        },
        loan_spending: {
            sort: 'faceValueOfLoan',
            order: 'desc'
        }
    },
    object_class: {
        total_spending: {
            sort: 'totalObligation',
            order: 'desc'
        },
        award_spending: {
            sort: 'awardObligation',
            order: 'desc'
        },
        loan_spending: {
            sort: 'faceValueOfLoan',
            order: 'desc'
        }
    }
};
