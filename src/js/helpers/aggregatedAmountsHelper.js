/**
 * aggregatedAmountsHelper.js
 * Created by Lizzie Salita 4/1/19
 */

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
