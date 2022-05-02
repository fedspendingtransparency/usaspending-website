/* eslint-disable import/prefer-default-export */
/**
 * federalAccountFunding.js
 * Created by Kwadwo Opoku-Debrah 04/04/19
 */

export const idvTableMapping = {
    columnWidths: {
        submissionDate: 0,
        id: 0,
        agency: 0,
        awardingAgencyName: 0,
        disasterEmergencyFundCode: 0,
        fedAccount: 0,
        programActivity: 300,
        objectClass: 300,
        fundingObligated: 0,
        grossOutlayAmount: 0
    },
    defaultSortDirection: {
        submissionDate: 'desc',
        id: 'asc',
        agency: 'asc',
        awardingAgencyName: 'asc',
        disasterEmergencyFundCode: 'desc',
        fedAccount: 'asc',
        programActivity: 'asc',
        objectClass: 'asc',
        fundingObligated: 'desc',
        grossOutlayAmount: 'desc'
    },
    table: {
        _order: [
            'submissionDate',
            'id',
            'agency',
            'awardingAgencyName',
            'disasterEmergencyFundCode',
            'fedAccount',
            'programActivity',
            'objectClass',
            'fundingObligated',
            'grossOutlayAmount'
        ],
        _sortFields: {
            submissionDate: 'reporting_fiscal_date',
            id: 'piid',
            agency: 'funding_agency_name',
            awardingAgencyName: 'awarding_agency_name',
            disasterEmergencyFundCode: 'disaster_emergency_fund_code',
            fedAccount: 'account_title',
            programActivity: 'program_activity',
            objectClass: 'object_class',
            fundingObligated: 'transaction_obligated_amount',
            grossOutlayAmount: 'gross_outlay_amount'
        },
        submissionDate: 'Submission Period',
        id: 'Award ID',
        agency: 'Funding Agency',
        awardingAgencyName: 'Awarding Agency',
        disasterEmergencyFundCode: 'DEFC',
        fedAccount: 'Federal Account Name',
        programActivity: 'Program Activity',
        objectClass: 'Object Class',
        fundingObligated: 'Funding Obligated',
        grossOutlayAmount: 'Outlayed Amount (Beginning of FY to Period End)'
    }
};

export const nonIdvTableMapping = {
    columnWidths: {
        submissionDate: 0,
        agency: 0,
        awardingAgencyName: 0,
        disasterEmergencyFundCode: 0,
        fedAccount: 0,
        programActivity: 300,
        objectClass: 300,
        fundingObligated: 0,
        grossOutlayAmount: 0
    },
    defaultSortDirection: {
        submissionDate: 'desc',
        agency: 'asc',
        awardingAgencyName: 'asc',
        disasterEmergencyFundCode: 'desc',
        fedAccount: 'asc',
        programActivity: 'asc',
        objectClass: 'asc',
        fundingObligated: 'desc',
        grossOutlayAmount: 'desc'
    },
    table: {
        _order: [
            'submissionDate',
            'fedAccount',
            'agency',
            'awardingAgencyName',
            'disasterEmergencyFundCode',
            'programActivity',
            'objectClass',
            'fundingObligated',
            'grossOutlayAmount'
        ],
        _sortFields: {
            submissionDate: 'reporting_fiscal_date',
            agency: 'funding_agency_name',
            awardingAgencyName: 'awarding_agency_name',
            disasterEmergencyFundCode: 'disaster_emergency_fund_code',
            fedAccount: 'account_title',
            programActivity: 'program_activity',
            objectClass: 'object_class',
            fundingObligated: 'transaction_obligated_amount',
            grossOutlayAmount: 'gross_outlay_amount'
        },
        submissionDate: 'Submission Period',
        fedAccount: 'Federal Account',
        agency: 'Funding Agency',
        awardingAgencyName: 'Awarding Agency',
        disasterEmergencyFundCode: 'DEFC',
        programActivity: 'Program Activity',
        objectClass: 'Object Class',
        fundingObligated: 'Funding Obligated',
        grossOutlayAmount: 'Outlayed Amount (Beginning of FY to Period End)'
    }
};

