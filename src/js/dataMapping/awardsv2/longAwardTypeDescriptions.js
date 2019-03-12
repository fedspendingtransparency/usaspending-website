/**
 * awardTypeDescriptions.js
 * Created by Max Kendall 3/8/19
 */

export const longTypeDescriptionsByAwardTypes = {
    IDV_A: "Government Wide Acquisition Contract",
    IDV_B: "Multi-Agency Contract, Other Indefinite Delivery Contract",
    IDV_B_A: "Indefinite Delivery Contract / Requirements",
    IDV_B_B: "Indefinite Delivery Contract / Indefinite Quantity",
    IDV_B_C: "Indefinite Delivery Contract / Definite Quantity",
    IDV_C: "Federal Supply Schedule",
    IDV_D: "Basic Ordering Agreement",
    IDV_E: "Blanket Purchase Agreement"
};

/**
 * NOTE:
 *   The values in this map are not identical with lookups/lookups.py awardTypeMapping;
 *   specifically, in lookups.py the values for the IDV award types are prepended with an acronym.
 *   I have decided to remove this prepended acronym for these types as the wireframes
 *   suggest this is the desired format in the UI
 */
