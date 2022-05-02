/**
 * resultsTableColumns.js
 * Created by Lizzie Salita 1/5/18
 */

const contractColumns = [
    { title: 'Award ID' },
    { title: 'Mod' },
    { title: 'Recipient Name' },
    { title: 'Action Date' },
    { title: 'Transaction Amount' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const idvColumns = [
    { title: 'Award ID' },
    { title: 'Mod' },
    { title: 'Recipient Name' },
    { title: 'Action Date' },
    { title: 'Transaction Amount' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { displayName: 'IDV Type', title: 'Award Type' }
];

const grantColumns = [
    { title: 'Award ID' },
    { title: 'Mod' },
    { title: 'Recipient Name' },
    { title: 'Action Date' },
    { title: 'Transaction Amount' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const loanColumns = [
    { title: 'Award ID' },
    { title: 'Mod' },
    { title: 'Recipient Name' },
    { title: 'Action Date' },
    { title: 'Loan Value', displayName: 'Loan Face Value' },
    { title: 'Subsidy Cost', displayName: 'Loan Subsidy Cost (Total Obligations To Date)' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const directPaymentColumns = [
    { title: 'Award ID' },
    { title: 'Mod' },
    { title: 'Recipient Name' },
    { title: 'Action Date' },
    { title: 'Transaction Amount' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

const otherColumns = [
    { title: 'Award ID' },
    { title: 'Mod' },
    { title: 'Recipient Name' },
    { title: 'Action Date' },
    { title: 'Transaction Amount' },
    { title: 'Awarding Agency' },
    { title: 'Awarding Sub Agency' },
    { title: 'Award Type' }
];

export const availableColumns = (type) => {
    const columns = {
        contracts: contractColumns,
        idvs: idvColumns,
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
