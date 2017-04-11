/**
 * financialSystem.js
 * Created by Kevin Li 3/6/17
 */

const tableFields = {
    columnWidths: {
        submissionDate: 250,
        tas: 250,
        programActivity: 300,
        objectClass: 300,
        fundingObligated: 280
    },
    defaultSortDirection: {
        submissionDate: 'desc',
        tas: 'desc',
        programActivity: 'asc',
        objectClass: 'asc',
        fundingObligated: 'desc'
    },
    table: {
        _fields: [
            'financial_accounts_by_awards_id',
            'certified_date',
            'treasury_account',
            'object_class',
            'program_activity_code',
            'program_activity_name',
            'obligations_incurred_total_by_award_cpe'
        ],
        _order: [
            'submissionDate',
            'tas',
            'programActivity',
            'objectClass',
            'fundingObligated'
        ],
        _sortFields: {
            submissionDate: 'certified_date',
            tas: 'treasury_account__tas_rendering_label',
            programActivity: 'program_activity_name',
            objectClass: 'object_class__object_class_name',
            fundingObligated: 'obligations_incurred_total_by_award_cpe'
        },
        _mapping: {
            submissionDate: 'submissionDate',
            tas: 'tas',
            programActivity: 'programActivity',
            objectClass: 'objectClass',
            fundingObligated: 'fundingObligated'
        },
        submissionDate: 'Submission Date',
        tas: 'TAS',
        programActivity: 'Program Activity',
        objectClass: 'Object Class',
        fundingObligated: 'Funding Obligated'
    }
};

export default tableFields;
