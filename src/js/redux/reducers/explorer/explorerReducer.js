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
    fy: currentFiscalYear(),
    filters: new List(),
    active: new ActiveScreen(),
    tree: []
};

const explorerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EXPLORER_FY': {
            return Object.assign({}, state, {
                fy: action.fy
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
        case 'REWIND_EXPLORER_TREE': {
            // grab the new active screen
            const newActive = new ActiveScreen(state.tree[action.index]);
            // remove everything in the tree after the specified index
            let newTree = new List();
            if (action.index > 0) {
                newTree = state.tree.slice(0, action.index + 1);
            }
            return Object.assign({}, state, {
                active: newActive,
                tree: newTree
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
