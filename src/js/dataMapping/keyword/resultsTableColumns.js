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
        grants: grantColumns,
        direct_payments: directPaymentColumns,
        loans: loanColumns,
        other: otherColumns
    };

    return columns[type];
};

export const defaultSort = (type) => {
    const columns = {
        contracts: 'Award ID',
        grants: 'Award ID',
        direct_payments: 'Award ID',
        loans: 'Award ID',
        other: 'Award ID'
    };

    return columns[type];
};

