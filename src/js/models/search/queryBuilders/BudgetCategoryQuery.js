/**
 * Created by michaelbray on 3/21/17.
 */

const budgetFunctionField = 'treasury_account__budget_function_title';
const budgetSubfunctionField = 'treasury_account__budget_subfunction_title';
const federalAccountField = 'treasury_account__federal_account';
const objectClassField = 'object_class__major_object_class';

const fileCPrepend = 'award__financial_set__';

export const buildBudgetFunctionQuery = (budgetFunctions, prependFileC) => {
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

    let functionField = budgetFunctionField;
    let subfunctionField = budgetSubfunctionField;

    if (prependFileC) {
        functionField = `${fileCPrepend}${budgetFunctionField}`;
        subfunctionField = `${fileCPrepend}${budgetFunctionField}`;
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

export const buildFederalAccountQuery = (federalAccounts, prependFileC) => {
    const federalAccountSet = [];

    federalAccounts.forEach((federalAccount) => {
        federalAccountSet.push(federalAccount.id);
    });

    let accountField = federalAccountField;

    if (prependFileC) {
        accountField = `${fileCPrepend}${federalAccountField}`;
    }

    const filter = {
        field: accountField,
        operation: "in",
        value: federalAccountSet
    };

    return filter;
};

export const buildObjectClassQuery = (objectClasses, prependFileC) => {
    const objectClassSet = [];

    Object.keys(objectClasses).forEach((objectClass) => {
        objectClassSet.push(objectClass);
    });

    let classField = objectClassField;

    if (prependFileC) {
        classField = `${fileCPrepend}${objectClassField}`;
    }

    const filter = {
        field: classField,
        operation: "in",
        value: objectClassSet
    };

    return filter;
};
