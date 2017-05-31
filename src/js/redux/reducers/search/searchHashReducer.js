/**
 * searchHashReducer.js
 * Created by Kevin Li 5/30/17
 */

export const initialState = {
    hash: '',
    noFilters: true
};

const searchHashReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_HASH': {
            return Object.assign({}, state, {
                hash: action.hash
            });
        }
        case 'SET_SEARCH_FILTER_UNFILTERED_BOOL': {
            return Object.assign({}, state, {
                noFilters: action.value
            });
        }
        default:
            return state;
    }
};

export default searchHashReducer;
