/**
 * loanHistoryTransactionTable.js
 * Created by Jonathan Hill 10/11/19
 */

const tableSearchFields = {
    columnWidths: {
        modificationNumber: 0,
        cfdaNumber: 0,
        actionDate: 0,
        faceValue: 0,
        subsidy: 0,
        actionTypeDescription: 0,
        description: 380
    },
    defaultSortDirection: {
        modificationNumber: 'desc',
        cfdaNumber: 'desc',
        actionDate: 'desc',
        faceValue: 'desc',
        subsidy: 'desc',
        action_type: 'asc',
        description: 'asc'
    },
    table: {
        _order: [
            'modificationNumber',
            'cfdaNumber',
            'actionDate',
            'faceValue',
            'subsidy',
            'actionTypeDescription',
            'description'
        ],
        _mapping: {
            modificationNumber: 'modification_number',
            cfdaNumber: 'cfda_number',
            actionDate: 'action_date',
            faceValue: 'face_value_loan_guarantee',
            subsidy: 'original_loan_subsidy_cost',
            actionTypeDescription: 'action_type',
            description: 'description'
        },
        modificationNumber: 'Modification Number',
        cfdaNumber: 'CFDA Number',
        actionDate: 'Action Date',
        faceValue: 'Loan Face Value',
        subsidy: 'Loan Subsidy Cost (Total Obligations To Date)',
        actionTypeDescription: 'Action Type',
        description: 'Transaction Description'
    }
};

export default tableSearchFields;
