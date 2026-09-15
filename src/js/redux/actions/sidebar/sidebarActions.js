/**
 * sidebarActions.js
 * Created by Trey Morgan 8/12/2026
 */

export const SET_SIDEBAR_CONTENT = 'SET_SIDEBAR_CONTENT';
export const SET_IS_SEARCH_ACTIVE = 'SET_IS_SEARCH_ACTIVE';
export const SET_IS_NL_SEARCH_COMPLETE = 'SET_IS_NL_SEARCH_COMPLETE';

export const setSidebarContent = (sidebarContent) => ({
    type: SET_SIDEBAR_CONTENT, 
    sidebarContent
});

export const setIsSearchActive = (isSearchActive) => ({
    type: SET_IS_SEARCH_ACTIVE,
    isSearchActive
});

export const setIsNLSearchComplete = (isNLSearchComplete) => ({
    type: SET_IS_NL_SEARCH_COMPLETE,
    isNLSearchComplete
});