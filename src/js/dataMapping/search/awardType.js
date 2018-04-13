/**
  * awardType.js
  * Created by Kevin Li 11/4/16
  **/

/* eslint-disable quote-props */
// disable quote-props for consistency sake (we need leading zeroes)
export const awardTypeCodes = {
    'A': 'Blanket Purchase Agreements (BPA) Calls',
    'B': 'Purchase Orders (PO)',
    'C': 'Delivery Orders (DO)',
    'D': 'Definitive Contracts',
    '02': 'Block Grant',
    '03': 'Formula Grant',
    '04': 'Project Grant',
    '05': 'Cooperative Agreement',
    '10': 'Direct Payment with Unrestricted Use',
    '06': 'Direct Payment for Specified Use',
    '07': 'Direct Loans',
    '08': 'Guaranteed/Insured Loans',
    '09': 'Insurance',
    '11': 'Other Financial Assistance'
};
/* eslint-enable quote-props */

export const awardTypeGroups = {
    contracts: ['A', 'B', 'C', 'D'],
    grants: ['02', '03', '04', '05'],
    direct_payments: ['10', '06'],
    loans: ['07', '08'],
    other: ['09', '11']
};


export const awardTypeGroupLabels = {
    contracts: 'Contracts',
    grants: 'Grants',
    direct_payments: 'Direct Payments',
    loans: 'Loans',
    other: 'Other'
};

export const subawardTypeGroups = {
    subcontracts: awardTypeGroups.contracts,
    subgrants: awardTypeGroups.grants
};
