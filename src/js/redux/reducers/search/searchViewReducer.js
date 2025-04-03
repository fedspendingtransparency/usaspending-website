/**
 * searchViewReducer.js
 * Created by Kevin Li 3/30/18
 */

export const initialState = {
    type: 'table',
    subaward: false,
    mapHasLoaded: false,
    spendingLevel: 'prime'
};

const searchViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_VIEW_TYPE':
            return Object.assign({}, state, {
                type: action.value
            });

        case 'SET_SEARCH_VIEW_SUBAWARD':
            return Object.assign({}, state, {
                subaward: action.value
            });

        case 'SET_MAP_HAS_LOADED':
            return Object.assign({}, state, {
                mapHasLoaded: action.value
            });

        case 'SET_SPENDING_LEVEL':
            return Object.assign({}, state, {
                spendingLevel: action.value
            });

        default:
            return state;
    }
};

export default searchViewReducer;
