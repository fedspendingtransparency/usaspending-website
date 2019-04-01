/**
 * aggregatedAmountsHelper.js
 * Created by Lizzie Salita 4/1/19
 */

// Handle edge cases in the IDV Combined Award Amounts visualization

/* eslint-disable import/prefer-default-export */

export const determineScenario = (amounts) => {
    const obligated = amounts._obligation;
    const current = amounts._combinedCurrentAwardAmounts;
    const potential = amounts._combinedPotentialAwardAmounts;

    if (obligated >= 0) {
        if (obligated <= current && current <= potential) {
            return 'normal';
        }
        else if (current <= obligated && obligated <= potential) {
            return 'exceedsCurrent';
        }
        else if (current <= potential && potential <= obligated) {
            return 'exceedsPotential';
        }
    }

    return 'insufficientData';
};

/* eslint-enable import/prefer-default-export */
