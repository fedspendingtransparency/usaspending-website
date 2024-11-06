/**
 * contractFields.js
 * Created by Emily Gullo on 6/22/17
 */

/* eslint-disable quote-props */
export const pricingTypeDefinitions = {
    '2': 'Combination',
    'S': 'Cost No Fee',
    'R': 'Cost Plus Award Fee',
    'U': 'Cost Plus Fixed Fee',
    'V': 'Cost Plus Incentive Fee',
    'T': 'Cost Sharing',
    'J': 'Firm Fixed Price',
    'M': 'Fixed Price Award Fee',
    'L': 'Fixed Price Incentive',
    'B': 'Fixed Price Level of Effort',
    'A': 'Fixed Price Redetermination',
    'K': 'Fixed Price with Economic Price Adjustment',
    'Z': 'Labor Hours',
    '1': 'Order Dependent',
    '3': 'Other',
    'Y': 'Time and Materials'
};

export const setAsideDefinitions = {
    '8AN': '8(a) Sole Source',
    'HS3': '8(a) with HUBZone Preference',
    '8A': '8(a) Competed',
    'BI': 'Buy Indian',
    'HS2Civ': 'Combination HUBZone and 8(a)',
    'EDWOSB': 'Economically-Disadvantaged Women-Owned Small Business',
    'EDWOSBSS': 'Economically Disadvantaged Women Owned Small Business Sole Source',
    'ESB': 'Emerging Small Business Set Aside',
    'HMP': 'HBCU or MI Set Aside - Partial',
    'HMT': 'HBCU or MI Set Aside - Total',
    'HZC': 'HUBZone Set Aside',
    'HZS': 'HUBZone Sole Source',
    'ISEE': 'Indian Economic Enterprise',
    'ISBEE': 'Indian Small Business Economic Enterprise',
    'NONE': 'No Set Aside Used',
    'RSBCiv': 'Reserved for Small Business $2,501 to $100K',
    '8ACCiv': 'SDB Set Aside 8(a)',
    'SDVOSBS': 'SDVOSB Sole Source',
    'SDVOSBC': 'Service-Disabled Veteran-Owned Small Business Set Aside',
    'SBP': 'Small Business Set Aside - Partial',
    'SBA': 'Small Business Set Aside - Total',
    'VSBCiv': 'Very Small Business Set Aside',
    'VSA': 'Veteran Set Aside',
    'VSS': 'Veteran Sole Source',
    'WOSB': 'Women-Owned Small Business',
    'WOSBSS': 'Women Owned Small Business Sole Source'
};

export const extentCompetedDefinitions = {
    'F': 'Competed under SAP',
    'CDOCiv': 'Competitive Delivery Order',
    'E Civ': 'Follow On to Competed Action',
    'A': 'Full and Open Competition',
    'D': 'Full and Open Competition after exclusion of sources',
    'NDOCiv': 'Non-Competitive Delivery Order',
    'B': 'Not Available for Competition',
    'C': 'Not Competed',
    'G': 'Not Competed under SAP'
};

export const contractFilterGroups = {
    pricing_type: [
        '2',
        'S',
        'R',
        'U',
        'V',
        'T',
        'J',
        'M',
        'L',
        'B',
        'A',
        'K',
        'Z',
        '1',
        '3',
        'Y'
    ],
    set_aside: [
        '8AN',
        'HS3',
        '8A',
        'BICiv',
        'HS2Civ',
        'EDWOSB',
        'ESB',
        'HMP',
        'HMT',
        'HZC',
        'HZS',
        'ISEE',
        'ISBEE',
        'NONE',
        'RSBCiv',
        '8ACCiv',
        'SDVOSBS',
        'SDVOSBC',
        'SBP',
        'SBA',
        'VSBCiv',
        'VSA',
        'VSS',
        'WOSB'
    ],
    extent_competed: [
        'F',
        'CDOCiv',
        'E Civ',
        'A',
        'D',
        'NDOCiv',
        'B',
        'C',
        'G'
    ]
};

export const groupKeys = [
    'pricing_type',
    'set_aside',
    'extent_competed'
];

export const groupLabels = {
    pricing_type: 'Type of Contract Pricing',
    set_aside: 'Type of Set Aside',
    extent_competed: 'Extent Competed'
};

export const extentCompetedTypeMapping = [
    {
        id: 'available-for-competition',
        name: 'Available for Competition',
        filters: ['F', 'CDOCiv', 'E Civ', 'A', 'D']
    },
    {
        id: 'not-available-for-competition',
        name: 'Not Available for Competition',
        filters: ['NDOCiv', 'B', 'C', 'G']
    }
];

export const setAsideTypeMapping = [
    {
        id: 'hbcu-mi',
        name: 'Historically Black College/University (HBCU) or Minority Institution (MI)',
        filters: ['HMP', 'HMT']
    },
    {
        id: 'hub-zone',
        name: 'Historically Underutilized Business Zone Small Businesses (HUBZone)',
        filters: ['HZC', 'HZS']
    },
    {
        id: 'naob',
        name: 'Native American-Owned Businesses',
        filters: ['BI', 'ISEE', 'ISBEE']
    },
    {
        id: 'no-set-aside',
        name: 'No Set Aside',
        filters: ['NONE']
    },
    {
        id: 'small-disadvantaged',
        name: 'Small Disadvantaged Business and 8(a) Small Businesses',
        filters: ['8AN', 'HS3', '8A', 'HS2Civ', 'ESB', 'RSBCiv', '8ACCiv', 'SBP', 'SBA', 'VSBCiv']
    },
    {
        id: 'vosb',
        name: 'Veteran-Owned Businesses',
        filters: ['SDVOSBC', 'SDVOSBS', 'VSA', 'VSS']
    },
    {
        id: 'wosb',
        name: 'Women-Owned Small Businesses (WOSB)',
        filters: ['EDWOSBSS', 'EDWOSB', 'WOSBSS', 'WOSB']
    }
];

export const pricingTypeMapping = [
    {
        id: 'combination',
        name: 'Combination',
        filters: ['2']
    },
    {
        id: 'cost-reimbursement-contracts',
        name: 'Cost Reimbursement Contracts',
        filters: ['S', 'R', 'U', 'V', 'T']
    },
    {
        id: 'fixed-price-contracts',
        name: 'Fixed Price Contracts',
        filters: ['J', 'M', 'L', 'B', 'A', 'K']
    },
    {
        id: 'labor-hours',
        name: 'Labor Hours',
        filters: ['Z']
    },
    {
        id: 'order-dependent',
        name: 'Order Dependent',
        filters: ['1']
    },
    {
        id: 'other',
        name: 'Other',
        filters: ['3']
    },
    {
        id: 'time-and-materials',
        name: 'Time and Materials',
        filters: ['Y']
    }
];

/* eslint-enable quote-props */
