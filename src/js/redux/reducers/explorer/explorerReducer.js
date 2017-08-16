/**
 * explorerReducer.js
 * Created by Kevin Li 8/16/17
 **/

import { List, Record } from 'immutable';
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
    filters: new List(),
    active: new ActiveScreen(),
    trail: [
        {
            type: 'root',
            subtype: 'agency',
            title: 'All Agencies',
            total: 2700000000000
        },
        {
            type: 'agency',
            subtype: '',
            title: 'Department of Energy',
            total: 18800000000
        },
        {
            type: 'federal_account',
            subtype: '',
            title: 'Energy Efficiency & Renewable Energy',
            total: 958500000
        }
    ]
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
                filters: state.filters.push(action.filter)
            });
        }
        case 'REWIND_EXPLORER_FILTERS': {
            // remove all filters after a specific index
            let rewoundFilters = new List();
            if (action.index > 0) {
                rewoundFilters = state.filters.slice(0, action.index + 1);
            }
            return Object.assign({}, state, {
                filters: rewoundFilters
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
        case 'RESET_EXPLORER': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default explorerReducer;
