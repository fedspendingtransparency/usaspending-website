/**
 * explorerReducer.js
 * Created by Kevin Li 8/16/17
 **/

import { List, Record } from 'immutable';

export const ActiveScreen = new Record({
    within: '', // within is the data type that the total is a slice WITHIN
    subdivision: '', // subdivision is the data type that the total is being subdivided in the treemap
    total: 0,
    accountNumber: ''
});

export const initialState = {
    root: 'object_class',
    fy: null,
    quarter: null,
    period: null,
    active: new ActiveScreen(),
    trail: new List([]),
    table: {
        order: {
            field: 'obligated_amount',
            direction: 'desc'
        },
        pageNumber: 1
    }
};

const explorerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EXPLORER_TIME_PERIOD': {
            return Object.assign({}, state, {
                fy: action.fy,
                period: action.period,
                quarter: action.quarter
            });
        }
        case 'SET_EXPLORER_ROOT': {
            return Object.assign({}, state, {
                root: action.root
            });
        }
        case 'ADD_EXPLORER_TRAIL': {
            return Object.assign({}, state, {
                trail: state.trail.push(action.item)
            });
        }
        case 'OVERWRITE_EXPLORER_TRAIL': {
            return Object.assign({}, state, {
                trail: new List(action.trail)
            });
        }
        case 'SET_EXPLORER_ACTIVE': {
            return Object.assign({}, state, {
                active: new ActiveScreen(action.active)
            });
        }
        case 'SET_EXPLORER_TABLE_ORDER': {
            const order = Object.assign({}, state.table.order, action.order);

            return Object.assign({}, state, {
                table: {
                    order,
                    pageNumber: 1
                }
            });
        }
        case 'SET_EXPLORER_TABLE_PAGE': {
            const table = Object.assign({}, state.table, { pageNumber: action.number });

            return Object.assign({}, state, {
                table
            });
        }
        case 'RESET_EXPLORER_TABLE': {
            const table = Object.assign({}, initialState.table);

            return Object.assign({}, state, {
                table
            });
        }
        case 'RESET_EXPLORER': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default explorerReducer;
