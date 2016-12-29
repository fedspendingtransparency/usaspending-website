/**
 * Created by michaelbray on 12/12/16.
 */

import { Set } from 'immutable';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateSelectedLocations = (state, value) => {
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
