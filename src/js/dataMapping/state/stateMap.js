/**
 * stateMap.js
 * Created by Nick Torres 8/9/2024
 */


export const apiScopes = {
    state: 'state',
    county: 'county',
    congressionalDistrict: 'district'
};
export const awardTypeTabs = [
    {
        internal: 'all',
        label: 'All Awards'
    },
    {
        internal: 'grants',
        label: 'Grants'
    },
    {
        internal: 'loans',
        label: 'Loans'
    },
    {
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        internal: 'other',
        label: 'Other Financial Assistance'
    },
    {
        internal: 'contracts',
        label: 'Contracts'
    },
    {
        internal: 'idvs',
        label: 'Contract IDVs'
    }
];
export const stateFilters = {
    territory: {
        label: 'AREA TYPE',
        enabled: true,
        options: [
            {
                value: 'county',
                label: 'Counties'
            },
            {
                value: 'congressionalDistrict',
                label: 'Congressional Districts'
            }
        ]
    },
    def_codes: {
        label: 'Disaster Emergency Fund Code (DEFC)',
        enabled: true,
        options: [{
            value: 'all',
            label: 'All Disaster Emergency Fund Codes (DEFCs)'
        }]
    }
};
export const stateOnClickHandler = {
    territory: 'updateTerritoryFilter'
};

export const mapFilterSortOrderByValue = {
    states: 0,
    congressionalDistricts: 1,
    counties: 2,
    obligations: 0,
    faceValueOfLoans: 2,
    outlays: 1,
    totalSpending: 0,
    perCapita: 1
};
export const filtersOnClickHandler = {
    territory: 'updateTerritoryFilter',
    defc: "updateDefcFilter"
};
