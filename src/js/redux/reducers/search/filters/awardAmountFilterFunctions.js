/**
 * Created by michaelbray on 3/8/17.
 */

import { awardRanges } from 'dataMapping/search/awardAmount';
import { OrderedMap } from 'immutable';
import { isEqual } from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other files
// value is an array with [min, max]
// min and max are numbers or null
export const updateAwardAmounts = (state, value) => {
    let awardAmounts = state;

    // value will be an array [min, max] or a string
    // 'range-1' signifying a range from awardRanges
    // min and max will be a number or null
    // null signifies postitive or negative infinity

    // delete a specific range if it exists
    const specific = awardAmounts.get('specific');
    if (specific) awardAmounts.delete('specific');
    // get any possible range
    const range0 = awardAmounts.get('range-0');
    const range1 = awardAmounts.get('range-1');
    const range2 = awardAmounts.get('range-2');
    const range3 = awardAmounts.get('range-3');
    const range4 = awardAmounts.get('range-4');
    // create an array of possible current award ranges to filter
    const rangeArray = [
        range0,
        range1,
        range2,
        range3,
        range4
    ];
    // the current award range
    const currentRange = rangeArray.filter((range) => {
        if (range) return range;
    }).flatMap((range) => range);
    if (currentRange) awardAmounts.delete(currentRange);
    // check if value is a string
    const valueIsAString = typeof value === 'string';
    // get the new award range
    // checkbox range logic
    const newAwardRange = awardRanges[value];
    // if there is no current range, add it
    if (valueIsAString && (currentRange.length === 0)) {
        awardAmounts = new OrderedMap({
            [value]: newAwardRange
        });
    }
    // set the new range if it is not the same as the current range
    if (valueIsAString && !isEqual(currentRange, newAwardRange)) {
        awardAmounts = new OrderedMap({
            [value]: newAwardRange
        });
    }
    // specific input logic
    // value is a specific amount which is an array [min,max]
    if (!valueIsAString && !isEqual(specific, value)) {
        awardAmounts = new OrderedMap({
            specific: value
        });
    }
    return awardAmounts;
};
/* eslint-enable import/prefer-default-export */
