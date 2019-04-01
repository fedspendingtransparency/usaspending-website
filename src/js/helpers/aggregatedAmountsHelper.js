/**
 * aggregatedAmountsHelper.js
 * Created by Lizzie Salita 4/1/19
 */

// Handle edge cases in the IDV Combined Award Amounts visualization

/* eslint-disable import/prefer-default-export */

export const determineScenario = (amounts) => {
    const obligated = amounts._obligation;
    const ccaa = amounts._combinedCurrentAwardAmounts;
    const cpaa = amounts._combinedPotentialAwardAmounts;

    if (obligated >= 0) {
        if (obligated <= ccaa && obligated <= cpaa) {
            return 'normal';
        }
        else if (obligated > ccaa && obligated <= cpaa) {
            return 'exceedsCurrent';
        }
        else if (obligated > ccaa && obligated > cpaa) {
            return 'exceedsBoth';
        }
    }
    else if (Math.abs(obligated) <= cpaa) {
        return 'deobligated';
    }
    else if (Math.abs(obligated) > cpaa) {
        return 'overDeobligated';
    }

    return 'insufficientData';
};

/* eslint-enable import/prefer-default-export */
