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
        label: 'TERRITORIES',
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
                value: 'obligations',
                label: 'Obligations'
            },
            {
                value: 'outlays',
                label: 'Outlays'
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
                label: 'Per Capita'
            }
        ]
    },
    recipientType: {
        label: 'RECIPIENT TYPE',
        options: [
            {
                value: 'all',
                label: 'All Recipient Types'
            },
            {
                value: 'category_business',
                label: 'Business',
            },
            {
                value: 'minority_owned_business',
                label: 'Minority Owned Business'
            },
            {
                value: 'woman_owned_business',
                label: 'Women Owned Business'
            },
            {
                value: 'veteran_owned_business',
                label: 'Veteran Owned Business'
            },
            {
                value: 'special_designations',
                label: 'Special Designations'
            },
            {
                value: 'nonprofit',
                label: 'Nonprofit'
            },
            {
                value: 'higher_education',
                label: 'Higher Education'
            },
            {
                value: 'government',
                label: 'Government'
            },
            {
                value: 'individuals',
                label: 'Individuals'
            }
        ]
    },
    awardType: {
        label: 'AWARD TYPE',
        options: [
            {
                value: 'all',
                label: 'All Award Types'
            },
            {
                value: 'contract',
                label: 'Contracts'
            },
            {
                value: 'idv',
                label: 'Indefinite Delivery Vehicle'
            },
            {
                value: 'grants',
                label: 'Grants'
            },
            {
                value: 'direct_payments',
                label: 'Direct Payments'
            },
            {
                value: 'loans',
                label: 'Loans'
            },
            {
                value: 'other',
                label: 'Other'
            }
        ]
    }
};

export const filtersOnClickHandler = {
    territory: 'updateterritoryFilter',
    spendingType: 'updatespendingTypeFilter',
    amountType: 'updateamountTypeFilter',
    recipientType: 'updaterecipientTypeFilter',
    awardType: 'updateawardTypeFilter'
};

export const mapboxSources = {
    state: {
        label: 'state',
        url: 'mapbox://usaspending.9cse49bi',
        layer: 'cb_2016_us_state_500k-ckeyb7',
        filterKey: 'STUSPS' // state abbreviation
    },
    county: {
        label: 'county',
        minZoom: 5,
        url: 'mapbox://usaspending.83g94wbo',
        layer: 'tl_2017_us_county-7dgoe0',
        filterKey: 'GEOID' // the county GEOID is state FIPS + county FIPS
    },
    congressionalDistrict: {
        label: 'congressional district',
        minZoom: 4,
        url: 'mapbox://usaspending.a4bkzui0',
        layer: 'tl_2018_us_cd116-34qpds',
        filterKey: 'GEOID' // the GEOID is state FIPS + district
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
        category: 'COVID-19 - Map - Map Layer',
        action: layer
    });
};

export const logMapScopeEvent = (scope) => {
    Analytics.event({
        category: 'COVID-19 - Map - Location Type',
        action: scope
    });
};
// darkest #3B005B
// darker #5d2b78
// normal #6E338E
// light #8c41b4
// lighter #9266AA
// lighest #b799c7
export const visualizationColors = [
  '#b799c7',
  '#9266AA',
  '#8c41b4',
  '#6E338E',
  '#5d2b78',
  '#3B005B'
];
