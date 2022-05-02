const accountsTableFields = {
    defaultSortDirection: {
        accountNumber: 'desc',
        accountName: 'asc',
        managingAgency: 'asc',
        budgetaryResources: 'desc'
    },
    modelMapping: {
        accountNumber: 'account_number',
        accountName: 'account_name',
        managingAgency: 'managing_agency',
        budgetaryResources: 'budgetary_resources'
    },
    order: [
        'accountNumber',
        'accountName',
        'managingAgency',
        'budgetaryResources'
    ],
    accountNumber: 'Account Number',
    accountName: 'Account Name',
    managingAgency: 'Owning Agency',
    budgetaryResources: 'Budgetary Resources'
};

export default accountsTableFields;
