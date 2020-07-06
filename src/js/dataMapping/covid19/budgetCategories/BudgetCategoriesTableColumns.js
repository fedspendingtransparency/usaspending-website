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
    agency: [
        {
            title: 'name',
            displayName: 'Agencies'
        }
    ],
    federal_account: [
        {
            title: 'name',
            displayName: 'Federal Accounts'
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

export const sortMapping = {
    totalBudgetaryResources: 'total_budgetary_resources',
    awardObligation: 'obligation',
    awardOutlay: 'outlay',
    totalObligation: 'obligation',
    totalOutlay: 'outlay',
    faceValueOfLoan: 'face_value_of_loan',
    countOfLoan: 'count',
    name: 'description'
};
