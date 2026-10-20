/**
  * awardType.js
  * Created by Kevin Li 11/4/16
  **/

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
    '08': 'Loan Guarantees',
    '09': 'Indemnity/Insurance (non-loan)',
    '11': 'Other Financial Assistance',
    'F001': 'Grant',
    'F008': 'Asset Forfeiture/Equitable Sharing',
    'F009': 'Sale, Exchange, or Donation of Property and Goods',
    '-1': 'Not Specified'
};

export const awardTypeNewLinkCodes = {
    '02': 'F001',
    '03': 'F001',
    '04': 'F001',
    '05': 'F002',
    '06': 'F006',
    '07': 'F003',
    '08': 'F004',
    '09': 'F005',
    '10': 'F007',
    '11': 'F010'
};

// Updated array to include items that should be filtered out of the count for single items
export const awardTypeNewFCodes = {
    'F001': 'Grant',
    'F002': 'Cooperative Agreement',
    'F003': 'Direct Loans',
    'F004': 'Loan Guarantee',
    'F005': 'Indemnity/Insurance (non-loan)',
    'F006': 'Direct Payment for Specified Use',
    'F007': 'Direct Payment with Unrestricted Use',
    'F010': 'Other Financial Assistance',
    '03': 'Formula Grant',
    '04': 'Project Grant'
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
    '11': 'other-financial-assistance',
    '-1': 'not-specified'
};

export const awardTypeGroups = {
    contracts: ['A', 'B', 'C', 'D'],
    idvs: ['IDV_A', 'IDV_B', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E'],
    grants: ['02', '03', '04', 'F001'],
    cooperative_agreement: ['05', 'F002'],
    direct_payments: ['10', '06', 'F006', 'F007'],
    loans: ['07', '08', 'F003', 'F004'],
    other: ['09', 'F005', 'F008', 'F009', 'F010', '11', '-1']
};

export const bulkDownloadAwardTypeGroups = {
    contracts: awardTypeGroups.contracts,
    idvs: awardTypeGroups.idvs,
    grants: awardTypeGroups.grants.concat(awardTypeGroups.cooperative_agreement),
    direct_payments: awardTypeGroups.direct_payments,
    loans: awardTypeGroups.loans,
    insurance: ['09', 'F005'],
    other: ['11', 'F008', 'F009', 'F010', '-1']
};

export const transactionTypeGroups = {
    transaction_contracts: ['A', 'B', 'C', 'D'],
    transaction_idvs: ['IDV_A', 'IDV_B', 'IDV_B_A', 'IDV_B_B', 'IDV_B_C', 'IDV_C', 'IDV_D', 'IDV_E'],
    transaction_grants: ['02', '03', '04', 'F001', '05', 'F002'],
    transaction_direct_payments: ['10', '06', 'F006', 'F007'],
    transaction_loans: ['07', '08', 'F003', 'F004'],
    transaction_other: ['09', 'F005', 'F008', 'F009', 'F010', '11', '-1']
};

export const analyticsAwardTypeGroupLabels = {
    contracts: 'Contracts',
    idvs: 'Indefinite Delivery Vehicle',
    grants: 'Grants',
    cooperative_agreement: 'Cooperative Agreement',
    direct_payments: 'Direct Payments',
    loans: 'Loans',
    other: 'Other'
};

export const awardTypeGroupLabels = {
    contracts: 'Contracts',
    idvs: 'Contract IDVs',
    grants: 'Grants',
    cooperative_agreement: 'Cooperative Agreement',
    direct_payments: 'Direct Payments',
    loans: 'Loans',
    other: 'Other'
};

export const subawardTypeGroups = {
    subcontracts: awardTypeGroups.contracts.concat(awardTypeGroups.idvs),
    subgrants: awardTypeGroups
        .grants
        .concat(awardTypeGroups.cooperative_agreement)
        .concat(awardTypeGroups.direct_payments)
        .concat(awardTypeGroups.loans)
        .concat(awardTypeGroups.other)
};

export const awardTypesData = [
    {
        id: 'award-contracts',
        name: 'Contracts',
        filters: awardTypeGroups.contracts
    },
    {
        id: 'indefinite-delivery-vehicle',
        name: 'Contract IDVs',
        filters: awardTypeGroups.idvs
    },
    {
        id: 'award-grants',
        name: 'Grants',
        filters: awardTypeGroups.grants,
        singleitem: true
    },
    {
        id: 'award-cooperative-agreement',
        name: 'Cooperative Agreement',
        filters: awardTypeGroups.cooperative_agreement,
        singleitem: true
    },
    {
        id: 'award-direct-payments',
        name: 'Direct Payments',
        filters: awardTypeGroups.direct_payments
    },
    {
        id: 'award-loans',
        name: 'Loans',
        filters: awardTypeGroups.loans
    },
    {
        id: 'award-other',
        name: 'Other',
        filters: awardTypeGroups.other
    }
];
