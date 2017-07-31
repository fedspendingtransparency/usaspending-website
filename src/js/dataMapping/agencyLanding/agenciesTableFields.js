const agenciesTableFields = {
    defaultSortDirection: {
        agency_name: 'asc',
        budget_authority_amount: 'desc',
        percentage_of_total_budget_authority: 'desc'
    },
    // Fraction of the visible width the column should take up
    columnWidthPercentage: {
        agency_name: 0.35,
        budget_authority_amount: 0.3,
        percentage_of_total_budget_authority: 0.35
    },
    defaultSortField: 'agency_name',
    order: [
        'agency_name',
        'budget_authority_amount',
        'percentage_of_total_budget_authority'
    ],
    agency_name: 'Agency Name',
    budget_authority_amount: 'Budget Authority',
    percentage_of_total_budget_authority: 'Percent of Total U.S. Budget'
};

export default agenciesTableFields;
