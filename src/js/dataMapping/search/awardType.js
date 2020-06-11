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
    'IDV_A': 'Government-Wide Acquisition Contract (GWAC)',
    'IDV_B': 'Multi-Agency Contract, Other Indefinite Delivery Contract (IDC)',
    'IDV_B_A': 'Indefinite Delivery / Requirements Contract',
    'IDV_B_B': 'Indefinite Delivery / Indefinite Quantity (IDIQ) Contract',
    'IDV_B_C': 'Indefinite Delivery / Definite Quantity Contract',
    'IDV_C': 'Federal Supply Schedule (FSS)',
    'IDV_D': 'Basic Ordering Agreement (BOA)',
    'IDV_E': 'Blanket Purchase Agreements (BPA)',
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

export const glossaryLinks = {
    'A': 'blanket-purchase-agreement-bpa',
    'B': 'purchase-order',
    'C': 'delivery-order-contract',
    'D': 'definitive-contract',
    'E': '', // Unknown Type
    'F': 'cooperative-agreement',
    'G': '',
    'S': '',
    'T': '',
    'IDV_A': 'government-wide-acquisition-contract-gwac',
    'IDV_B': 'indefinite-delivery-contract-idc',
    'IDV_B_A': 'indefinite-delivery-requirements-contract',
    'IDV_B_B': 'indefinite-delivery-indefinite-quantity-idiq-contract',
    'IDV_B_C': 'indefinite-delivery-definite-quantity-contract',
    'IDV_C': 'federal-supply-schedule-fss',
    'IDV_D': 'basic-ordering-agreement-boa',
    'IDV_E': 'blanket-purchase-agreement-bpa',
    '02': 'block-grant',
    '03': 'formula-grant',
    '04': 'project-grant',
    '05': 'cooperative-agreement',
    '10': 'direct-payment-with-unrestricted-use',
    '06': 'direct-payment-for-specified-use',
    '07': 'direct-loan',
    '08': 'guaranteed-insured-loans',
    '09': 'insurance',
    '11': 'other-financial-assistance'
};

/* eslint-enable quote-props */

export const awardTypeGroups = {
    contracts: ['A', 'B', 'C', 'D'],
    idvs: ['IDV_A', 'IDV_B', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E'],
    grants: ['02', '03', '04', '05'],
    direct_payments: ['10', '06'],
    loans: ['07', '08'],
    other: ['09', '11']
};

export const analyticsAwardTypeGroupLabels = {
    contracts: 'Contracts',
    idvs: "Indefinite Delivery Vehicle",
    grants: 'Grants',
    direct_payments: 'Direct Payments',
    loans: 'Loans',
    other: 'Other'
};

export const awardTypeGroupLabels = {
    contracts: 'Contracts',
    idvs: "Contract IDVs",
    grants: 'Grants',
    direct_payments: 'Direct Payments',
    loans: 'Loans',
    other: 'Other'
};

export const subawardTypeGroups = {
    subcontracts: awardTypeGroups.contracts.concat(awardTypeGroups.idvs),
    subgrants: awardTypeGroups.grants.concat(awardTypeGroups.direct_payments).concat(awardTypeGroups.loans).concat(awardTypeGroups.other)
};
