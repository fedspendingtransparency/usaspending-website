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
    'E': 'Unknown Type',
    'F': 'Cooperative Agreement',
    'G': 'Grant for Research',
    'S': 'Funded Space Act Agreement',
    'T': 'Training Grant',
    'IDV_A': 'Government-Wide Acquisition Contract',
    'IDV_B_A': 'INDEFINITE DELIVERY / REQUIREMENTS',
    'IDV_B_B': 'INDEFINITE DELIVERY / INDEFINITE QUANTITY',
    'IDV_B_C': 'INDEFINITE DELIVERY / DEFINITE QUANTITY',
    'IDV_C': 'Federal Supply Schedule',
    'IDV_D': 'Basic Ordering Agreement',
    'IDV_E': 'BPA Call',
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
    idvs: ['IDV_A', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E'],
    grants: ['02', '03', '04', '05'],
    direct_payments: ['10', '06'],
    loans: ['07', '08'],
    other: ['09', '11']
};


export const awardTypeGroupLabels = {
    contracts: 'Contracts',
    idvs: "Indefinite Vehicle Delivery",
    grants: 'Grants',
    direct_payments: 'Direct Payments',
    loans: 'Loans',
    other: 'Other'
};

export const subawardTypeGroups = {
    subcontracts: awardTypeGroups.contracts,
    subgrants: awardTypeGroups.grants
};
