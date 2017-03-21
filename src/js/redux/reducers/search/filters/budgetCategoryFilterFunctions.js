/**
 * Created by michaelbray on 3/21/17.
 */

import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';
// import _ from 'lodash';

export const updateBudgetFunctions = (state, value) => {
    let updatedSet = state;

    const identifier = `${value.budget_id}`;

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

    const identifier = `${value.federal_account_id}`;

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
