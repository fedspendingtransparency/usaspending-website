const agenciesTableFields = {
    defaultSortDirection: {
        agency_profile_link: 'desc',
        budget_authority_amount: 'desc',
        percentage_of_total_budget_authority: 'desc'
    },
    defaultSortField: 'agency_name',
    order: [
        'agency_profile_link',
        'budget_authority_amount',
        'percentage_of_total_budget_authority'
    ],
    agency_profile_link: 'Agency Name',
    budget_authority_amount: 'Budget Authority',
    percentage_of_total_budget_authority: 'Percent of Total U.S. Budget'
};

export default agenciesTableFields;
