/**
 * awardTableColumns.js
 * Created by Kevin Li 9/8/17
 */

/**
 * TODO: Refactor the way columns are being created to reduce repetitive code
 */
const contractColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date (Period of Performance)',
    'End Date (Period of Performance)',
    'Award Amount',
    'Funding Agency',
    'Funding Sub Agency',
    'Contract Award Type',
    'Contract Description',
    'Signed Date',
    'Potential Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Awarding Office',
    'Funding Office',
    'Recipient Address Line 1',
    'Recipient Address Line 2',
    'Recipient Address Line 3',
    'Recipient Country',
    'Recipient State',
    'Recipient Province',
    'Recipient County',
    'Recipient City',
    'Recipient Zip Code',
    'Place of Performance City',
    'Place of Performance Zip Code',
    'Place of Performance Country',
    'Place of Performance State',
    'Place of Performance Province',
    'Contract Pricing Type',
    'Recipient Congressional District',
    'Recipient Phone Number',
    'Recipient Fax Number',
    'Place of Performance Congressional District',
    'Place of Performance County',
    'Parent Award ID',
    'IDV Type',
    'IDC Type',
    'IDV Agency Identifier',
    'Multiple or Single Award IDV',
    'Solicitation ID',
    'Solicitation Procedures',
    'Number of Offers Received',
    'Extent Competed',
    'Set-Aside Type',
    'Commercial Item Acquisition Procedures',
    'Commercial Item Test Program',
    'Evaluated Preference',
    'FedBizOpps',
    'Small Business Competitiveness Demonstration Program',
    'PSC Code',
    'NAICS Code',
    'NAICS Description',
    'DoD Claimant Program Code',
    'Program, System, or Equipment Code',
    'Information Technology Commercial Item Category',
    'Sea Transportation',
    'Clinger-Cohen Act Compliant',
    'Subject To Construction Wage Rate Requirements',
    'Subject To Labor Standards',
    'Subject To Materials, Supplies, Articles & Equip',
    'Consolidated Contract',
    'Cost or Pricing Data',
    'Fair Opportunity Limited Sources',
    'Foreign Funding',
    'Interagency Contracting Authority',
    'Major program',
    'Multi Year Contract',
    'Price Evaluation Adjustment Preference Percent Difference',
    'Program Acronym',
    'Purchase Card as Payment Method',
    'Subcontracting Plan',
    'Sub-Award ID',
    'Sub-Awardee Name',
    'Action Date',
    'Sub-Award Amount',
    'Prime Award ID',
    'Prime Recipient Name'
];

const grantColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date (Period of Performance)',
    'End Date (Period of Performance)',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type',
    'Funding Agency',
    'Funding Sub Agency'
];

const loanColumns = [
    'Award ID',
    'Recipient Name',
    'Issued Date',
    'Loan Value',
    'Subsidy Cost',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Funding Agency',
    'Funding Sub Agency'
];

const directPaymentColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date (Period of Performance)',
    'End Date (Period of Performance)',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type',
    'Funding Agency',
    'Funding Sub Agency'
];

const otherColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date (Period of Performance)',
    'End Date (Period of Performance)',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type',
    'Funding Agency',
    'Funding Sub Agency'
];

const idvColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date (Period of Performance)',
    'Last Date to Order',
    'Award Amount',
    'Funding Agency',
    'Funding Sub Agency',
    'Contract Award Type',
    'Contract Description',
    'Signed Date',
    'Potential Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Awarding Office',
    'Funding Office',
    'Recipient Address Line 1',
    'Recipient Address Line 2',
    'Recipient Address Line 3',
    'Recipient Country',
    'Recipient State',
    'Recipient Province',
    'Recipient County',
    'Recipient City',
    'Recipient Zip Code',
    'Place of Performance City',
    'Place of Performance Zip Code',
    'Place of Performance Country',
    'Place of Performance State',
    'Place of Performance Province',
    'Contract Pricing Type',
    'Recipient Congressional District',
    'Recipient Phone Number',
    'Recipient Fax Number',
    'Place of Performance Congressional District',
    'Place of Performance County',
    'Parent Award ID',
    'IDV Type',
    'IDC Type',
    'IDV Agency Identifier',
    'Multiple or Single Award IDV',
    'Solicitation ID',
    'Solicitation Procedures',
    'Number of Offers Received',
    'Extent Competed',
    'Set-Aside Type',
    'Commercial Item Acquisition Procedures',
    'Commercial Item Test Program',
    'Evaluated Preference',
    'FedBizOpps',
    'Small Business Competitiveness Demonstration Program',
    'PSC Code',
    'NAICS Code',
    'NAICS Description',
    'DoD Claimant Program Code',
    'Program, System, or Equipment Code',
    'Information Technology Commercial Item Category',
    'Sea Transportation',
    'Clinger-Cohen Act Compliant',
    'Subject To Construction Wage Rate Requirements',
    'Subject To Labor Standards',
    'Subject To Materials, Supplies, Articles & Equip',
    'Consolidated Contract',
    'Cost or Pricing Data',
    'Fair Opportunity Limited Sources',
    'Foreign Funding',
    'Interagency Contracting Authority',
    'Major program',
    'Multi Year Contract',
    'Price Evaluation Adjustment Preference Percent Difference',
    'Program Acronym',
    'Purchase Card as Payment Method',
    'Subcontracting Plan',
    'Sub-Award ID',
    'Sub-Awardee Name',
    'Action Date',
    'Sub-Award Amount',
    'Prime Award ID',
    'Prime Recipient Name'
];

