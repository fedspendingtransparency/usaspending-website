/**
 * awardTypeDescriptions.js
 * Created by Max Kendall 3/8/19
 */

export const longTypeDescriptionsByAwardTypes = {
    A: 'Blanket Purchase Agreements (BPA) Call',
    B: 'Purchase Orders (PO)',
    C: 'Delivery Orders (DO)',
    D: 'Definitive Contract',
    E: 'Unknown Type',
    F: 'Cooperative Agreement',
    G: 'Grant for Research',
    S: 'Funded Space Act Agreement',
    T: 'Training Grant',
    IDV_A: "Government Wide Acquisition Contract",
    IDV_B: "Indefinite Delivery Contract",
    IDV_B_A: "Indefinite Delivery / Requirements Contract",
    IDV_B_B: "Indefinite Delivery / Indefinite Quantity (IDIQ) Contract",
    IDV_B_C: "Indefinite Delivery / Definite Quantity Contract",
    IDV_C: "Federal Supply Schedule",
    IDV_D: "Basic Ordering Agreement",
    IDV_E: "Blanket Purchase Agreement",
    '02': 'Block Grant',
    '03': 'Formula Grant',
    '04': 'Project Grant',
    '05': 'Cooperative Agreement',
    10: 'Direct Payment with Unrestricted Use',
    '06': 'Direct Payment for Specified Use',
    '07': 'Direct Loan',
    '08': 'Guaranteed/Insured Loan',
    '09': 'Insurance',
    11: 'Other Financial Assistance'
};

/**
 * NOTE:
 *   The values in this map are not identical with lookups/lookups.py awardTypeMapping;
 *   specifically, in lookups.py the values for the IDV award types are prepended with an acronym.
 *   I have decided to remove this prepended acronym for these types as the wireframes
 *   suggest this is the desired format in the UI
 */
