/**
 * searchHashActions.js
 * Created by Kevin Li 5/31/17
 */

export const setSearchFilterIsUnfiltered = (state) => ({
    type: 'SET_SEARCH_FILTER_UNFILTERED_BOOL',
    value: state
});

export const restoreHashedFilters = (filters) => ({
    filters,
    type: 'RESTORE_HASHED_FILTERS'
});
