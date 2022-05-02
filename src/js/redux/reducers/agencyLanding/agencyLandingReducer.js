/**
 * agencyLandingReducer.js
 * Created by Lizzie Salita 7/10/17
 */

const initialState = {
    agenciesOrder: {
        field: 'percentage_of_total_budget_authority',
        direction: 'desc'
    }
};

const agencyLandingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AGENCIES_ORDER': {
            const order = Object.assign({}, state.agenciesOrder, action.order);

            return Object.assign({}, state, {
                agenciesOrder: order
            });
        }
        default:
            return state;
    }
};

export default agencyLandingReducer;
