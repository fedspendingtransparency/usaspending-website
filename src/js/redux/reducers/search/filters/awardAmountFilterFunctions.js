/**
 * Created by michaelbray on 3/8/17.
 */

import { awardRanges } from 'dataMapping/search/awardAmount';
import { OrderedMap } from 'immutable';
import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other files
export const updateAwardAmounts = (state, value) => {
    let updatedSet = state;

    // value.amount will either be:
    // 1) an integer, corresponding to included awardRanges
    // 2) an array, with two items, corresponding to user input

    if (value.searchType === 'specific') {
        // Toggle specific range selection
        if (updatedSet.get(value.searchType) !== undefined &&
            _.isEqual(updatedSet.get(value.searchType), value.amount)) {
            updatedSet = updatedSet.delete(value.searchType);
        }
        else {
            // Replace entire existing set with specific range
            updatedSet = new OrderedMap({
                specific: value.amount
            });
        }
    }
    else {
        const awardRangeID = `${value.amount}`;

        // Remove Specific filter if it exists
        if (updatedSet.has('specific')) {
            updatedSet = updatedSet.delete('specific');
        }

        // Toggle range selection
        if (updatedSet.has(awardRangeID)) {
            updatedSet = updatedSet.delete(awardRangeID);
        }
        else {
            updatedSet = updatedSet.set(awardRangeID, awardRanges[value.amount]);
        }
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
