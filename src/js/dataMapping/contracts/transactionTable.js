/**
 * transactionTable.js
 * Created by Kevin Li
 */

const tableSearchFields = {
    columnWidths: {
        modification: 230,
        action_date: 200,
        amount: 220,
        action_type_description: 340,
        description: 380
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
