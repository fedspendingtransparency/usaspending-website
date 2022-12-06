/**
 * aboutTheDataActions.js
 */

export const showATD = () => ({
    type: 'SHOW_ATD'
});

export const hideATD = () => ({
    type: 'HIDE_ATD'
});

export const toggleATD = () => ({
    type: 'TOGGLE_ATD'
});

export const setATDSearchValue = (state) => ({
    type: 'SET_ATD_SEARCH_VALUE',
    value: state
});

export const setATDTerm = (state) => ({
    type: 'SET_ATD_TERM',
    term: state
});

export const clearATDTerm = () => ({
    type: 'CLEAR_ATD_TERM'
});

export const setATDResults = (state) => ({
    type: 'SET_ATD_SEARCH_RESULTS',
    results: state
});

export const setATDCache = (state) => ({
    type: 'SET_ATD_FULL_CACHE',
    cache: state
});

export const setATDTermFromUrl = (term) => ({
    type: 'SET_ATD_TERM_FROM_URL',
    term
});
