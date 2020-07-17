/**
 * In the map spendingCategoriesByAwardType:
 * @keys are awardTypes
 * @values are properties on redux.award.overview object which are the
 * spending categories, in ascending order (under normative case), small, bigger, biggest (optional)
 */


export const spendingCategoriesByAwardType = {
    loan: ['_subsidy', '_faceValue'],
    contract: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions'],
    idv: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions'],
    idv_aggregated: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions']
};

export const caresActSpendingCategories = [
    'fileCObligatedFormatted',
    'fileCOutlayFormatted'
];

export const formattedSpendingCategoriesByAwardType = {
    contract: [
        'fileCOutlayFormatted',
        'fileCObligatedFormatted',
        'totalObligationFormatted',
        'baseExercisedOptionsFormatted',
        'baseAndAllOptionsFormatted'
    ],
    idv: [
        'fileCOutlayFormatted',
        'fileCObligatedFormatted',
        'totalObligationFormatted',
        'baseExercisedOptionsFormatted',
        'baseAndAllOptionsFormatted'
    ],
    idv_aggregated: [
        'fileCOutlayFormatted',
        'fileCObligatedFormatted',
        'totalObligationFormatted',
        'baseExercisedOptionsFormatted',
        'baseAndAllOptionsFormatted'
    ],
    asst: [
        'fileCObligatedFormatted',
        'fileCOutlayFormatted',
        'totalObligationFormatted',
        'nonFederalFundingFormatted',
        'totalFundingFormatted'
    ],
    loan: [
        'fileCObligatedFormatted',
        'fileCOutlayFormatted',
        'subsidyFormatted',
        'faceValueFormatted'
    ]
};

export const awardTableClassMap = {
    "Combined Obligated Amounts": "award-amounts__obligated",
    "Combined Current Amounts": "award-amounts__current",
    "Combined Potential Amounts": "award-amounts__potential",
    "Obligated Amount": "award-amounts__obligated",
    "Current Amount": "award-amounts__current",
    "Potential Amount": "award-amounts__potential",
    "Non-Federal Funding": "award-amounts__data-icon_green",
    "Total Funding": "award-amounts__data-icon_transparent",
    "Face Value of Direct Loan": "award-amounts__data-icon_face-value",
    "Original Subsidy Cost": "award-amounts__data-icon_subsidy",
    "COVID-19 Response Obligated Amount": "award-amounts__file-c-obligations",
    "COVID-19 Response Outlayed Amount": "award-amounts__file-c-outlays"
};

export const tableTitlesBySpendingCategoryAndAwardType = {
    asst: {
        totalFundingFormatted: 'Total Funding',
        nonFederalFundingFormatted: 'Non-Federal Funding',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 Response Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Response Obligated Amount'
    },
    idv_aggregated: {
        baseExercisedOptionsFormatted: 'Combined Current Amounts',
        baseAndAllOptionsFormatted: 'Combined Potential Amounts',
        totalObligationFormatted: 'Combined Obligated Amounts',
        fileCOutlayFormatted: 'COVID-19 Response Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Response Obligated Amount'
    },
    contract: {
        baseExercisedOptionsFormatted: 'Current Amount',
        baseAndAllOptionsFormatted: 'Potential Amount',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 Response Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Response Obligated Amount'
    },
    idv: {
        baseExercisedOptionsFormatted: 'Current Amount',
        baseAndAllOptionsFormatted: 'Potential Amount',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 Response Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Response Obligated Amount'
    },
    loan: {
        subsidyFormatted: 'Original Subsidy Cost',
        faceValueFormatted: 'Face Value of Direct Loan',
        fileCOutlayFormatted: 'COVID-19 Response Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Response Obligated Amount'
    }
};

// similar relationship between spending categories
export const asstAwardTypesWithSimilarAwardAmountData = ['grant', 'other', 'insurance', 'direct payment'];

export const obligatedColor = '#0A2F5A';
export const currentColor = '#558EC6';
export const potentialColor = '#AAC6E2';
export const subsidyColor = '#0B424D';
export const faceValueColor = '#F3F3F3';
export const nonFederalFundingColor = '#47AAA7';

// Offsets per DEV-5242:
// 5px horizontal padding (border + padding) on each side.
const defaultPadding = 10;
// 2px of padding on each side
const additionalPadding = 4;
// Default padding + (additionalPadding * levels nested)
const barLabelAndLineOffsetsBySpendingCategory = {
    obligationProcurment: defaultPadding + (additionalPadding * 2),
    obligationAsst: defaultPadding,
    subsidy: defaultPadding,
    totalFunding: defaultPadding,
    nonFederalFunding: defaultPadding,
    faceValue: defaultPadding,
    fileCProcurmentObligated: defaultPadding + (additionalPadding * 3),
    fileCProcurmentOutlay: defaultPadding + (additionalPadding * 4),
    current: defaultPadding + additionalPadding,
    potential: defaultPadding
};
