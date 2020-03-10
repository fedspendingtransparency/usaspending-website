/**
 * Created by Emily Gullo 07/18/2017
 */

import { List } from 'immutable';

export const updateSelectedCFDA = (state, value) => {
    let updatedSet = state;

    const cfdaIdentifier = value.program_number;

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
/**
 * updateNaics v2
 * - sets naics property in redux
 * @param {*[]} checked - new naics checked array
 * @returns {object} - new state object
 */
export const updateNaics = (checked) => new List(checked);

export const updateSelectedNAICS = (state, value) => {
    let updatedSet = state;
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

    const pscIdentifier = value.product_or_service_code;

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
