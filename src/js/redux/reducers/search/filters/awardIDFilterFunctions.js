/**
 * awardIDFilterFunctions
 * Created by michaelbray on 3/2/17.
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other functions
export const updateSelectedAwardIDs = (state, value) => {
    let updatedSet = state;

    const awardIdentifier = `${value}`;

    if (updatedSet.has(awardIdentifier)) {
        updatedSet = updatedSet.delete(awardIdentifier);
    }
    else {
        updatedSet = updatedSet.set(awardIdentifier, value);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
