/**
 * guideActions.js
 * Created by Kevin Li 4/28/17
 */

export const showGuide = () => ({
    type: 'SHOW_GUIDE'
});

export const hideGuide = () => ({
    type: 'HIDE_GUIDE'
});

export const toggleGuide = () => ({
    type: 'TOGGLE_GUIDE'
});

export const setSearchValue = (state) => ({
    type: 'SET_GUIDE_SEARCH_VALUE',
    value: state
});

export const setGuideTerm = (state) => ({
    type: 'SET_GUIDE_TERM',
    term: state
});

export const clearGuideTerm = () => ({
    type: 'CLEAR_GUIDE_TERM'
});

export const setGuideResults = (state) => ({
    type: 'SET_GUIDE_SEARCH_RESULTS',
    results: state
});
