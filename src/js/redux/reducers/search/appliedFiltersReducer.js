/**
 * appliedFiltersReducer.js
 * Created by Kevin Li 12/20/17
 */

import { initialState as defaultFilters } from './searchFiltersReducer';

export const initialState = {
    filters: defaultFilters,
    _hash: '',
    _complete: false
};

const appliedFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLY_STAGED_FILTERS':
            return Object.assign({}, state, {
                filters: action.filters
            });
        case 'CLEAR_APPLIED_FILTERS':
            return Object.assign({}, initialState);
        case 'SET_APPLIED_FILTER_HASH':
            return Object.assign({}, state, {
                _hash: action.hash
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
