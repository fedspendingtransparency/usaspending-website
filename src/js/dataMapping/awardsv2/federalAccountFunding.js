/**
 * federalAccountFunding.js
 * Created by Kwadwo Opoku-Debrah 04/04/19
 */

const tableMapping = {
    columnWidths: {
        submissionDate: 0,
        id: 0,
        agency: 0,
        awardingAgencyName: 0,
        fedAccount: 0,
        programActivity: 300,
        objectClass: 300,
        fundingObligated: 0
    },
    defaultSortDirection: {
        submissionDate: 'desc',
        id: 'asc',
        agency: 'asc',
        awardingAgencyName: 'asc',
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
            'awardingAgencyName',
            'fedAccount',
            'programActivity',
            'objectClass',
            'fundingObligated'
        ],
        _sortFields: {
            submissionDate: 'reporting_fiscal_date',
            id: 'piid',
            agency: 'funding_agency_name',
            awardingAgencyName: 'awarding_agency_name',
            fedAccount: 'account_title',
            programActivity: 'program_activity',
            objectClass: 'object_class',
            fundingObligated: 'transaction_obligated_amount'
        },
        submissionDate: 'Submission Date',
        id: 'Award ID',
        agency: 'Funding Agency',
        awardingAgencyName: 'Awarding Agency',
        fedAccount: 'Federal Account Name',
        programActivity: 'Program Activity',
        objectClass: 'Object Class',
        fundingObligated: 'Funding Obligated'
    }
};

export default tableMapping;
