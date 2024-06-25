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
    'Total Outlays',
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
    'Total Outlays',
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
    'Funding Sub Agency',
    'Award Type'
];
const directPaymentColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date (Period of Performance)',
    'End Date (Period of Performance)',
    'Award Amount',
    'Total Outlays',
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
    'Total Outlays',
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
    'Total Outlays',
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

const newDefaultWidth = 200;
const newCustomWidth1 = 300;
const newCustomWidth2 = 400;
const covidColor = '#6E338E';
const infrastructureColor = '#2D6878';

const defaultContract = [
    { title: 'Award ID', displayName: 'Prime Award ID', customWidth: newCustomWidth1 },
    { title: 'Recipient Name', customWidth: newCustomWidth1 },
    {
        title: 'Award Amount', right: true, displayName: 'Obligations', customWidth: newDefaultWidth
    },
    {
        title: 'Total Outlays', right: true, displayName: 'Outlays', customWidth: newDefaultWidth
    },
    { title: 'Contract Award Type', displayName: 'Award Type', customWidth: newCustomWidth1 },
    { title: 'Awarding Agency', customWidth: newCustomWidth1 },
    { title: 'Awarding Sub Agency', displayName: 'Awarding Subagency', customWidth: newCustomWidth1 },
    {
        title: 'Start Date', displayName: 'Period of Performance Start', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    },
    {
        title: 'End Date', displayName: 'Period of Performance End', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    }
];
const defaultGrant = [
    { title: 'Award ID', displayName: 'Prime Award ID', customWidth: newCustomWidth1 },
    { title: 'Recipient Name', customWidth: newCustomWidth1 },
    {
        title: 'Award Amount', right: true, displayName: 'Obligations', customWidth: newDefaultWidth
    },
    {
        title: 'Total Outlays', right: true, displayName: 'Outlays', customWidth: newDefaultWidth
    },
    { title: 'Award Type', displayName: 'Award Type', customWidth: newCustomWidth1 },
    { title: 'Awarding Agency', customWidth: newCustomWidth1 },
    { title: 'Awarding Sub Agency', displayName: 'Awarding Subagency', customWidth: newCustomWidth1 },
    {
        title: 'Start Date', displayName: 'Period of Performance Start', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    },
    {
        title: 'End Date', displayName: 'Period of Performance End', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    }
];
const defaultDirectPayment = [
    { title: 'Award ID', displayName: 'Prime Award ID', customWidth: newCustomWidth1 },
    { title: 'Recipient Name', customWidth: newCustomWidth1 },
    {
        title: 'Award Amount', right: true, displayName: 'Obligations', customWidth: newDefaultWidth
    },
    {
        title: 'Total Outlays', right: true, displayName: 'Outlays', customWidth: newDefaultWidth
    },
    { title: 'Award Type', displayName: 'Award Type', customWidth: newCustomWidth1 },
    { title: 'Awarding Agency', customWidth: newCustomWidth1 },
    { title: 'Awarding Sub Agency', displayName: 'Awarding Subagency', customWidth: newCustomWidth1 },
    {
        title: 'Start Date', displayName: 'Period of Performance Start', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    },
    {
        title: 'End Date', displayName: 'Period of Performance End', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    }
];
const defaultOther = [
    { title: 'Award ID', displayName: 'Prime Award ID', customWidth: newCustomWidth1 },
    { title: 'Recipient Name', customWidth: newCustomWidth1 },
    {
        title: 'Award Amount', right: true, displayName: 'Obligations', customWidth: newDefaultWidth
    },
    {
        title: 'Total Outlays', right: true, displayName: 'Outlays', customWidth: newDefaultWidth
    },
    { title: 'Contract Award Type', displayName: 'Award Type', customWidth: newCustomWidth1 },
    { title: 'Awarding Agency', customWidth: newCustomWidth1 },
    { title: 'Awarding Sub Agency', displayName: 'Awarding Subagency', customWidth: newCustomWidth1 },
    {
        title: 'Start Date', displayName: 'Period of Performance Start', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    },
    {
        title: 'End Date', displayName: 'Period of Performance End', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    }
];

