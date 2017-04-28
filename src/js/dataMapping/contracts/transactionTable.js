/**
 * transactionTable.js
 * Created by Kevin Li
 */

const tableSearchFields = {
    columnWidths: {
        modification: 200,
        action_date: 150,
        amount: 200,
        action_type_description: 300,
        description: 180
    },
    defaultSortDirection: {
        modification: 'asc',
        action_date: 'desc',
        amount: 'desc',
        reason: 'desc',
        description: 'asc'
    },
    table: {
        _order: [
            'modification',
            'action_date',
            'amount',
            'action_type_description',
            'description'
        ],
        _mapping: {
            modification: 'modification_number',
            action_date: 'action_date',
            amount: 'federal_action_obligation',
            action_type_description: 'action_type_description',
            description: 'description'
        },
        modification: 'Modification Number',
        action_date: 'Action Date',
        amount: 'Amount',
        action_type_description: 'Reason for Modification',
        description: 'Description'
    }
};

export default tableSearchFields;
