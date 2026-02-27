/**
  * awardFilterFunctions.js
  * Created by Kevin Li 11/8/16
  **/

import { Set } from 'immutable';
import { awardTypeNewLinkCodes } from 'dataMapping/search/awardType';

export const handleChangeAwardTypeCodes = (initialSet, value, isRemove = false) => {
    let updatedSet = initialSet;
    let newLinkCodes;
    // check if any linked codes exist
    if (Object.hasOwn(awardTypeNewLinkCodes, value)) {
        newLinkCodes = awardTypeNewLinkCodes[value];
    }

    updatedSet = isRemove ?
        updatedSet.delete(value) :
        updatedSet.add(value);

    // check if any linked codes exist
    if (newLinkCodes?.length) {
        const newLinkCodesArray = Array.isArray(newLinkCodes) ?
            newLinkCodes :
            [newLinkCodes];

        if (isRemove) {
            // check if any link codes exist in set
            newLinkCodesArray.forEach((code) => {
                if (initialSet.includes(code)) {
                // code does exist
                // does code exist from another
                    const allKeysWithValue = Object.keys(awardTypeNewLinkCodes)
                        .filter((key) => awardTypeNewLinkCodes[key] === code);

                    if (allKeysWithValue?.length) {
                    // are keys in set
                        const keysInSet = allKeysWithValue.filter((key) => (
                            updatedSet.includes(key))
                        );

                        if (!keysInSet?.length) {
                        // ok to remove
                            updatedSet = updatedSet.delete(code);
                        }
                    }
                }
            });
        }
        else {
            // by making a new Set here only unique values will be added
            updatedSet = new Set([...updatedSet, ...newLinkCodesArray]);
        }
    }

    return updatedSet;
};

export const bulkAwardTypeChange = (state, values, direction) => {
    let updatedSet = new Set(state);

    values.forEach((value) => {
        if (updatedSet.includes(value) && direction === 'remove') {
            // item exists but we want to deselect everything
            // so remove it
            updatedSet = handleChangeAwardTypeCodes(updatedSet, value, true);
        }
        else if (!updatedSet.includes(value) && direction === 'add') {
            // item doesn't exist but we want to add everything
            // so include it
            updatedSet = handleChangeAwardTypeCodes(updatedSet, value, false);
        }
    });

    return updatedSet;
};

export const immutableSetToggle = (set, value) => {
    // as an ImmutableJS set, any modifications to the set creates a new instance
    // this will hold the new instance
    let updatedSet;

    // check to see if the value currently exists within the set
    if (set.includes(value)) {
        // it exists, so remove it from the set
        updatedSet = handleChangeAwardTypeCodes(set, value, true);
    }
    else {
        // it doesn't exist, so add it to the set
        updatedSet = handleChangeAwardTypeCodes(set, value, false);
    }
    // return the new instance with updated values
    return updatedSet;
};

