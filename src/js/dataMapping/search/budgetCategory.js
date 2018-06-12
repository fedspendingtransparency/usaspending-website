/**
 * budgetCategory.js
 * Created by michaelbray on 3/20/17.
 */

/* eslint-disable quote-props */
export const objectClassDefinitions = {
    '111': 'Full-time permanent',
    '113': 'Other than full-time permanent',
    '115': 'Other personnel compensation',
    '116': 'Military personnel - basic allowance for housing',
    '117': 'Military personnel',
    '118': 'Special personal services payments',
    '121': 'Civilian personnel benefits',
    '122': 'Military personnel benefits',
    '130': 'Benefits for former personnel',
    '210': 'Travel and transportation of persons',
    '220': 'Transportation of things',
    '231': 'Rental payments to GSA',
    '232': 'Rental payments to others',
    '233': 'Communications, utilities, and miscellaneous charges',
    '240': 'Printing and reproduction',
    '251': 'Advisory and assistance services',
    '252': 'Other services from non-Federal sources',
    '253': 'Other goods and services from Federal sources',
    '254': 'Operation and maintenance of facilities',
    '255': 'Research and development contracts',
    '256': 'Medical care',
    '257': 'Operation and maintenance of equipment',
    '258': 'Subsistence and support of persons',
    '260': 'Supplies and materials',
    '310': 'Equipment',
    '320': 'Land and structures',
    '330': 'Investments and loans',
    '410': 'Grants, subsidies, and contributions',
    '420': 'Insurance claims and indemnities',
    '430': 'Interest and dividends',
    '440': 'Refunds',
    '910': 'Unvouchered',
    '920': 'Undistributed',
    '940': 'Financial transfers'
};

export const objectClassDefinitionsGroups = {
    personnel_compensation_and_benefits: [
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
    contractual_services_and_supplies: [
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
    acquisition_of_assets: [
        '310',
        '320',
        '330'
    ],
    grants_and_fixed_changes: [
        '410',
        '420',
        '430',
        '440'
    ],
    other: [
        '910',
        '920',
        '940'
    ]
};

export const groupKeys = [
    'personnel_compensation_and_benefits',
    'contractual_services_and_supplies',
    'acquisition_of_assets',
    'grants_and_fixed_changes',
    'other'
];

export const groupLabels = {
    personnel_compensation_and_benefits: 'Personnel Compensation and Benefits',
    contractual_services_and_supplies: 'Contractual Services and Supplies',
    acquisition_of_assets: 'Acquisition of Assets',
    grants_and_fixed_changes: 'Grants and Fixed Changes',
    other: 'Other'
};

/* eslint-enable quote-props */
