/**
 * Created by Emily Gullo on 12/28/2016
 */

import { Set } from 'immutable';

/* eslint-disable import/prefer-default-export */
export const updateSelectedFundingAgencies = (state, value) => {
    let updatedSet = new Set(state);

    if (updatedSet.includes(value)) {
        updatedSet = updatedSet.delete(value);
    }
    else {
        updatedSet = updatedSet.add(value);
    }

    return updatedSet;
};

export const updateSelectedAwardingAgencies = (state, value) => {
    let updatedSet = new Set(state);

    if (updatedSet.includes(value)) {
        updatedSet = updatedSet.delete(value);
    }
    else {
        updatedSet = updatedSet.add(value);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
