/**
 * budgetCategoryHelper.js
 * Created by michaelbray on 3/22/17.
 */

export const formatBudgetFunction = (budgetFunction) =>
    `${budgetFunction.title} | ${budgetFunction.functionType}`;

export const formatFederalAccount = (fed) =>
    `${fed.agency_id}-${fed.main_account_code} ${fed.title}`;
