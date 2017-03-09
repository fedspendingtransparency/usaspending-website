/**
 * Created by michaelbray on 3/8/17.
 */

const awardsAmountField = 'total_obligation';
const transactionsAmountField = 'federal_action_obligation';

const parseAwardAmount = (amount, endpointType) => {
    const amountField = endpointType === 'awards' ? awardsAmountField : transactionsAmountField;

    let filter = null;

    if (amount[0] === null && amount[1] !== null) {
        // Minimum value is null
        filter = {
            field: amountField,
            operation: "less_than_or_equal",
            value: amount[1]
        };
    }
    else if (amount[0] !== null && amount[1] === null) {
        // Maximum value is null
        filter = {
            field: amountField,
            operation: "greater_than_or_equal",
            value: amount[0]
        };
    }
    else if (amount[0] !== null && amount[1] !== null) {
        // Both minimum and maximum values are populated
        filter = {
            field: amountField,
            operation: "range",
            value: amount
        };
    }

    return filter;
};

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const buildAwardAmountQuery = (awardAmounts, endpointType) => {
    const awardAmountSet = {
        combine_method: 'OR',
        filters: []
    };

    // Push legal_entity_id's of selected recipients
    awardAmounts.forEach((awardAmount) => {
        awardAmountSet.filters.push(parseAwardAmount(awardAmount, endpointType));
    });

    return awardAmountSet;
};
/* eslint-enable import/prefer-default-export */
