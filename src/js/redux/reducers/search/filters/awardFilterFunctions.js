/**
  * awardFilterFunctions.js
  * Created by Kevin Li 11/8/16
  **/

import { Set } from 'immutable';

export const immutableSetToggle = (set, value) => {
    // as an ImmutableJS set, any modifications to the set creates a new instance
    // this will hold the new instance
    let updatedSet;
    // check to see if the value currently exists within the set
    if (set.includes(value)) {
    // it exists, so remove it from the set
        updatedSet = set.delete(value);
    }
    else {
    // it doesn't exist, so add it to the set
        updatedSet = set.add(value);
    }
    // return the new instance with updated values
    return updatedSet;
};

export const bulkAwardTypeChange = (state, values, direction) => {
    let updatedSet = new Set(state);

    values.forEach((value) => {
        if (updatedSet.includes(value) && direction === 'remove') {
            // item exists but we want to deselect everything
            // so remove it
            updatedSet = updatedSet.delete(value);
        }
        else if (!updatedSet.includes(value) && direction === 'add') {
            // item doesn't exist but we want to add everything
            // so include it
            updatedSet = updatedSet.add(value);
        }
    });

    return updatedSet;
};
