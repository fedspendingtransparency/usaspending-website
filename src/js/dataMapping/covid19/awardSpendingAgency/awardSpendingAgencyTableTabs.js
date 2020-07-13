export const awardSpendingAgencyTableTabs = [
    {
        enabled: true,
        internal: 'all',
        label: 'All Awards',
        subtitle: 'Awards',
        columnName: 'Award'
    },
    {
        enabled: true,
        internal: 'grants',
        label: 'Grants',
        subtitle: 'Grants',
        columnName: 'Grant'
    },
    {
        enabled: true,
        internal: 'loans',
        label: 'Loans',
        subtitle: 'Loans',
        columnName: 'Loan'
    },
    {
        enabled: true,
        internal: 'direct_payments',
        label: 'Direct Payments',
        subtitle: 'Direct Payments',
        columnName: 'Direct Payment'
    },
    {
        enabled: true,
        internal: 'other',
        label: 'Other Financial Assistance',
        subtitle: 'Other Financial Assistance',
        columnName: 'Other Financial Assistance'
    },
    {
        enabled: true,
        internal: 'contracts',
        label: 'Contracts',
        subtitle: 'Contracts',
        columnName: 'Contract'
    },
    {
        enabled: true,
        internal: 'idvs',
        label: 'Contract IDVs',
        subtitle: 'Contract IDVs',
        columnName: 'Contract IDV'
    }
];

export const awardSpendingAgencyTableColumnFieldMapping = {
    name: 'name',
    obligation: 'obligation',
    outlay: 'outlay',
    count: 'count',
    faceValueOfLoan: 'face_value_of_loan'
};
