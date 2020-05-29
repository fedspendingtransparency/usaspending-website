/**
 * awardTableColumns.js
 * Created by Kevin Li 9/8/17
 */

const contractColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date',
    'End Date',
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
    'Recipient DUNS Number',
    'Recipient Ultimate DUNS Number',
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
    'Sub-Award Date',
    'Sub-Award Amount',
    'Prime Award ID',
    'Prime Recipient Name'
];

const grantColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date',
    'End Date',
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
    'Start Date',
    'End Date',
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
    'Start Date',
    'End Date',
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
    'Start Date',
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
    'Recipient DUNS Number',
    'Recipient Ultimate DUNS Number',
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
    'Sub-Award Date',
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

const defaultContract = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date' },
    { title: 'End Date' },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: 222 },
    { title: 'COVID-19 Response Obligations', background: '#6E338E' },
    { title: 'COVID-19 Response Outlays', background: '#6E338E' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Contract Award Type' }
];

const defaultGrant = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date' },
    { title: 'End Date' },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: 222 },
    { title: 'COVID-19 Response Obligations', background: '#6E338E' },
    { title: 'COVID-19 Response Outlays', background: '#6E338E' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const defaultDirectPayment = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date' },
    { title: 'End Date' },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: 222 },
    { title: 'COVID-19 Response Obligations', background: '#6E338E' },
    { title: 'COVID-19 Response Outlays', background: '#6E338E' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const defaultLoan = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Issued Date' },
    { title: 'Loan Value' },
    { title: 'Subsidy Cost' },
    { title: 'COVID-19 Response Obligations', background: '#6E338E' },
    { title: 'COVID-19 Response Outlays', background: '#6E338E' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' }
];


const defaultOther = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date' },
    { title: 'End Date' },
    { title: 'Award Amount' },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: 222 },
    { title: 'COVID-19 Response Obligations', background: '#6E338E' },
    { title: 'COVID-19 Response Outlays', background: '#6E338E' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const defaultIdvColumns = [
    { title: 'Award ID' },
    { title: 'Recipient Name' },
    { title: 'Start Date' },
    { title: 'Last Date to Order', displayName: 'Ordering Period End Date' },
    { title: 'Award Amount', subtitle: '(Total Award Obligations to Date)', customWidth: 222 },
    { title: 'COVID-19 Response Obligations', background: '#6E338E' },
    { title: 'COVID-19 Response Outlays', background: '#6E338E' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Contract Award Type' }
];

const defaultSub = [
    { title: 'Sub-Award ID' },
    { title: 'Sub-Awardee Name' },
    { title: 'Sub-Award Date' },
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
