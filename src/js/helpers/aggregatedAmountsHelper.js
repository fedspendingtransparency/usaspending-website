/**
 * aggregatedAmountsHelper.js
 * Created by Lizzie Salita 4/1/19
 */

// Handle edge cases in the IDV Combined Award Amounts visualization

export const determineSpendingScenario = (amounts) => {
    const obligated = amounts._obligation;
    const current = amounts._combinedCurrentAwardAmounts;
    const potential = amounts._combinedPotentialAwardAmounts;
    
    if (obligated === 0 && current === 0 && potential === 0) {
        return null;
    }
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

export const generatePercentage = (value) => `${(value * 100).toFixed(2)}%`;
