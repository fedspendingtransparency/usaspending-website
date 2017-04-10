/**
 * accountReducer.js
 * Created by Kevin Li 3/17/17
 */

import _ from 'lodash';

import { Set, OrderedSet } from 'immutable';

import * as ObjectClassFuncs from './filters/accountObjectClassFunctions';

const initialState = {
    filters: {
        dateType: 'fy',
        fy: new Set(),
        startDate: null,
        endDate: null,
        objectClass: new OrderedSet(),
        programActivity: [],
        tas: []
    },
    filterOptions: {
        objectClass: [],
        programActivity: [],
        tas: []
    },
    account: {
        id: null,
        agency_identifier: '',
        main_account_code: '',
        title: '',
        description: '',
        totals: {
            obligated: {},
            unobligated: {},
            budgetAuthority: {},
            outlay: {}
        }
    },
    tas: [],
    totalSpending: 0
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
        case 'UPDATE_ACCOUNT_FILTER_TIME': {
            const filters = Object.assign({}, state.filters, {
                dateType: action.dateType,
                startDate: action.start,
                endDate: action.end,
                fy: new Set(action.fy)
            });

            return Object.assign({}, state, {
                filters
            });
        }
        case 'RESET_ACCOUNT_FILTER_TIME': {
            const filters = Object.assign({}, initialState.filters);
            return Object.assign({}, state, {
                filters
            });
        }
        case 'TOGGLE_ACCOUNT_OBJECT_CLASS': {
            const updatedOC = ObjectClassFuncs.toggleItem(state.filters.objectClass, action.item);
            const updatedFilters = Object.assign({}, state.filters, {
                objectClass: updatedOC
            });

            return Object.assign({}, state, {
                filters: updatedFilters
            });
        }
        case 'RESET_ACCOUNT_OBJECT_CLASS': {
            const updatedFilters = Object.assign({}, state.filters, {
                objectClass: initialState.filters.objectClass
            });

            return Object.assign({}, state, {
                filters: updatedFilters
            });
        }
        case 'RESET_ACCOUNT_FILTERS': {
            return Object.assign({}, state, {
                filters: initialState.filters
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
