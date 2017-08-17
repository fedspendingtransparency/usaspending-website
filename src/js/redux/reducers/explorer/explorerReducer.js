/**
 * explorerReducer.js
 * Created by Kevin Li 8/16/17
 **/

import { Map, List, Record } from 'immutable';
import { currentFiscalYear } from 'helpers/fiscalYearHelper';

export const ActiveScreen = new Record({
    type: '',
    subtype: '',
    title: '',
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
                filters: state.set(action.filterType, action.filterValue)
            });
        }
        case 'OVERWRITE_EXPLORER_FILTERS': {
            return Object.assign({}, state, {
                filters: action.filters
            });
        }
        case 'REWIND_EXPLORER_TRAIL': {
            // grab the new active screen
            const newActive = new ActiveScreen(state.trail[action.index]);
            // remove everything in the trail after the specified index
            let newTrail = new List();
            if (action.index > 0) {
                newTrail = state.trail.slice(0, action.index + 1);
            }
            return Object.assign({}, state, {
                active: newActive,
                trail: newTrail
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
