/**
 * modals.js
 * Created by Jonathan Hill 11/19/20
 */


export const modalTitles = (type) => ({
    publicationDates: 'Publication and Certification History',
    missingAccountBalance: 'Number of TASs Missing from Account Balance Data',
    reportingDifferences: 'Reporting Difference in Obligations',
    unlinkedData: `Number of Unlinked ${type} Awards`
});

export const modalClassNames = {
    publicationDates: 'publication-dates-modal',
    missingAccountBalance: 'missing-account-balance-modal',
    reportingDifferences: 'reporting-differences-modal',
    unlinkedData: 'unlinked-data-modal'
};

export const publicationDatesColumns = [
    { displayName: 'Publication Dates', title: 'publication_date' },
    { displayName: 'Certification Dates', title: 'certification_date' }
];

export const missingAccountBalanceColumns = [
    { displayName: 'Treasury Account Symbol (TAS)', title: 'tas' },
    { displayName: 'Obligated Amount', title: 'amount' },
    { displayName: '% of Agency Total in GTAS', title: 'amount' }
];

export const reportingDifferencesColumns = [
    { displayName: 'Treasury Account Symbol (TAS)', title: 'tas' },
    { displayName: 'Account Balance Obligations', title: 'file_a_obligation' },
    { displayName: 'Account Spending Obligations', title: 'file_b_obligation' },
    { displayName: 'Difference', title: 'difference' }
];

export const unlinkedDataColumns = (type) => ([
    { displayName: '', title: 'blank' },
    { displayName: `Unlinked ${type} Awards in ${type === 'Contract' ? type : 'Financial Assistance'} Data` },
    { displayName: `Unlinked ${type} Awards in Award Spending Breakdown Data` },
    { displayName: 'Total' }
]);
