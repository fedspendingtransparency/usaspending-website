/**
 * In the map spendingCategoriesByAwardType:
 * @keys are awardTypes
 * @values are properties on redux.award.overview object which are the
 * spending categories, in ascending order (under normative case), small, bigger, biggest (optional)
 */

export const orderedTableTitles = [
    "Outlayed Amount",
    "Obligated Amount",
    "COVID-19 Outlayed Amount",
    "COVID-19 Obligated Amount",
    "Current Award Amount",
    "Potential Award Amount",
    "Combined Outlayed Amounts",
    "Combined Obligated Amounts",
    "Combined Current Award Amounts",
    "Combined Potential Award Amounts",
    "Non-Federal Funding",
    "Total Funding",
    "Original Subsidy Cost",
    "Face Value of Direct Loan"
];

export const spendingCategoriesByAwardType = {
    loan: ['_subsidy', '_faceValue', '_totalOutlay'],
    contract: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions', '_totalOutlay'],
    idv: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions', '_totalOutlay'],
    idv_aggregated: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions', '_combinedOutlay']
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
        'baseAndAllOptionsFormatted',
        'totalOutlayFormatted'
    ],
    idv: [
        'fileCOutlayFormatted',
        'fileCObligatedFormatted',
        'totalObligationFormatted',
        'baseExercisedOptionsFormatted',
        'baseAndAllOptionsFormatted',
        'totalOutlayFormatted'
    ],
    idv_aggregated: [
        'fileCOutlayFormatted',
        'fileCObligatedFormatted',
        'totalObligationFormatted',
        'baseExercisedOptionsFormatted',
        'baseAndAllOptionsFormatted',
        'combinedOutlayFormatted'
    ],
    asst: [
        'fileCObligatedFormatted',
        'fileCOutlayFormatted',
        'totalObligationFormatted',
        'nonFederalFundingFormatted',
        'totalFundingFormatted',
        'totalOutlayFormatted'
    ],
    loan: [
        'fileCObligatedFormatted',
        'fileCOutlayFormatted',
        'subsidyFormatted',
        'faceValueFormatted',
        'totalOutlayFormatted'
    ]
};

export const awardTableClassMap = {
    "Combined Obligated Amounts": "award-amounts__obligated",
    "Combined Outlayed Amounts": "award-amounts__data-icon-dark-blue",
    "Combined Current Award Amounts": "award-amounts__current",
    "Combined Potential Award Amounts": "award-amounts__potential",
    "Obligated Amount": "award-amounts__obligated",
    "Current Award Amount": "award-amounts__current",
    "Potential Award Amount": "award-amounts__potential",
    "Non-Federal Funding": "award-amounts__data-icon_green",
    "Total Funding": "award-amounts__data-icon_transparent",
    "Face Value of Direct Loan": "award-amounts__data-icon_face-value",
    "Original Subsidy Cost": "award-amounts__data-icon_subsidy",
    "COVID-19 Obligated Amount": "award-amounts__file-c-obligations",
    "COVID-19 Outlayed Amount": "award-amounts__file-c-outlays",
    "Outlayed Amount": "award-amounts__data-icon-dark-blue"
};

export const tableTitlesBySpendingCategoryAndAwardType = {
    asst: {
        totalFundingFormatted: 'Total Funding',
        nonFederalFundingFormatted: 'Non-Federal Funding',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Obligated Amount',
        totalOutlayFormatted: 'Outlayed Amount'
    },
    idv_aggregated: {
        baseExercisedOptionsFormatted: 'Combined Current Award Amounts',
        baseAndAllOptionsFormatted: 'Combined Potential Award Amounts',
        totalObligationFormatted: 'Combined Obligated Amounts',
        combinedOutlayFormatted: 'Combined Outlayed Amounts',
        fileCOutlayFormatted: 'COVID-19 Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Obligated Amount'
    },
    contract: {
        totalOutlayFormatted: 'Outlayed Amount',
        totalObligationFormatted: 'Obligated Amount',
        baseExercisedOptionsFormatted: 'Current Award Amount',
        baseAndAllOptionsFormatted: 'Potential Award Amount',
        fileCOutlayFormatted: 'COVID-19 Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Obligated Amount'
    },
    idv: {
        baseExercisedOptionsFormatted: 'Current Award Amount',
        baseAndAllOptionsFormatted: 'Potential Award Amount',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Obligated Amount',
        totalOutlayFormatted: 'Outlayed Amount'
    },
    loan: {
        subsidyFormatted: 'Original Subsidy Cost',
        faceValueFormatted: 'Face Value of Direct Loan',
        fileCOutlayFormatted: 'COVID-19 Outlayed Amount',
        fileCObligatedFormatted: 'COVID-19 Obligated Amount',
        totalOutlayFormatted: 'Outlayed Amount'
    }
};

// similar relationship between spending categories
export const asstAwardTypesWithSimilarAwardAmountData = ['grant', 'other', 'insurance', 'direct payment'];

export const outlayColor = '#0b2e5a';
export const obligatedColor = '#4773aa';
export const currentColor = '#8aa6c9';
export const potentialColor = '#dce4ee';
export const subsidyColor = '#0B424D';
export const faceValueColor = '#F3F3F3';
export const nonFederalFundingColor = '#47AAA7';

// Offsets per DEV-5242:
// 3px padding between outermost bar and first nested bar
const defaultPadding = 6;
// 2px of padding for each additional nested bar
const additionalPadding = 4;
// offset = defaultPadding + (additionalPadding * levels nested relative to outermost bar)
export const lineOffsetsBySpendingCategory = {
    obligationProcurement: defaultPadding + (additionalPadding * 1),
    obligationAsst: defaultPadding,
    // mark up for loans is a bit different.
    subsidy: 3,
    totalFunding: defaultPadding,
    nonFederalFunding: defaultPadding,
    faceValue: 0,
    current: defaultPadding,
    potential: 0,
    // cannot understand why we have to divide this by two...!!!???
    fileCProcurementObligated: (defaultPadding + (additionalPadding * 2)) / 2,
    fileCProcurementOutlay: (defaultPadding + (additionalPadding * 3)) / 2,
    fileCAsstObligation: defaultPadding + (additionalPadding * 1),
    fileCAsstOutlay: defaultPadding + (additionalPadding * 2),
    loanFileCObligated: 7,
    loanFileCOutlay: 9
};
