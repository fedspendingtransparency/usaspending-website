/**
 * programSourceFilterFunctions.js
 * Created by Lizzie Salita 6/14/19
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateSelectedSources = (currentSources, source) => {
    let updatedSet = currentSources;

    if (updatedSet.has(source.identifier)) {
        updatedSet = updatedSet.delete(source.identifier);
    }
    else {
        updatedSet = updatedSet.set(source.identifier, source.values);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
