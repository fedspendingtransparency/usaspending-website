/**
 * budgetCategoryReducer.js
 * Created by michaelbray on 3/20/17.
 */

/**
 * recipientReducer.js
 * Created by michaelbray on 2/17/17.
 */

import { concat } from 'lodash';

const initialState = {
    budgetFunctions: [],
    federalAccounts: []
};

const budgetCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_BUDGET_FUNCTIONS': {
            return Object.assign({}, state, {
                budgetFunctions: concat([], action.budgetFunctions)
            });
        }
        case 'SET_AUTOCOMPLETE_FEDERAL_ACCOUNTS': {
            return Object.assign({}, state, {
                federalAccounts: concat([], action.federalAccounts)
            });
        }
        default:
            return state;
    }
};

export default budgetCategoryReducer;
