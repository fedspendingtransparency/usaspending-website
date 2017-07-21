/**
 * Created by Emily Gullo 07/18/2017
 */

import { sortBy } from 'lodash';

export const updateSelectedCFDA = (state, value) => {
    let updatedSet = state;
    // generate an identifier string based on matched IDs and place name
    const cfdaIdentifier =
        `${sortBy(value.matched_ids).join(',')}_${value.place}_${value.place_type}`;

    if (updatedSet.has(cfdaIdentifier)) {
        updatedSet = updatedSet.delete(cfdaIdentifier);
    }
    else {
        const cfdaObject = Object.assign({}, value, {
            identifier: cfdaIdentifier
        });
        updatedSet = updatedSet.set(cfdaIdentifier, cfdaObject);
    }

    return updatedSet;
};

export const updateSelectedNAICS = (state, value) => {
    let updatedSet = state;
    // generate an identifier string based on matched IDs and place name
    const naicsIdentifier = value.naics;

    if (updatedSet.has(naicsIdentifier)) {
        updatedSet = updatedSet.delete(naicsIdentifier);
    }
    else {
        const naicsObject = Object.assign({}, value, {
            identifier: naicsIdentifier
        });
        updatedSet = updatedSet.set(naicsIdentifier, naicsObject);
    }

    return updatedSet;
};

export const updateSelectedPSC = (state, value) => {
    let updatedSet = state;
    // generate an identifier string based on matched IDs and place name
    const pscIdentifier =
        `${sortBy(value.matched_ids).join(',')}_${value.place}_${value.place_type}`;

    if (updatedSet.has(pscIdentifier)) {
        updatedSet = updatedSet.delete(pscIdentifier);
    }
    else {
        const pscObject = Object.assign({}, value, {
            identifier: pscIdentifier
        });
        updatedSet = updatedSet.set(pscIdentifier, pscObject);
    }

    return updatedSet;
};
