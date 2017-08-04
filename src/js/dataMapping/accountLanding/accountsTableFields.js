const agenciesTableFields = {
    defaultSortDirection: {
        account_number: 'desc',
        account_name: 'asc',
        managing_agency: 'asc',
        budget_authority_amount: 'desc'
    },
    order: [
        'account_number',
        'account_name',
        'managing_agency',
        'budget_authority_amount'
    ],
    account_number: 'Account Number',
    account_name: 'Agency Name',
    managing_agency: 'Managing Agency',
    budget_authority_amount: 'Budgetary Resources'
};

export default agenciesTableFields;
