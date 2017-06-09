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
    const identifier = `${value}`;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.set(identifier, objectClassDefinitions[value]);
    }

    return updatedSet;
};

export const bulkObjectClassesChange = (state, values, direction) => {
    let updatedSet = new Set(state);
    console.log(values);
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
