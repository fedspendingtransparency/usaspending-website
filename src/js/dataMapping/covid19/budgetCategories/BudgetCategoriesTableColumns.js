/**
 * BudgetCategoriesTableColumns.jsx
 * Created by James Lee 6/5/20
 */

export const budgetColumns = {
    agency: [
        {
            title: 'name',
            displayName: 'Agency'
        }
    ],
    federal_account: [
        {
            title: 'name',
            displayName: 'Federal Account'
        }
    ],
    object_class: [
        {
            title: 'name',
            displayName: 'Major Object Class'
        }
    ]
};

export const budgetDropdownFieldValues = {
    total_spending: {
        label: 'Total Spending',
        sortOrder: 1
    },
    award_spending: {
        label: 'Award Spending',
        sortOrder: 2
    },
    loan_spending: {
        label: 'Loan Spending',
        sortOrder: 3
    }
};

export const apiSpendingTypes = {
    total_spending: 'total',
    award_spending: 'award'
};

export const defaultSort = {
    federal_account: {
        total_spending: {
            sort: 'totalBudgetaryResources',
            order: 'desc'
        },
        award_spending: {
            sort: 'obligation',
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
            sort: 'obligation',
            order: 'desc'
        },
        loan_spending: {
            sort: 'faceValueOfLoan',
            order: 'desc'
        }
    },
    object_class: {
        total_spending: {
            sort: 'obligation',
            order: 'desc'
        },
        award_spending: {
            sort: 'obligation',
            order: 'desc'
        },
        loan_spending: {
            sort: 'faceValueOfLoan',
            order: 'desc'
        }
    }
};

export const budgetCategoriesNameSort = {
    agency: 'description',
    federal_account: 'code',
    object_class: 'code'
};
