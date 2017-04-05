/**
 * Created by michaelbray on 3/21/17.
 */

const budgetFunctionField = 'budget_function_title';
const budgetSubfunctionField = 'budget_subfunction_title';
const federalAccountField = 'federal_account';
const objectClassField = 'object_class__major_object_class';

const tasPrefix = 'treasury_account__';

const appropriationsPrefix = 'treasury_account_identifier__';
const appropriationsOCPrefix = 'treasury_account_identifier__program_balances__';

const fileCPrefix = 'award__financial_set__';

export const buildBudgetFunctionQuery = (budgetFunctions, requestType) => {
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

    let functionField = '';
    let subfunctionField = '';

    if (requestType === 'fileC') {
        functionField = `${fileCPrefix}${tasPrefix}${budgetFunctionField}`;
        subfunctionField = `${fileCPrefix}${tasPrefix}${budgetSubfunctionField}`;
    }
    else if (requestType === 'appropriations') {
        functionField = `${appropriationsPrefix}${budgetFunctionField}`;
        subfunctionField = `${appropriationsPrefix}${budgetSubfunctionField}`;
    }
    else {
        functionField = `${tasPrefix}${budgetFunctionField}`;
        subfunctionField = `${tasPrefix}${budgetSubfunctionField}`;
    }

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

export const buildFederalAccountQuery = (federalAccounts, requestType) => {
    const federalAccountSet = [];

    federalAccounts.forEach((federalAccount) => {
        federalAccountSet.push(federalAccount.id);
    });

    let accountField = '';

    if (requestType === 'fileC') {
        accountField = `${fileCPrefix}${tasPrefix}${federalAccountField}`;
    }
    else if (requestType === 'appropriations') {
        accountField = `${appropriationsPrefix}${federalAccountField}`;
    }
    else {
        accountField = `${tasPrefix}${federalAccountField}`;
    }

    const filter = {
        field: accountField,
        operation: "in",
        value: federalAccountSet
    };

    return filter;
};

export const buildObjectClassQuery = (objectClasses, requestType) => {
    const objectClassSet = [];

    Object.keys(objectClasses).forEach((objectClass) => {
        objectClassSet.push(objectClass);
    });

    let classField = '';

    if (requestType === 'fileC') {
        classField = `${fileCPrefix}${objectClassField}`;
    }
    else if (requestType === 'appropriations') {
        classField = `${appropriationsOCPrefix}${objectClassField}`;
    }
    else {
        classField = `${objectClassField}`;
    }

    const filter = {
        field: classField,
        operation: "in",
        value: objectClassSet
    };

    return filter;
};
