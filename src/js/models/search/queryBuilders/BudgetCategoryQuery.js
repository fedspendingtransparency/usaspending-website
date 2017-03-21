/**
 * Created by michaelbray on 3/21/17.
 */

const budgetFunctionField = '';
const federalAccountField = '';
const objectClassField = 'major_object_class';

export const buildBudgetFunctionQuery = (budgetFunctions) => {
    const budgetFunctionSet = [];

    budgetFunctions.forEach((budgetFunction) => {
        budgetFunctionSet.push(budgetFunction.id);
    });

    const filter = {
        field: budgetFunctionField,
        operation: "in",
        value: budgetFunctionSet
    };

    return filter;
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
