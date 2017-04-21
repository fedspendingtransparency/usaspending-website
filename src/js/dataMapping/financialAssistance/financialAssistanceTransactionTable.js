/**
 * financialAssistanceTransactionTable.js
 * Created by Lizzie Dabbs 03/06/17
 */

const tableSearchFields = {
    columnWidths: {
        modification: 200,
        action_date: 130,
        amount: 160,
        action_type_description: 200,
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
            'action_type_description',
            'description'
        ],
        _fields: [
            'modification_number',
            'action_date',
            'action_type_description',
            'assistance_data',
            'federal_action_obligation',
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
        action_type_description: 'Action Type',
        description: 'Description'
    }
};

export default tableSearchFields;
