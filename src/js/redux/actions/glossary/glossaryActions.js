/**
 * glossaryActions.js
 * Created by Kevin Li 4/28/17
 */

export const showGlossary = () => ({
    type: 'SHOW_GLOSSARY'
});

export const hideGlossary = () => ({
    type: 'HIDE_GLOSSARY'
});

export const toggleGlossary = () => ({
    type: 'TOGGLE_GLOSSARY'
});

export const setSearchValue = (state) => ({
    type: 'SET_GLOSSARY_SEARCH_VALUE',
    value: state
});

export const setGlossaryTerm = (state) => ({
    type: 'SET_GLOSSARY_TERM',
    term: state
});

export const clearGlossaryTerm = () => ({
    type: 'CLEAR_GLOSSARY_TERM'
});

export const setGlossaryResults = (state) => ({
    type: 'SET_GLOSSARY_SEARCH_RESULTS',
    results: state
});

export const setGlossaryCache = (state) => ({
    type: 'SET_GLOSSARY_FULL_CACHE',
    cache: state
});

export const setTermFromUrl = (term) => ({
    type: 'SET_GLOSSARY_TERM_FROM_URL',
    term
});
