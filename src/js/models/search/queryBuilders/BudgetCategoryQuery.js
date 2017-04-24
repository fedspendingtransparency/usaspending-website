/**
 * Created by michaelbray on 3/21/17.
 */

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildBudgetFunctionQuery = (budgetFunctions, searchContext) => {
    const budgetFunctionSet = [];
    const budgetSubfunctionSet = [];

    budgetFunctions.forEach((budgetFunction) => {
        if (budgetFunction.functionType === 'Function') {
            budgetFunctionSet.push(budgetFunction.title);
        }
        else {
            budgetSubfunctionSet.push(budgetFunction.title);
        }
    });

    const functionField = FilterFields[`${searchContext}Fields`].budgetFunctionTitle;
    const subfunctionField = FilterFields[`${searchContext}Fields`].budgetSubfunctionTitle;

    const budgetFunctionFilter = {
        field: functionField,
        operation: "in",
        value: budgetFunctionSet
    };

    const budgetSubfunctionFilter = {
        field: subfunctionField,
        operation: "in",
        value: budgetSubfunctionSet
    };

    const filterSet = {
        combine_method: 'OR',
        filters: [budgetFunctionFilter, budgetSubfunctionFilter]
    };

    return filterSet;
};

export const buildFederalAccountQuery = (federalAccounts, searchContext) => {
    const federalAccountSet = [];

    federalAccounts.forEach((federalAccount) => {
        federalAccountSet.push(federalAccount.id);
    });

    const accountField = FilterFields[`${searchContext}Fields`].federalAccount;

    const filter = {
        field: accountField,
        operation: "in",
        value: federalAccountSet
    };

    return filter;
};

export const buildObjectClassQuery = (objectClasses, searchContext) => {
    const objectClassSet = [];

    Object.keys(objectClasses).forEach((objectClass) => {
        objectClassSet.push(objectClass);
    });

    const classField = FilterFields[`${searchContext}Fields`].objectClass;

    const filter = {
        field: classField,
        operation: "in",
        value: objectClassSet
    };

    return filter;
};
