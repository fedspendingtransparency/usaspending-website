/**
 * sidebarActions.js
 * Created by Trey Morgan 8/12/2026
 */

export const SET_SIDEBAR_CONTENT = 'SET_SIDEBAR_CONTENT';

export const setSidebarContent = (sidebarContent) => ({
    type: SET_SIDEBAR_CONTENT, 
    sidebarContent
});