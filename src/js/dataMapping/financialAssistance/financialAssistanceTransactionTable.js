/**
 * financialAssistanceTransactionTable.js
 * Created by Lizzie Dabbs 03/06/17
 */

const tableSearchFields = {
    columnWidths: {
        modificationNumber: 0,
        actionDate: 0,
        federalActionObligation: 0,
        actionTypeDescription: 380,
        description: 380
    },
    defaultSortDirection: {
        modificationNumber: 'desc',
        actionDate: 'desc',
        federalActionObligation: 'desc',
        action_type: 'asc',
        description: 'asc'
    },
    table: {
        _order: [
            'modificationNumber',
            'actionDate',
            'federalActionObligation',
            'actionTypeDescription',
            'description'
        ],
        _mapping: {
            modificationNumber: 'modification_number',
            actionDate: 'action_date',
            federalActionObligation: 'federal_action_obligation',
            actionTypeDescription: 'action_type',
            description: 'description'
        },
        modificationNumber: 'Modification Number',
        actionDate: 'Action Date',
        federalActionObligation: 'Amount',
        actionTypeDescription: 'Action Type',
        description: 'Description'
    }
};

export default tableSearchFields;
