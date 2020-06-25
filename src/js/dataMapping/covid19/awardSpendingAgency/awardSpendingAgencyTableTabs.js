export const awardSpendingAgencyTableTabs = [
    {
        enabled: true,
        internal: 'all',
        label: 'All Awards',
        subtitle: 'Awards',
        columnName: 'Award',
        codes: ['A', 'B', 'C', 'D', 'IDV_A', 'IDV_B', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E', '02', '03', '04', '05', '10', '06', '07', '08', '09', '11']
    },
    {
        enabled: true,
        internal: 'contracts',
        label: 'Contracts',
        subtitle: 'Contracts',
        columnName: 'Contract',
        codes: ['A', 'B', 'C', 'D']
    },
    {
        enabled: true,
        internal: 'idvs',
        label: 'Contract IDVs',
        subtitle: 'Contract IDVs',
        columnName: 'Contract IDV',
        codes: ['IDV_A', 'IDV_B', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E']
    },
    {
        enabled: true,
        internal: 'grants',
        label: 'Grants',
        subtitle: 'Grants',
        columnName: 'Grant',
        codes: ['02', '03', '04', '05']
    },
    {
        enabled: true,
        internal: 'direct_payments',
        label: 'Direct Payments',
        subtitle: 'Direct Payments',
        columnName: 'Direct Payment',
        codes: ['10', '06']
    },
    {
        enabled: true,
        internal: 'loans',
        label: 'Loans',
        subtitle: 'Loans',
        columnName: 'Loan',
        codes: ['07', '08']
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
            title: 'count',
            displayName: `Number of ${type}s`
        }
    ]
);

export const awardSpendingAgencyTableColumnFieldMapping = {
    name: 'name',
    obligation: 'obligation',
    outlay: 'outlay',
    number: 'number'
};
