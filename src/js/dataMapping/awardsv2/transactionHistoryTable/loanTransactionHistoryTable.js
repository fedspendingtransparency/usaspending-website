/**
 * loanHistoryTransactionTable.js
 * Created by Jonathan Hill 10/11/19
 */

const tableSearchFields = {
    columnWidths: {
        modificationNumber: 0,
        actionDate: 0,
        faceValue: 0,
        subsidy: 0,
        actionTypeDescription: 380,
        description: 380
    },
    defaultSortDirection: {
        modificationNumber: 'desc',
        actionDate: 'desc',
        faceValue: 'desc',
        subsidy: 'desc',
        action_type: 'asc',
        description: 'asc'
    },
    table: {
        _order: [
            'modificationNumber',
            'actionDate',
            'faceValue',
            'subsidy',
            'actionTypeDescription',
            'description'
        ],
        _mapping: {
            modificationNumber: 'modification_number',
            actionDate: 'action_date',
            faceValue: 'face_value_loan_guarantee',
            subsidy: 'original_loan_subsidy_cost',
            actionTypeDescription: 'action_type',
            description: 'description'
        },
        modificationNumber: 'Modification Number',
        actionDate: 'Action Date',
        faceValue: 'Face Value',
        subsidy: 'Subsidy Cost',
        actionTypeDescription: 'Action Type',
        description: 'Description'
    }
};

export default tableSearchFields;
