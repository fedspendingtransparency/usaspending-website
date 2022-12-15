/**
 * aboutTheDataActions.js
 * Created by Andrea Blackwell 12/06/2022
 */

export const showAboutTheData = () => ({
    type: 'SHOW_ABOUT_THE_DATA'
});

export const hideAboutTheData = () => ({
    type: 'HIDE_ABOUT_THE_DATA'
});

export const setAboutTheDataSearchValue = (state) => ({
    type: 'SET_ABOUT_THE_DATA_SEARCH_VALUE',
    value: state
});

export const setAboutTheDataResults = (state) => ({
    type: 'SET_ABOUT_THE_DATA_SEARCH_RESULTS',
    results: state
});

export const setAboutTheDataTerm = (state) => ({
    type: 'SET_ABOUT_THE_DATA_TERM',
    term: state
});

export const clearAboutTheDataTerm = () => ({
    type: 'CLEAR_ABOUT_THE_DATA_TERM'
});

export const setAboutTheDataTermFromUrl = (term) => ({
    type: 'SET_ABOUT_THE_DATA_TERM_FROM_URL',
    term
});
