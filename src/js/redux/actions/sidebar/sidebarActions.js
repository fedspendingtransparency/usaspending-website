/**
 * sidebarActions.js
 * Created by Trey Morgan 7/2/2026
 */

export const SET_SIDEBAR_CONTENT = 'SET_SIDEBAR_CONTENT';

export const setSidebarContent = (sidebarContent) => ({
    type: SET_SIDEBAR_CONTENT, 
    sidebarContent
});