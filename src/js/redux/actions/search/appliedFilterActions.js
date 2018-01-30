/**
 * appliedFilterActions.js
 * Created by Kevin Li 12/21/17
 */

export const setAppliedFilterCompletion = (complete) => ({
    complete,
    type: 'SET_APPLIED_FILTER_COMPLETION'
});

export const setAppliedFilterEmptiness = (empty) => ({
    empty,
    type: 'SET_APPLIED_FILTER_EMPTINESS'
});

export const applyStagedFilters = (filters) => ({
    filters,
    type: 'APPLY_STAGED_FILTERS'
});

export const resetAppliedFilters = () => ({
    type: 'CLEAR_APPLIED_FILTERS'
});
