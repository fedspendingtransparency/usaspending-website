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
        internal: 'direct_payments',
        label: 'Direct Payments',
        subtitle: 'Direct Payments',
        columnName: 'Direct Payment'
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
        internal: 'loans2',
        label: 'Loans2',
        subtitle: 'Loans2',
        columnName: 'Loan2'
    },
    {
        enabled: true,
        internal: 'insurance',
        label: 'Insurance',
        subtitle: 'Insurance',
        columnName: 'Insurance'
    },
    {
        enabled: true,
        internal: 'insurance2',
        label: 'Insurance2',
        subtitle: 'Insurance2',
        columnName: 'Insurance2'
    },
    {
        enabled: true,
        internal: 'insurance3',
        label: 'Insurance3',
        subtitle: 'Insurance3',
        columnName: 'Insurance3'

    },
    {
        enabled: true,
        internal: 'insurance4',
        label: 'Insurance4',
        subtitle: 'Insurance4',
        columnName: 'Insurance4'

    },
    {
        enabled: true,
        internal: 'insurance5',
        label: 'Insurance5',
        subtitle: 'Insurance5',
        columnName: 'Insurance5'

    },
    {
        enabled: true,
        internal: 'insurance6',
        label: 'Insurance6',
        subtitle: 'Insurance6',
        columnName: 'Insurance6'

    }
];

export const awardSpendingAgencyTableColumns = (type) => (
    [
        {
            title: 'name',
            displayName: 'Agency Name'
        },
        {
            title: 'obligation',
            displayName: `${type} Obligations`
        },
        {
            title: 'outlay',
            displayName: `${type} Outlays`
        },
        {
            title: 'number',
            displayName: `Number of ${type}`
        }
    ]
);

export const awardSpendingAgencyTableColumnFieldMapping = {
    name: 'name',
    obligation: 'obligation',
    outlay: 'outlay',
    number: 'number'
};
