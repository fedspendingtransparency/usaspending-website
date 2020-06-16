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

// TODO: [DEV-5434] Remove White Listed Award IDs for Mock Award Amount Data
export const mockAwardIdsForCaresAct = [
    // contract
    'CONT_AWD_N0001917C0001_9700_-NONE-_-NONE-',
    // exceeds current contract
    'CONT_AWD_W91QVN04P2195_9700_-NONE-_-NONE-',
    // exceeds potential contract
    'CONT_AWD_WCO00200110D68R80201_6800_-NONE-_-NONE-',
    // IDV
    'CONT_IDV_EDFSA09D0012_9100',
    // Exceeds Current IDV
    'CONT_IDV_SLMAQM01D0074_1900',
    // Exceeds Potential IDV
    'CONT_IDV_GS10F0287L_4730',
    // grant
    'ASST_NON_1905CA5MAP_7530',
    // loan
    'ASST_NON_13789835_12D2'
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
        'fileCObligatedFormatted',
        'fileCOutlayFormatted',
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
    "Combined Obligated Amounts": "award-amounts__data-icon_blue",
    "Combined Current Amounts": "award-amounts__data-icon_gray",
    "Combined Potential Amounts": "award-amounts__data-icon_transparent",
    "Obligated Amount": "award-amounts__data-icon_blue",
    "Current Amount": "award-amounts__data-icon_gray",
    "Potential Amount": "award-amounts__data-icon_transparent",
    // TODO: [DEV-5309] update colors for post cares act release
    // "Combined Obligated Amounts": "award-amounts__obligated",
    // "Combined Current Amounts": "award-amounts__current",
    // "Combined Potential Amounts": "award-amounts__potential",
    // "Obligated Amount": "award-amounts__obligated",
    // "Current Amount": "award-amounts__current",
    // "Potential Amount": "award-amounts__potential",
    "Non-Federal Funding": "award-amounts__data-icon_green",
    "Total Funding": "award-amounts__data-icon_gray",
    "Face Value of Direct Loan": "award-amounts__data-icon_transparent",
    "Original Subsidy Cost": "award-amounts__data-icon_yellow",
    "COVID-19 2020 Related Obligations Amount": "award-amounts__file-c-obligations",
    "COVID-19 2020 Related Outlays Amount": "award-amounts__file-c-outlays"
};

export const tableTitlesBySpendingCategoryAndAwardType = {
    asst: {
        totalFundingFormatted: 'Total Funding',
        nonFederalFundingFormatted: 'Non-Federal Funding',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 2020 Related Outlays Amount',
        fileCObligatedFormatted: 'COVID-19 2020 Related Obligations Amount'
    },
    idv_aggregated: {
        baseExercisedOptionsFormatted: 'Combined Current Amounts',
        baseAndAllOptionsFormatted: 'Combined Potential Amounts',
        totalObligationFormatted: 'Combined Obligated Amounts',
        fileCOutlayFormatted: 'COVID-19 2020 Related Outlays Amount',
        fileCObligatedFormatted: 'COVID-19 2020 Related Obligations Amount'
    },
    contract: {
        baseExercisedOptionsFormatted: 'Current Amount',
        baseAndAllOptionsFormatted: 'Potential Amount',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 2020 Related Outlays Amount',
        fileCObligatedFormatted: 'COVID-19 2020 Related Obligations Amount'
    },
    idv: {
        baseExercisedOptionsFormatted: 'Current Amount',
        baseAndAllOptionsFormatted: 'Potential Amount',
        totalObligationFormatted: 'Obligated Amount',
        fileCOutlayFormatted: 'COVID-19 2020 Related Outlays Amount',
        fileCObligatedFormatted: 'COVID-19 2020 Related Obligations Amount'
    },
    loan: {
        subsidyFormatted: 'Original Subsidy Cost',
        faceValueFormatted: 'Face Value of Direct Loan',
        fileCOutlayFormatted: 'COVID-19 2020 Related Outlays Amount',
        fileCObligatedFormatted: 'COVID-19 2020 Related Obligations Amount'
    }
};

// similar relationship between spending categories
export const asstAwardTypesWithSimilarAwardAmountData = ['grant', 'other', 'insurance', 'direct payment'];
