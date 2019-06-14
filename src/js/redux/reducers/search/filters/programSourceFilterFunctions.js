/**
 * programSourceFilterFunctions.js
 * Created by Lizzie Salita 6/14/19
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateSelectedSources = (state, component) => {
    let updatedSet = state;
    // generate an identifier string based on IDs and component
    const sourceIdentifier =
        `${component.code}_${component.value}`;

    if (updatedSet.has(sourceIdentifier)) {
        updatedSet = updatedSet.delete(sourceIdentifier);
    }
    else {
        const sourceObject = Object.assign({}, component, {
            identifier: sourceIdentifier
        });
        updatedSet = updatedSet.set(sourceIdentifier, sourceObject);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
