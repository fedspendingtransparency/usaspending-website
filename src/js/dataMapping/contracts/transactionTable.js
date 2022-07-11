/**
 * transactionTable.js
 * Created by Kevin Li
 */

const tableSearchFields = {
    columnWidths: {
        modificationNumber: 0,
        actionDate: 0,
        federalActionObligation: 0,
        actionTypeDescription: 340,
        description: 380
    },
    defaultSortDirection: {
        modificationNumber: 'asc',
        actionDate: 'desc',
        federalActionObligation: 'desc',
        actionTypeDescription: 'desc',
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
        description: 'Transaction Description'
    }
};

export default tableSearchFields;
