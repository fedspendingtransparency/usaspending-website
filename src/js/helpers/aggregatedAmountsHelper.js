/**
 * aggregatedAmountsHelper.js
 * Created by Lizzie Salita 4/1/19
 */

/**
 * This fn is designed to easily produce appropriate parameters for each award type
 * for the determineSpendingScenario fn
 * @keys are awardTypes
 * @values are properties on redux.awardV2.overview object which are the
 * spending categories, in ascending order (under normative case), small, bigger, biggest (optional)
 * */
const spendingCategoriesByAwardType = {
    grant: ['_totalObligation, _nonFederalFunding, _baseAndAllOptions'],
    loan: ['_subsidy', '_faceValue'],
    other: [],
    contract: ['_totalObligation, _baseAndExercisedOptions, _baseAndAllOptions'],
    idv: ['_totalObligation, _baseAndExercisedOptions, _baseAndAllOptions']
};

export const getAscendingSpendingCategoriesByAwardType = (awardType, awardAmountObj) => {
    if (Object.keys(spendingCategoriesByAwardType).includes(awardType)) {
        return spendingCategoriesByAwardType[awardType]
            .map((category) => awardAmountObj[category]);
    }
    return [];
};

export const determineSpendingScenario = (small = 0, bigger = 0, biggest = null) => {
    // Small, bigger, and biggest define the expected ratio between spending category
    const allCategoriesAreInPlay = (small && bigger && biggest);
    if (small === 0 && bigger === 0 && biggest === 0) {
        return null;
    }
    if (allCategoriesAreInPlay && small >= 0) {
        if (small <= bigger && bigger <= biggest) {
            return 'normal';
        }
        else if (bigger <= small && small <= biggest) {
            return 'exceedsBigger';
        }
        else if (bigger <= biggest && biggest <= small) {
            return 'exceedsBiggest';
        }
    }
    else if (small >= 0) {
        if (small <= bigger) {
            return 'normal';
        }
        else if (bigger < small) {
            return 'exceedsBigger';
        }
    }

    return 'insufficientData';
};

export const generatePercentage = (value) => `${(value * 100).toFixed(2)}%`;
