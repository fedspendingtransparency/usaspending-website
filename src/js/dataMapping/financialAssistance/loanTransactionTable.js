/**
 * loanTransactionTable.js
 * Created by Emily Gullo 04/24/2017
 */

const tableSearchFields = {
    columnWidths: {
        modification: 220,
        action_date: 200,
        face_value: 200,
        subsidy: 400,
        action_type: 300,
        description: 380
    },
    defaultSortDirection: {
        modification: 'desc',
        action_date: 'desc',
        face_value: 'desc',
        subsidy: 'desc',
        action_type: 'asc',
        description: 'asc'
    },
    table: {
        _order: [
            'modification',
            'action_date',
            'face_value',
            'subsidy',
            'action_type',
            'description'
        ],
        _fields: [
            'modification_number',
            'action_date',
            'face_value_loan_guarantee',
            'original_loan_subsidy_cost',
            'action_type_description',
            'description'
        ],
        _mapping: {
            modification: 'modification_number',
            action_date: 'action_date',
            face_value: 'face_value_loan_guarantee',
            subsidy: 'original_loan_subsidy_cost',
            action_type: 'action_type_description',
            description: 'description'
        },
        modification: 'Modification Number',
        action_date: 'Transaction Date',
        face_value: 'Face Value of Loan',
        subsidy: 'Estimated Cost to the Government',
        action_type: 'Assistance Type',
        description: 'Transaction Description'
    }
};

export default tableSearchFields;
