/**
 * contractFields.js
 * Created by Emily Gullo on 6/22/17.
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
    '8A': '8A Competed',
    'BICiv': 'Buy Indian',
    'HS2Civ': 'Combination HUBZone and 8(a)',
    'EDWOSB': 'Economically-Disadvantaged Women-Owned Small Business',
    'ESB': 'Emerging Small Business Set-Aside',
    'HMP': 'HBCU or MI Set-Aside - Partial',
    'HMT': 'HBCU or MI Set-Aside - Total',
    'HZC': 'HUBZone Set-Aside',
    'HZS': 'HUBZone Sole Source',
    'ISEE': 'Indian Economic Enterprise',
    'ISBEE': 'Indian Small Business Economic Enterprise',
    'NONE': 'No Set Aside Used',
    'RSBCiv': 'Reserved for Small Business $2,501 to $100K',
    '8ACCiv': 'SDB Set-Aside 8(a)',
    'SDVOSBS': 'SDVOSB Sole Source',
    'SDVOSBC': 'Service-Disabled Veteran-Owned Small Business Set-Aside',
    'SBP': 'Small Busness Set-Aside - Partial',
    'SBA': 'Small Busness Set-Aside - Total',
    'VSBCiv': 'Very Small Business Set-Aside',
    'VSA': 'Veteran Set-Aside',
    'VSS': 'Veteran Sole Source',
    'WOSB': 'Women-Owned Small Business'
};

export const extentCompetedDefinitions = {
    'F ': 'Competed under SAP',
    'CDOCiv': 'Competitive Delivery Order',
    'E Civ': 'Follow On to Competed Action',
    'A': 'Full and Open Competition',
    'D': 'Full and Open Competiton after exclusion of sources',
    'NDOCiv': 'Non-Competitive Delivery Order',
    'B': 'Not Available for Competition',
    'C': 'Not Competed',
    'G': 'Not Competed under SAP'
};

export const contractFilterGroups = {
    pricing_type: [
        '111',
        '113',
        '115',
        '116',
        '117',
        '118',
        '121',
        '122',
        '130'
    ],
    set_aside: [
        '210',
        '220',
        '231',
        '232',
        '233',
        '240',
        '251',
        '252',
        '253',
        '254',
        '255',
        '256',
        '257',
        '258',
        '260'
    ],
    extent_competed: [
        '310',
        '320',
        '330'
    ]
};

export const groupKeys = [
    'pricing_type',
    'set_aside',
    'extent_competed'
];

export const groupLabels = {
    pricing_type: 'Pricing Types',
    set_aside: 'Set-Aside',
    extent_competed: 'Extent Competed'
};

/* eslint-enable quote-props */
