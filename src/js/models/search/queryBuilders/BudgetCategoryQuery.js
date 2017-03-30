/**
 * Created by michaelbray on 3/21/17.
 */

const budgetFunctionField = 'treasury_account__budget_function_title';
const budgetSubfunctionField = 'treasury_account__budget_subfunction_title';
const federalAccountField = 'treasury_account__federal_account';
const objectClassField = 'object_class__major_object_class';

export const buildBudgetFunctionQuery = (budgetFunctions) => {
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

    const budgetFunctionFilter = {
        field: budgetFunctionField,
        operation: "in",
        value: budgetFunctionSet
    };

    const budgetSubfunctionFilter = {
        field: budgetSubfunctionField,
        operation: "in",
        value: budgetSubfunctionSet
    };

    const filterSet = {
        combine_method: 'OR',
        filters: [budgetFunctionFilter, budgetSubfunctionFilter]
    };

    return filterSet;
};

export const buildFederalAccountQuery = (federalAccounts) => {
    const federalAccountSet = [];

    federalAccounts.forEach((federalAccount) => {
        federalAccountSet.push(federalAccount.id);
    });

    const filter = {
        field: federalAccountField,
        operation: "in",
        value: federalAccountSet
    };

    return filter;
};

export const buildObjectClassQuery = (objectClasses) => {
    const objectClassSet = [];

    Object.keys(objectClasses).forEach((objectClass) => {
        objectClassSet.push(objectClass);
    });

    const filter = {
        field: objectClassField,
        operation: "in",
        value: objectClassSet
    };

    return filter;
};
