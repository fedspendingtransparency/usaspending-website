/**
 * searchViewReducer.js
 * Created by Kevin Li 3/30/18
 */

export const initialState = {
    type: 'table',
    subaward: false
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

        default:
            return state;
    }
};

export default searchViewReducer;
