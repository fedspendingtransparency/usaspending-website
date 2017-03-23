/**
 * accountReducer.js
 * Created by Kevin Li 3/17/17
 */

import _ from 'lodash';

import { Set } from 'immutable';

const initialState = {
    filters: {
        dateType: 'fy',
        fy: new Set(),
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
    account: {
        id: 19154,
        tas_rendering_label: "089X0212",
        agency_id: "089",
        main_account_code: "0212",
        title: "Salaries and Expenses, Federal Energy Regulatory Commission, Energy",
        description: "Sample description",
        totals: {
            outgoing: {
                2016: 1324353454.65,
                2017: 46543543534.43
            },
            obligations: {
                2016: 1324353454.65,
                2017: 41543543534.43
            },
            budget_authority: {
                2016: 1324353454.65,
                2017: 46543543534.43
            }
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
            return Object.assign({}, state, {
                filters: {
                    dateType: action.dateType,
                    startDate: action.start,
                    endDate: action.end,
                    fy: new Set(action.fy)
                }
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
