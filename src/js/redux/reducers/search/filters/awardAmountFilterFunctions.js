/**
 * Created by michaelbray on 3/8/17.
 */

import { awardRanges } from 'dataMapping/search/awardAmount';
import { OrderedMap } from 'immutable';
import { isEqual, flatten, map, compact, each } from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other files
// value is an array with [min, max]
// min and max are numbers or null
export const updateAwardAmounts = (state, value) => {
    let awardAmounts = state;
    // value will be an array [min, max] or a string
    // e.g. string, 'range-1' signifying a range from awardRanges
    // e.g. [min, max], min and max will be a number or null
    // null signifies postitive or negative infinity

    // get any possible range
    // mapkeys, gets any current range that exists in redux since we will not know the key
    // compact, removes any falsey values
    // flatten, since the range will be an array we will have [[min, max]]
    // and we need to flatten this into [min, max]
    const currentRange = flatten(
        compact(
            map(awardRanges, (val, key) => awardAmounts.get(key))));
    // if the current range is the same as what a user checked
    // set award amounts to be empty since the user is unchecking the same
    // checkbox
    if (currentRange.length !== 0) {
    // find the correct range key and delete it
        each(awardRanges, (val) => {
            if (isEqual(val, currentRange)) {
                awardAmounts = new OrderedMap({});
            }
        });
    }
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
    if (!valueIsAString) {
    // since the inputs must be numbers or strings
    // an empty string will represent no value.
    // and we will convert those to null here
        let min = value[0];
        let max = value[1];
        if (!min && min !== 0) min = null;
        if (!max && max !== 0) max = null;
        // convert to numbers, inputs must be strings to handle zeros
        if (min) min = Number(min);
        if (max) max = Number(max);
        const specific = [min, max];
        awardAmounts = new OrderedMap({
            specific
        });
    }
    return awardAmounts;
};
/* eslint-enable import/prefer-default-export */