// different than the others
const defaultLoan = [
    { title: 'Award ID', displayName: 'Prime Award ID', customWidth: newCustomWidth1 },
    { title: 'Recipient Name', customWidth: newCustomWidth1 },
    {
        title: 'Subsidy Cost',
        displayName: 'Original Subsidy Cost',
        subtitle: '(Total Obligations To Date)',
        customWidth: newDefaultWidth,
        right: true
    },
    {
        title: 'Loan Value', right: true, displayName: 'Face Value of Loan', customWidth: newDefaultWidth
    },
    { title: 'Award Type', displayName: 'Award Type', customWidth: newCustomWidth1 },
    { title: 'Awarding Agency', customWidth: newCustomWidth1 },
    { title: 'Awarding Sub Agency', displayName: 'Awarding Subagency', customWidth: newCustomWidth1 },
    { title: 'Issued Date', customWidth: newDefaultWidth }

];
const defaultIdvColumns = [
    { title: 'Award ID', displayName: 'Prime Award ID', customWidth: newCustomWidth1 },
    { title: 'Recipient Name', customWidth: newCustomWidth1 },
    {
        title: 'Award Amount', right: true, displayName: 'Total Obligations to Date', customWidth: newDefaultWidth
    },
    {
        title: 'Total Outlays', right: true, displayName: 'Total Outlays to Date', customWidth: newDefaultWidth
    },
    { title: 'Contract Award Type', displayName: 'Award Type', customWidth: newCustomWidth1 },
    { title: 'Awarding Agency', customWidth: newCustomWidth1 },
    { title: 'Awarding Sub Agency', displayName: 'Awarding Subagency', customWidth: newCustomWidth1 },
    {
        title: 'Start Date', displayName: 'Period of Performance Start', subtitle: '(Period of Performance)', customWidth: newCustomWidth1
    },
    { title: 'Last Date to Order', displayName: 'Ordering Period End Date', customWidth: newCustomWidth1 }


];
const infrastructureObligationsCol = {
    title: 'Infrastructure Obligations',
    background: infrastructureColor,
    customWidth: newCustomWidth1,
    right: true
};
const infrastructureOutlaysCol = {
    title: 'Infrastructure Outlays',
    background: infrastructureColor,
    customWidth: newDefaultWidth,
    right: true
};
const covidObligationsCol = {
    title: 'COVID-19 Obligations',
    background: covidColor,
    customWidth: newDefaultWidth,
    right: true
};
const covidOutlaysCol = {
    title: 'COVID-19 Outlays',
    background: covidColor,
    customWidth: newDefaultWidth,
    right: true
};
const covidDefCCol = {
    title: 'def_codes',
    displayName: 'Disaster Emergency Fund Codes (DEFCs)',
    customWidth: newCustomWidth1
};
const descriptionCol = {
    title: 'Description',
    displayName: 'Award Description',
    customWidth: newCustomWidth2
};
const tabsWithAdditionalCols = [
    defaultContract,
    defaultGrant,
    defaultLoan,
    defaultDirectPayment,
    defaultOther,
    defaultIdvColumns
];

// Insert COVID columns
tabsWithAdditionalCols.forEach((tab) => {
    tab.splice(4, 0, descriptionCol);
    tab.splice(6, 0, covidDefCCol);
    tab.splice(7, 0, covidObligationsCol);
    tab.splice(8, 0, covidOutlaysCol);
    tab.splice(9, 0, infrastructureObligationsCol);
    tab.splice(10, 0, infrastructureOutlaysCol);
});

const defaultSub = [
    { title: 'Sub-Award ID', displayName: "Subaward ID", customWidth: newCustomWidth1 },
    { title: 'Sub-Awardee Name', displayName: "Subrecipient Name", customWidth: newCustomWidth1 },
    {
        title: 'Sub-Award Amount', right: true, displayName: "Subaward Obligations", customWidth: newDefaultWidth
    },
    { title: 'Action Date', displayName: "Subaward Action Date", customWidth: newDefaultWidth },
    { title: 'Prime Award ID', customWidth: newCustomWidth1 },
    { title: 'Prime Recipient Name', displayName: "Prime Award Recipient Name", customWidth: newCustomWidth1 },
    { title: 'Awarding Agency', displayName: "Prime Award Awarding Agency", customWidth: newCustomWidth1 },
    { title: 'Awarding Sub Agency', displayName: "Prime Award Awarding Subagency", customWidth: newCustomWidth1 }
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
        loans: 'Subsidy Cost',
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
