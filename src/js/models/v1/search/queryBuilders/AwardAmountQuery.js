/**
 * Created by michaelbray on 3/8/17.
 */

import * as FilterFields from 'dataMapping/search/filterFields';

const parseAwardAmount = (amount, searchContext = 'award') => {
    const field = FilterFields[`${searchContext}Fields`].awardAmount;

    const min = amount[0];
    let max = amount[1];
    let filter = null;

    // This should be taken care of in the component, but check just in case
    if (min >= max) {
    // If minimum is larger than maximum, take minimum value
        max = 0;
    }

    if (min === 0 && max === 0) {
    // No values provided
        filter = {
            field,
            operation: "greater_than_or_equal",
            value: 0
        };
    }
    else if (min === 0 && max !== 0) {
    // Minimum value is null
        filter = {
            field,
            operation: "less_than_or_equal",
            value: max
        };
    }
    else if (min !== 0 && max === 0) {
    // Maximum value is null
        filter = {
            field,
            operation: "greater_than_or_equal",
            value: min
        };
    }
    else if (min !== 0 && max !== 0) {
    // Both minimum and maximum values are populated
        filter = {
            field,
            operation: "range",
            value: amount
        };
    }

    return filter;
};

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const buildAwardAmountQuery = (awardAmounts, searchContext) => {
    const awardAmountSet = {
        combine_method: 'OR',
        filters: []
    };

    // Push legal_entity_id's of selected recipients
    awardAmounts.forEach((awardAmount) => {
        awardAmountSet.filters.push(parseAwardAmount(awardAmount, searchContext));
    });

    return awardAmountSet;
};
/* eslint-enable import/prefer-default-export */
