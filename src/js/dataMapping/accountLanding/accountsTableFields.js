const agenciesTableFields = {
    defaultSortDirection: {
        account_number: 'desc',
        account_name: 'asc',
        managing_agency: 'asc',
        budgetary_resources: 'desc'
    },
    order: [
        'account_number',
        'account_name',
        'managing_agency',
        'budgetary_resources'
    ],
    account_number: 'Account Number',
    account_name: 'Account Name',
    managing_agency: 'Managing Agency',
    budgetary_resources: 'Budgetary Resources'
};

export default agenciesTableFields;
