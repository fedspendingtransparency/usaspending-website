/**
 * Created by Emily Gullo on 12/28/2016
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateSelectedAgencies = (state, value) => {
    let updatedSet = state;

    const agencyIdentifier = `${value.id}_${value.agencyType}`;

    if (updatedSet.has(agencyIdentifier)) {
        updatedSet = updatedSet.delete(agencyIdentifier);
    }
    else {
        updatedSet = updatedSet.set(agencyIdentifier, value);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
