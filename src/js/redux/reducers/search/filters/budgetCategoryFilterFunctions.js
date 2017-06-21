/**
 * Created by michaelbray on 3/21/17.
 */

import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';

export const updateBudgetFunctions = (state, value) => {
    let updatedSet = state;

    const identifier = `${value.title}`;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.set(identifier, value);
    }

    return updatedSet;
};

export const updateFederalAccounts = (state, value) => {
    let updatedSet = state;

    const identifier = `${value.id}`;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.set(identifier, value);
    }

    return updatedSet;
};

export const updateObjectClasses = (state, value) => {
    let updatedSet = state;

    if (updatedSet.has(value)) {
        updatedSet = updatedSet.delete(value);
    }
    else {
        updatedSet = updatedSet.add(value, objectClassDefinitions[value]);
    }

    return updatedSet;
};

export const bulkObjectClassesChange = (state, values, direction) => {
    let updatedSet = state;

    values.forEach((value) => {
        if (updatedSet.includes(value) && direction === 'remove') {
            // item exists but we want to deselect everything
            // so remove it
            updatedSet = updatedSet.delete(value);
        }
        else if (!updatedSet.includes(value) && direction === 'add') {
            // item doesn't exist but we want to add everything
            // so include it
            updatedSet = updatedSet.add(value);
        }
    });

    return updatedSet;
};
