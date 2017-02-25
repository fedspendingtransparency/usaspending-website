/**
 * transactionTable.js
 * Created by Kevin Li
 */

const tableSearchFields = {
    columnWidths: {
        modification: 230,
        action_date: 200,
        amount: 220,
        description: 380
    },
    defaultSortDirection: {
        modification: 'desc',
        action_date: 'desc',
        amount: 'desc',
        description: 'asc'
    },
    table: {
        _order: [
            'modification',
            'action_date',
            'amount',
            'description'
        ],
        _mapping: {
            modification: 'modification_number',
            action_date: 'action_date',
            amount: 'federal_action_obligation',
            description: 'description'
        },
        modification: 'Modification Number',
        action_date: 'Action Date',
        amount: 'Amount',
        description: 'Description'
    }
};

export default tableSearchFields;
