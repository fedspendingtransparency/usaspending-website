/**
 * sidebarReducer.js
 * Created by Trey Morgan 8/12/2026
 */

import * as sidebarActions from '../../actions/sidebar/sidebarActions';

export const initialState = {
    sidebarContent: 'filters',
    isSearchActive: false,
    isNLSearchComplete: false,
    isNLSearchError: false,
    // hash of the filters produced by the most recent smart assist search; null when the
    // current filters are not smart assist derived
    nlSearchId: null
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case sidebarActions.SET_SIDEBAR_CONTENT: {
            return { ...state, sidebarContent: action.sidebarContent };
        }
        case sidebarActions.SET_IS_SEARCH_ACTIVE: {
            return { ...state, isSearchActive: action.isSearchActive };
        }
        case sidebarActions.SET_IS_NL_SEARCH_COMPLETE: {
            return { ...state, isNLSearchComplete: action.isNLSearchComplete };
        }
        case sidebarActions.SET_IS_NL_SEARCH_ERROR: {
            return { ...state, isNLSearchError: action.isNLSearchError };
        }
        case sidebarActions.SET_NL_SEARCH_ID: {
            return { ...state, nlSearchId: action.nlSearchId };
        }
        case 'CLEAR_SEARCH_FILTER_ALL': {
            return { ...state, nlSearchId: null };
        }
        default: return state;
    }
};

export default sidebarReducer;
