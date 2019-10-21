/**
 * In the map spendingCategoriesByAwardType:
 * @keys are awardTypes
 * @values are properties on redux.awardV2.overview object which are the
 * spending categories, in ascending order (under normative case), small, bigger, biggest (optional)
 */

// eslint-disable-next-line import/prefer-default-export
export const spendingCategoriesByAwardType = {
    loan: ['_subsidy', '_faceValue'],
    contract: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions'],
    idv: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions']
};

export const formattedSpendingCategoriesByAwardType = {
    contract: ['totalObligationFormatted', 'baseExercisedOptionsFormatted', 'baseAndAllOptionsFormatted'],
    idv: ['totalObligationFormatted', 'baseExercisedOptionsFormatted', 'baseAndAllOptionsFormatted'],
    asst: ['totalObligationFormatted', 'nonFederalFundingFormatted', 'totalFundingFormatted'],
    loan: ['subsidyFormatted', 'faceValueFormatted']
};

export const awardTableClassMap = {
    "Combined Obligated Amounts": "award-amounts__data-icon_blue",
    "Combined Current Amounts": "award-amounts__data-icon_gray",
    "Combined Potential Amounts": "award-amounts__data-icon_transparent",
    "Obligated Amount": "award-amounts__data-icon_blue",
    "Current Amount": "award-amounts__data-icon_gray",
    "Potential Amount": "award-amounts__data-icon_transparent",
    "Non-Federal Funding": "award-amounts__data-icon_green",
    "Total Funding": "award-amounts__data-icon_gray",
    "Face Value of Direct Loan": "award-amounts__data-icon_transparent",
    "Original Subsidy Cost": "award-amounts__data-icon_yellow"
};

export const tableTitlesBySpendingCategoryAndAwardType = {
    asst: {
        totalFundingFormatted: 'Total Funding',
        nonFederalFundingFormatted: 'Non-Federal Funding',
        totalObligationFormatted: 'Obligated Amount'
    },
    idv: {
        baseExercisedOptionsFormatted: 'Combined Current Amounts',
        baseAndAllOptionsFormatted: 'Combined Potential Amounts',
        totalObligationFormatted: 'Combined Obligated Amounts'
    },
    contract: {
        baseExercisedOptionsFormatted: 'Current Amount',
        baseAndAllOptionsFormatted: 'Potential Amount',
        totalObligationFormatted: 'Obligated Amount'
    },
    loan: {
        subsidyFormatted: 'Original Subsidy Cost',
        faceValueFormatted: 'Face Value of Direct Loan'
    }
};

// similar relationship between spending categories
export const asstAwardTypesWithSimilarAwardAmountData = ['grant', 'other', 'insurance', 'direct payment'];
