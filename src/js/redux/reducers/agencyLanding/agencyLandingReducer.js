/**
 * agencyLandingReducer.js
 * Created by Lizzie Salita 7/10/17
 */

import { Record, OrderedSet } from 'immutable';

export const Agency = Record({
    id: '',
    agency_name: '',
    budget_authority_amount: '',
    percentage_of_total_budget_authority: ''
});

const initialState = {
    agencies: new OrderedSet(),
    agenciesOrder: {
        field: 'agency_name',
        direction: 'desc'
    }
};


const agencyLandingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AGENCIES': {
            return Object.assign({}, state, {
                agencies: new OrderedSet(action.agencies)
            });
        }
        case 'SET_AGENCIES_ORDER': {
            const order = Object.assign({}, state.agenciesOrder, action.order);

            return Object.assign({}, state, {
                agenciesOrder: order
            });
        }
        case 'RESET_SEARCH_ORDER': {
            // TODO - Lizzie
            return state;
        }
        default:
            return state;
    }
};

export default agencyLandingReducer;
