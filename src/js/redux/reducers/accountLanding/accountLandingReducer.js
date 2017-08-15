/**
 * accountLandingReducer.js
 * Created by Lizzie Salita 8/4/17
 */

const initialState = {
    accountsOrder: {
        field: 'budget_authority_amount',
        direction: 'desc'
    },
    pageNumber: 1
};

const accountLandingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCOUNTS_ORDER': {
            const order = Object.assign({}, state.accountsOrder, action.order);

            return Object.assign({}, state, {
                accountsOrder: order
            });
        }
        case 'SET_PAGE_NUMBER': {
            return Object.assign({}, state, {
                pageNumber: action.number
            });
        }
        default:
            return state;
    }
};

export default accountLandingReducer;
