/**
 * awardAmountHelper.js
 * Created by michaelbray on 3/7/17.
 */

import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';

// formats the specific checkboxes
// options are NPM accounting package options
export const formatAwardAmountRange = (range, options = 2) => {
    const minLabel = formatMoneyWithPrecision(range[0], options);
    const maxLabel = formatMoneyWithPrecision(range[1], options);
    let label = `${minLabel} - ${maxLabel}`;
    if (!range[0] && (range[0] !== 0)) {
        label = `Under ${maxLabel}`;
    }
    if (!range[1] && (range[1] !== 0)) {
        label = `${minLabel} & Above`;
    }
    return label;
};

/**
 * This fn & map together are designed to return the appropriate parameters for each award type
 * for the determineSpendingScenario fn.

* In the fn getAscendingSpendingCategoriesByAwardType:
 * @awardType is one of grant, loan, other, contract, idv
 * @awardAmountObj is the object from the api, parsed by our models, keyed by spending-category w/ integer values.

 * In the map spendingCategoriesByAwardType:
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

