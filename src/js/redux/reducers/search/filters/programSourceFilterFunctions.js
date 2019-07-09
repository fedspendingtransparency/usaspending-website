/**
 * programSourceFilterFunctions.js
 * Created by Lizzie Salita 6/14/19
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateSelectedSources = (state, sourceIdentifier) => {
    let updatedSet = state;

    if (updatedSet.has(sourceIdentifier)) {
        updatedSet = updatedSet.delete(sourceIdentifier);
    }
    else {
        updatedSet = updatedSet.add(sourceIdentifier);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
