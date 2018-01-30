/**
 * Created by Emily Gullo on 6/23/2017
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other functions
export const updateContractFilterSet = (state, value) => {
    let updatedSet = state;

    const identifier = value;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.add(identifier);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
