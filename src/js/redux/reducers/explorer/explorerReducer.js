/**
 * explorerReducer.js
 * Created by Kevin Li 8/16/17
 **/

import { Map, List, Record } from 'immutable';
import { currentFiscalYear } from 'helpers/fiscalYearHelper';

export const ActiveScreen = new Record({
    within: '', // within is the data type that the total is a slice WITHIN
    subdivision: '', // subdivision is the data type that the total is being subdivided in the treemap
    total: 0
});

export const initialState = {
    root: 'object_class',
    fy: currentFiscalYear(),
    filters: new Map(),
    active: new ActiveScreen(),
    trail: new List([])
};

const explorerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EXPLORER_FY': {
            return Object.assign({}, state, {
                fy: action.fy
            });
        }
        case 'SET_EXPLORER_ROOT': {
            return Object.assign({}, state, {
                root: action.root
            });
        }
        case 'ADD_EXPLORER_FILTER': {
            return Object.assign({}, state, {
                filters: state.filters.set(action.filterType, action.filterValue)
            });
        }
        case 'OVERWRITE_EXPLORER_FILTERS': {
            return Object.assign({}, state, {
                filters: Map(action.filters)
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
        case 'RESET_EXPLORER': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default explorerReducer;
