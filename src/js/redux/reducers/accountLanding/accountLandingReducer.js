/**
 * accountLandingReducer.js
 * Created by Lizzie Salita 8/4/17
 */

const initialState = {
    accountsOrder: {
        field: 'budget_authority_amount',
        direction: 'desc'
    }
};

const accountLandingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCOUNTS_ORDER': {
            const order = Object.assign({}, state.accountsOrder, action.order);

            return Object.assign({}, state, {
                accountsOrder: order
            });
        }
        default:
            return state;
    }
};

export default accountLandingReducer;
