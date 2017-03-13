/**
 * grantTransactionTable.js
 * Created by Lizzie Dabbs 03/06/17
 */

const tableSearchFields = {
    columnWidths: {
        modification: 230,
        action_date: 200,
        amount: 200,
        assistance_type: 380,
        description: 380
    },
    defaultSortDirection: {
        modification: 'desc',
        action_date: 'desc',
        amount: 'desc',
        assistance_type: 'desc',
        description: 'asc'
    },
    table: {
        _order: [
            'modification',
            'action_date',
            'amount',
            'assistance_type',
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
            assistance_type: 'assistance_type',
            description: 'description'
        },
        modification: 'Modification Number',
        action_date: 'Action Date',
        amount: 'Amount',
        assistance_type: 'Assistance Type',
        description: 'Description'
    }
};

export default tableSearchFields;
