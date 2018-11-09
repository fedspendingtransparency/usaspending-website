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
    'IDV_A': 'GWAC',
    // IDV_B: <to be determined>
    'IDV_B_A': 'Requirements',
    'IDV_B_B': 'Indefinite Quantity',
    'IDV_B_C': 'Definite Quantity',
    'IDV_C': 'FSS',
    'IDV_D': 'BOA',
    'IDV_E': 'BPA',
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
    idv: ['IDV_A', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E'],
    grants: ['02', '03', '04', '05'],
    direct_payments: ['10', '06'],
    loans: ['07', '08'],
    other: ['09', '11']
};


export const awardTypeGroupLabels = {
    contracts: 'Contracts',
    idv: "Indefinite Vehicle Delivery",
    grants: 'Grants',
    direct_payments: 'Direct Payments',
    loans: 'Loans',
    other: 'Other'
};

export const subawardTypeGroups = {
    subcontracts: awardTypeGroups.contracts,
    subgrants: awardTypeGroups.grants
};
