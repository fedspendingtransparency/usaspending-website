/**
 * loanHistoryTransactionTable.js
 * Created by Jonathan Hill 10/11/19
 */

const tableSearchFields = {
    columnWidths: {
        modificationNumber: 0,
        actionDate: 0,
        federalActionObligation: 0,
        originalLoanSubsidyCost: 0,
        actionTypeDescription: 380,
        description: 380
    },
    defaultSortDirection: {
        modificationNumber: 'desc',
        actionDate: 'desc',
        federalActionObligation: 'desc',
        originalLoanSubsidyCost: 'desc',
        action_type: 'asc',
        description: 'asc'
    },
    table: {
        _order: [
            'modificationNumber',
            'actionDate',
            'federalActionObligation',
            'originalLoanSubsidyCost',
            'actionTypeDescription',
            'description'
        ],
        _mapping: {
            modificationNumber: 'modification_number',
            actionDate: 'action_date',
            federalActionObligation: 'federal_action_obligation',
            originalLoanSubsidyCost: 'original_loan_subsidy_cost',
            actionTypeDescription: 'action_type',
            description: 'description'
        },
        modificationNumber: 'Modification Number',
        actionDate: 'Action Date',
        federalActionObligation: 'Face Value',
        originalLoanSubsidyCost: 'Subsidy Cost',
        actionTypeDescription: 'Action Type',
        description: 'Description'
    }
};

export default tableSearchFields;
