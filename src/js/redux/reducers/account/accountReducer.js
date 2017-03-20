/**
 * accountReducer.js
 * Created by Kevin Li 3/17/17
 */

import _ from 'lodash';

const initialState = {
    filters: {
        dateType: 'fy',
        fy: [],
        startDate: null,
        endDate: null,
        objectClass: [],
        programActivity: [],
        tas: []
    },
    filterOptions: {
        objectClass: [],
        programActivity: [],
        tas: []
    },
    account: null,
    tas: []
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ACCOUNT': {
            return Object.assign({}, state, {
                account: action.account
            });
        }
        case 'SET_ACCOUNT_TAS_ITEMS': {
            return Object.assign({}, state, {
                tas: action.tas
            });
        }
        case 'APPEND_ACCOUNT_TAS_ITEMS': {
            return Object.assign({}, state, {
                tas: _.concat(state.tas, action.as)
            });
        }
        case 'RESET_ACCOUNT_FILTERS': {
            return Object.assign({}, {
                filters: initialState.filters,
                filterOptions: initialState.filterOptions
            });
        }
        case 'RESET_ACCOUNT': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default accountReducer;
