/**
 * appliedFiltersReducer.js
 * Created by Kevin Li 12/20/17
 */

import { initialState as defaultFilters } from './searchFiltersReducer';

export const initialState = {
    filters: defaultFilters,
    _empty: true,
    _complete: true
};

const appliedFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLY_STAGED_FILTERS':
            return Object.assign({}, state, {
                filters: action.filters
            });
        case 'RESTORE_HASHED_FILTERS':
            // this is identical to APPLY_STAGED_FILTERS, but the action type is actually
            // shared with the staged filter store so that, when restoring from a hash URL,
            // both stores can be updated simultaneously with a single Redux action
            return Object.assign({}, state, {
                filters: action.filters
            });
        case 'CLEAR_APPLIED_FILTERS':
            return Object.assign({}, initialState);
        case 'SET_APPLIED_FILTER_EMPTINESS':
            return Object.assign({}, state, {
                _empty: action.empty
            });
        case 'SET_APPLIED_FILTER_COMPLETION':
            return Object.assign({}, state, {
                _complete: action.complete
            });
        default:
            return state;
    }
};

export default appliedFiltersReducer;
