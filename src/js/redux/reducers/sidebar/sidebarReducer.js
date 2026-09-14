/**
 * sidebarReducer.js
 * Created by Trey Morgan 8/12/2026
 */

import * as sidebarActions from '../../actions/sidebar/sidebarActions'

export const initialState = {
    sidebarContent: 'filters',
    isSearchActive: false
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case sidebarActions.SET_SIDEBAR_CONTENT: {
            return {...state, sidebarContent: action.sidebarContent};
        }
        case sidebarActions.SET_IS_SEARCH_ACTIVE: {
            return {...state, isSearchActive: action.isSearchActive};
        }
        default: return state;
    }
};

export default sidebarReducer;