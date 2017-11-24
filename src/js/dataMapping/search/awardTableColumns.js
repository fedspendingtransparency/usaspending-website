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
    'Place of Performance Congressional District',
    'Place of Performance County',
    'Parent Award ID',
    'PSC Code',
    'NAICS Code',
    'NAICS Description'
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

const defaultContract = [
    'Award ID',
    'Recipient Name',
    'Start Date',
    'End Date',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Contract Award Type'
];

const defaultGrant = [
    'Award ID',
    'Recipient Name',
    'Start Date',
    'End Date',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

const defaultDirectPayment = [
    'Award ID',
    'Recipient Name',
    'Start Date',
    'End Date',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

const defaultLoan = [
    'Award ID',
    'Recipient Name',
    'Issued Date',
    'Loan Value',
    'Subsidy Cost',
    'Awarding Agency',
    'Awarding Sub Agency'
];


const defaultOther = [
    'Award ID',
    'Recipient Name',
    'Start Date',
    'End Date',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

export const availableColumns = (type) => {
    const columns = {
        contracts: contractColumns,
        grants: grantColumns,
        direct_payments: directPaymentColumns,
        loans: loanColumns,
        other: otherColumns
    };

    return columns[type];
};

export const defaultColumns = (type) => {
    const columns = {
        contracts: defaultContract,
        grants: defaultGrant,
        direct_payments: defaultDirectPayment,
        loans: defaultLoan,
        other: defaultOther
    };

    return columns[type];
};

export const defaultSort = (type) => {
    const columns = {
        contracts: 'Award Amount',
        grants: 'Award Amount',
        direct_payments: 'Award Amount',
        loans: 'Loan Value',
        other: 'Award Amount'
    };

    return columns[type];
};

