const agenciesTableFields = {
    defaultSortDirection: {
        agency_name: 'asc',
        budget_authority_amount: 'desc',
        percentage_of_total_budget_authority: 'desc'
    },
    defaultSortField: 'agency_name',
    order: [
        'agency_name',
        'budget_authority_amount',
        'percentage_of_total_budget_authority'
    ],
    agency_name: 'Agency Name',
    budget_authority_amount: 'Budgetary Resources',
    percentage_of_total_budget_authority: 'Percent of Total'
};

export default agenciesTableFields;
