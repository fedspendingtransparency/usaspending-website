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
    // this is just the name of the property we set
    // the award range array to in redux
    const awardProperty = 'awardRange';
    console.log(' Update Set : ', awardAmounts.toObject());
    console.log(' Value : ', value);
    // value.amount will either be:
    // 1) an integer, corresponding to included awardRanges
    // 2) an array, with two items, corresponding to user input

    const currentAwardArray = awardAmounts.get(awardProperty);
    // add the range if one does not exist
    if (!awardAmounts) {
        awardAmounts = new OrderedMap({
            awardRange: value
        });
    }
    // if the same range exists, remove it
    // this happens if a user unchecks a checkbox
    // or deletes both min and max input boxes
    else if (isEqual(currentAwardArray, value) || isEqual([null, null], value)) {
        awardAmounts.delete(awardProperty);
    }
    // update the awardRange
    else {
        awardAmounts.set(awardProperty, value);
    }
    // if (value.searchType === 'specific') {
    // Toggle specific range selection
    // if () {
    //     awardAmounts = awardAmounts.set(awardProperty, value);
    // }
    // else {
    // Replace entire existing set with specific range
    // awardAmounts = new OrderedMap({
    //     awardRange: value
    // });
    // }
    // }
    // else {
    //     const awardRangeID = `${value.amount}`;

    //     // Remove Specific filter if it exists
    //     if (updatedSet.has('specific')) {
    //         updatedSet = updatedSet.delete('specific');
    //     }

    //     // Toggle range selection
    //     if (updatedSet.has(awardRangeID)) {
    //         updatedSet = updatedSet.delete(awardRangeID);
    //     }
    //     else {
    //         updatedSet = updatedSet.set(awardRangeID, awardRanges[value.amount]);
    //     }
    // }

    return awardAmounts;
};
/* eslint-enable import/prefer-default-export */
