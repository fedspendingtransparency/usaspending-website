/**
 * Created by michaelbray on 12/12/16.
 */

import { Set } from 'immutable';

const updateSelectedLocations = (state, value, direction) => {
    let updatedSet = new Set(state);

    if (updatedSet.includes(value) && direction === 'remove') {
        updatedSet = updatedSet.delete(value);
    }
    else if (!updatedSet.includes(value) && direction === 'add') {
        updatedSet = updatedSet.add(value);
    }

    return updatedSet;
};

export default updateSelectedLocations;
