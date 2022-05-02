/**
 * federalAccountSummary.js
 * Created by Jonathan Hill on 4/26/19.
 */

const tableMapping = {
    federalAccountName: {
        displayName: 'Federal Account',
        field: 'account_title',
        classname: 'federal-accounts-table__body-cell',
        href: '/federal_account/'
    },
    obligatedAmount: {
        displayName: 'Combined Obligated Amount',
        field: 'total_transaction_obligated_amount',
        classname: 'federal-accounts-table__body-cell right offset-right'
    },
    percent: {
        displayName: 'Percent of Total',
        field: 'total_transaction_obligated_amount',
        classname: 'federal-accounts-table__body-cell right'
    },
    fundingAgencyName: {
        displayName: 'Funding Agency',
        classname: 'federal-accounts-table__body-cell offset-left',
        href: '/agency/'
    }
};

export default tableMapping;
