/**
 * resultsTableColumns.js
 * Created by Lizzie Salita 1/5/18
 */

const contractColumns = [
    'Award ID',
    'Mod',
    'Recipient Name',
    'Action Date',
    'Transaction Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

const defaultIdvColumns = [
    'Award ID',
    'Recipient Name',
    'Start Date',
    'Last Date to Order',
    'Award Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Contract Award Type'
];

const grantColumns = [
    'Award ID',
    'Mod',
    'Recipient Name',
    'Action Date',
    'Transaction Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

const loanColumns = [
    'Award ID',
    'Mod',
    'Recipient Name',
    'Action Date',
    'Loan Value',
    'Subsidy Cost',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

const directPaymentColumns = [
    'Award ID',
    'Mod',
    'Recipient Name',
    'Action Date',
    'Transaction Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

const otherColumns = [
    'Award ID',
    'Mod',
    'Recipient Name',
    'Action Date',
    'Transaction Amount',
    'Awarding Agency',
    'Awarding Sub Agency',
    'Award Type'
];

export const availableColumns = (type) => {
    const columns = {
        contracts: contractColumns,
        idvs: defaultIdvColumns,
        grants: grantColumns,
        direct_payments: directPaymentColumns,
        loans: loanColumns,
        other: otherColumns
    };

    return columns[type];
};

export const defaultSort = (type) => {
    const columns = {
        contracts: 'Transaction Amount',
        idvs: 'Award Amount',
        grants: 'Transaction Amount',
        direct_payments: 'Transaction Amount',
        loans: 'Loan Value',
        other: 'Transaction Amount'
    };

    return columns[type];
};

