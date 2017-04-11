/**
 * budgetCategoryReducer.js
 * Created by michaelbray on 3/20/17.
 */

/**
 * recipientReducer.js
 * Created by michaelbray on 2/17/17.
 */

import _ from 'lodash';

const initialState = {
    budgetFunctions: [],
    federalAccounts: []
};

const budgetCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_BUDGET_FUNCTIONS': {
            return Object.assign({}, state, {
                budgetFunctions: _.concat([], action.budgetFunctions)
            });
        }
        case 'SET_AUTOCOMPLETE_FEDERAL_ACCOUNTS': {
            return Object.assign({}, state, {
                federalAccounts: _.concat([], action.federalAccounts)
            });
        }
        default:
            return state;
    }
};

export default budgetCategoryReducer;
