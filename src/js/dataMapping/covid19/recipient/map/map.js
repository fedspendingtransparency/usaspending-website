/**
 * map.js
 * Created by Jonathan Hill 06/09/20
 */

import Analytics from 'helpers/analytics/Analytics';

export const centerOfMap = [-95.569430, 38.852892];

export const apiScopes = {
    state: 'state',
    county: 'county',
    congressionalDistrict: 'district'
};

export const filters = {
    territory: {
        label: 'AREA TYPE',
        options: [
            {
                value: 'state',
                label: 'States'
            },
            {
                value: 'county',
                label: 'Counties'
            },
            {
                value: 'district',
                label: 'Congressional Districts'
            }
        ]
    },
    spendingType: {
        label: 'SPENDING TYPE',
        options: [
            {
                value: 'obligation',
                label: 'Award Obligations'
            },
            {
                value: 'outlay',
                label: 'Award Outlays'
            },
            {
                value: 'face_value_of_loan',
                label: 'Face Value of Loans'
            }
        ]
    },
    amountType: {
        label: 'AMOUNT TYPE',
        options: [
            {
                value: 'totalSpending',
                label: 'Total Spending'
            },
            {
                value: 'perCapita',
                label: 'Per Capita Spending'
            }
        ]
    }
    // TODO - uncomment this when filter is ready
    // recipientType: {
    //     label: 'RECIPIENT TYPE',
    //     options: [
    //         {
    //             value: 'all',
    //             label: 'All Recipient Types'
    //         },
    //         {
    //             value: 'category_business',
    //             label: 'Business'
    //         },
    //         {
    //             value: 'minority_owned_business',
    //             label: 'Minority Owned Business'
    //         },
    //         {
    //             value: 'woman_owned_business',
    //             label: 'Women Owned Business'
    //         },
    //         {
    //             value: 'veteran_owned_business',
    //             label: 'Veteran Owned Business'
    //         },
    //         {
    //             value: 'special_designations',
    //             label: 'Special Designations'
    //         },
    //         {
    //             value: 'nonprofit',
    //             label: 'Nonprofit'
    //         },
    //         {
    //             value: 'higher_education',
    //             label: 'Higher Education'
    //         },
    //         {
    //             value: 'government',
    //             label: 'Government'
    //         },
    //         {
    //             value: 'individuals',
    //             label: 'Individuals'
    //         }
    //     ]
    // }
};

export const advancedSearchFilters = {
    territory: {
        label: 'AREA TYPE',
        enabled: true,
        options: [
            {
                value: 'country',
                label: 'Countries'
            },
            {
                value: 'state',
                label: 'States & Territories'
            },
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
    amountType: {
        label: 'AMOUNT TYPE',
        enabled: true,
        options: [
            {
                value: 'totalSpending',
                label: 'Total Spending'
            },
            {
                value: 'perCapita',
                label: 'Per Capita Spending'
            }
        ]
    }
};
export const filtersOnClickHandler = {
    territory: 'updateTerritoryFilter',
    spendingType: 'updateSpendingTypeFilter',
    amountType: 'updateAmountTypeFilter',
    // TODO - uncomment when this filter is ready
    // recipientType: 'updateRecipientTypeFilter',
    awardType: 'updateAwardTypeFilter'
};

// Still in use for COVID profile map
export const mapboxSources = {
    state: {
        label: 'state',
        url: 'mapbox://usaspending.9cse49bi',
        layer: 'cb_2016_us_state_500k-ckeyb7',
        filterKey: 'STUSPS' // state abbreviation
    },
    county: {
        label: 'county',
        url: 'mapbox://usaspending.29sdfmwu',
        layer: 'tl_2019_us_county',
        filterKey: 'GEOID' // the county GEOID is state FIPS + county FIPS
    },
    district: {
        label: 'congressional district',
        url: 'mapbox://usaspending.118-CD-tiles',
        layer: '118-CD',
        filterKey: 'GEOID20' // the GEOID is state FIPS + district
    },
    zip: {
        label: 'ZIP Code Tabulation Area',
        url: 'mapbox://usaspending.3lk61l9t',
        layer: 'cb_2016_us_zcta510_500k-4se882',
        filterKey: 'ZCTA5CE10' // zip code
    }
};

export const logMapLayerEvent = (layer) => {
    Analytics.event({
        event: 'covid_map_layer',
        category: 'COVID-19 - Map - Map Layer',
        action: layer
    });
};

export const logMapScopeEvent = (scope) => {
    Analytics.event({
        event: 'covid_map_location_type',
        category: 'COVID-19 - Map - Location Type',
        action: scope
    });
};

export const visualizationColors = [
    'rgba(1, 43, 58, 0.12)',
    'rgba(1, 43, 58, 0.30)',
    'rgba(1, 43, 58, 0.48)',
    'rgba(1, 43, 58, 0.65)',
    'rgba(1, 43, 58, 0.85)',
    'rgba(1, 43, 58, 1)'
];

export const tooltipLabels = {
    totalSpending: {
        obligation: 'Total Obligations',
        outlay: 'Total Outlays',
        face_value_of_loan: 'Total Face Value of Loans'
    },
    perCapita: {
        obligation: 'Obligations Per Capita',
        outlay: 'Outlays Per Capita',
        face_value_of_loan: 'Face Value of Loans Per Capita'
    }
};
