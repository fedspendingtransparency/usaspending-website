/**
 * financialSystem.js
 * Created by Kwadwo Opoku-Debrah 04/04/19
 */

const tableFields = {
    columnWidths: {
        submissionDate: 0,
        id: 0,
        agency: 0,
        fedAccount: 0,
        programActivity: 300,
        objectClass: 300,
        fundingObligated: 0
    },
    defaultSortDirection: {
        submissionDate: 'desc',
        id: 'asc',
        agency: 'asc',
        fedAccount: 'asc',
        programActivity: 'asc',
        objectClass: 'asc',
        fundingObligated: 'desc'
    },
    table: {
        _order: [
            'submissionDate',
            'id',
            'agency',
            'fedAccount',
            'programActivity',
            'objectClass',
            'fundingObligated'
        ],
        _sortFields: {
            submissionDate: 'submission__reporting_fiscal_year',
            id: 'piid',
            agency: 'treasury_account__federal_account__reporting_agency_name',
            fedAccount: 'treasury_account__federal_account__account_title',
            programActivity: 'program_activity__program_activity_name',
            objectClass: 'object_class__object_class_name',
            fundingObligated: 'transaction_obligated_amount'
        },
        submissionDate: 'Submission Date',
        id: 'Award ID',
        agency: 'Agency',
        fedAccount: 'Federal Account Name',
        programActivity: 'Program Activity',
        objectClass: 'Object Class',
        fundingObligated: 'Funding Obligated'
    }
};

export default tableFields;
