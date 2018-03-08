/**
 * loanTransactionTable.js
 * Created by Emily Gullo 04/24/2017
 */

const tableSearchFields = {
    columnWidths: {
        modificationNumber: 0,
        actionDate: 0,
        faceValue: 0,
        subsidy: 0,
        actionType: 280,
        description: 380
    },
    defaultSortDirection: {
        modificationNumber: 'desc',
        actionDate: 'desc',
        faceValue: 'desc',
        subsidy: 'desc',
        actionType: 'asc',
        description: 'asc'
    },
    table: {
        _order: [
            'modificationNumber',
            'actionDate',
            'faceValue',
            'subsidy',
            'actionType',
            'description'
        ],
        _mapping: {
            modificationNumber: 'modification_number',
            actionDate: 'action_date',
            faceValue: 'face_value_loan_guarantee',
            subsidy: 'original_loan_subsidy_cost',
            actionType: 'action_type_description',
            description: 'description'
        },
        modificationNumber: 'Modification Number',
        actionDate: 'Action Date',
        faceValue: 'Loan Value',
        subsidy: 'Subsidy Cost',
        actionType: 'Assistance Type',
        description: 'Description'
    }
};

export default tableSearchFields;
