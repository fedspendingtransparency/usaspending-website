/**
 * agencyLandingReducer.js
 * Created by Lizzie Salita 7/10/17
 */

import { uniqueId } from 'lodash';
import { Record, OrderedSet } from 'immutable';

export const Agency = Record({
    agency_id: 0,
    agency_name: '',
    budget_authority_amount: '',
    percentage_of_total_budget_authority: ''
});

const initialState = {
    agencies: new OrderedSet(),
    agenciesOrder: {
        field: 'percentage_of_total_budget_authority',
        direction: 'desc'
    },
    agenciesMeta: {
        batch: {
            queryId: uniqueId(),
            searchId: uniqueId()
        }
    },
    autocompleteAgencies: []
};


const agencyLandingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AGENCIES': {
            const meta = Object.assign({}, state.agenciesMeta, {
                batch: {
                    queryId: uniqueId(),
                    searchId: uniqueId()
                }
            });

            return Object.assign({}, state, {
                agencies: new OrderedSet(action.agencies),
                agenciesMeta: meta
            });
        }
        case 'SET_AGENCIES_ORDER': {
            const order = Object.assign({}, state.agenciesOrder, action.order);

            return Object.assign({}, state, {
                agenciesOrder: order
            });
        }
        case 'SET_AUTOCOMPLETE_AGENCIES': {
            return Object.assign({}, state, {
                autocompleteAgencies: action.agencies
            });
        }
        default:
            return state;
    }
};

export default agencyLandingReducer;
