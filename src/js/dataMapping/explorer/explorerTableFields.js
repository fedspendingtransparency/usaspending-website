export const explorerTableFields = {
    defaultSortDirection: {
        name: 'asc',
        obligated_amount: 'desc',
        percent_of_total: 'desc'
    },
    defaultSortField: 'obligated_amount',
    order: [
        'name',
        'obligated_amount',
        'percent_of_total'
    ],
    name: 'Name',
    obligated_amount: 'Obligated Amount',
    percent_of_total: 'Percent of Total'
};

export const columns = [
    {
        title: 'Name',
        displayName: 'Name',
        defaultSortDirection: 'asc'
    },
    {
        title: 'Obligated Amount',
        displayName: 'Obligated Amount',
        defaultSortDirection: 'desc'
    },
    {
        title: 'Percent of Total',
        displayName: 'Percent of Total',
        defaultSortDirection: 'desc'
    }
];
