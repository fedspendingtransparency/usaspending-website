/**
 * grantTransactionTable.js
 * Created by Lizzie Dabbs 03/06/17
 */

const tableSearchFields = {
    columnWidths: {
        modification: 230,
        action_date: 200,
        amount: 200,
        action_type: 380,
        description: 380
    },
    defaultSortDirection: {
        modification: 'desc',
        action_date: 'desc',
        amount: 'desc',
        action_type: 'asc',
        description: 'asc'
    },
    table: {
        _order: [
            'modification',
            'action_date',
            'amount',
            'action_type',
            'description'
        ],
        _fields: [
            'modification_number',
            'action_date',
            'action_type',
            'assistance_data',
            'federal_action_obligation',
            'description'
        ],
        _mapping: {
            modification: 'modification_number',
            action_date: 'action_date',
            amount: 'federal_action_obligation',
            action_type: 'action_type',
            description: 'description'
        },
        modification: 'Modification Number',
        action_date: 'Action Date',
        amount: 'Amount',
        action_type: 'Action Type',
        description: 'Description'
    }
};

export default tableSearchFields;