const subawardColumns = [
    'Subaward ID',
    'Subaward Type',
    'Subawardee Name',
    'Subaward Date',
    'Subaward Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Prime Award ID',
    'Prime Recipient Name'
];

const awardColWidth = 280;
const covidColWidth = 190;
const descWidth = 380;
const datesWidth = 210;
const covidColor = '#6E338E';

const defaultContract = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'End Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: awardColWidth },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Contract Award Type' }
];

const defaultGrant = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'End Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: awardColWidth },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const defaultDirectPayment = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'End Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: awardColWidth },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const defaultLoan = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Issued Date' },
    { title: 'Loan Value', displayName: 'Face Value of Loan' },
    {
        title: 'Subsidy Cost',
        displayName: 'Loan Subsidy Cost',
        subtitle: '(Total Obligations To Date)',
        customWidth: 240
    },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' }
];


const defaultOther = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'End Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: awardColWidth },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const defaultIdvColumns = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date', subtitle: '(Period of Performance)', customWidth: datesWidth },
    { title: 'Last Date to Order', displayName: 'Ordering Period End Date', customWidth: 170 },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: awardColWidth },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Contract Award Type' }
];

const covidObligationsCol = {
    title: 'COVID-19 Obligations',
    background: covidColor,
    customWidth: covidColWidth
};

const covidOutlaysCol = {
    title: 'COVID-19 Outlays',
    background: covidColor,
    customWidth: covidColWidth
};

const covidDefCCol = {
    title: 'def_codes',
    displayName: 'DEFC'
};

const descriptionCol = {
    title: 'Description',
    displayName: 'Base Transaction Description',
    customWidth: descWidth
};

const tabsWithAdditionalCols = [
    defaultContract,
    defaultGrant,
    defaultDirectPayment,
    defaultLoan,
    defaultOther,
    defaultIdvColumns
];

// Insert COVID columns
tabsWithAdditionalCols.forEach((tab) => {
    tab.splice(5, 0, descriptionCol);
    tab.splice(6, 0, covidDefCCol);
    tab.splice(7, 0, covidObligationsCol);
    tab.splice(8, 0, covidOutlaysCol);
});

const defaultSub = [
    { title: 'Sub-Award ID' },
    { title: 'Sub-Awardee Name' },
    { title: 'Action Date' },
    { title: 'Sub-Award Amount' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Prime Award ID' },
    { title: 'Prime Recipient Name' }
];

export const availableColumns = (type) => {
    const columns = {
        contracts: contractColumns,
        grants: grantColumns,
        direct_payments: directPaymentColumns,
        loans: loanColumns,
        other: otherColumns,
        idvs: idvColumns,
        subcontracts: subawardColumns,
        subgrants: subawardColumns
    };

    return columns[type];
};

export const defaultColumns = (type) => {
    const columns = {
        contracts: defaultContract,
        grants: defaultGrant,
        direct_payments: defaultDirectPayment,
        loans: defaultLoan,
        other: defaultOther,
        idvs: defaultIdvColumns,
        subcontracts: defaultSub,
        subgrants: defaultSub
    };

    return columns[type];
};

export const defaultSort = (type) => {
    const columns = {
        contracts: 'Award Amount',
        grants: 'Award Amount',
        direct_payments: 'Award Amount',
        loans: 'Loan Value',
        other: 'Award Amount',
        idvs: 'Award Amount',
        subcontracts: 'Sub-Award Amount',
        subgrants: 'Sub-Award Amount'
    };

    return columns[type];
};

export const apiFieldByTableColumnName = {
    DEFC: 'def_codes',
    Description: 'Description'
};
