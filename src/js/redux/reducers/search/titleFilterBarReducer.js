/**
 * searchViewReducer.js
 * Created by Kevin Li 3/30/18
 */

export const initialState = {
    type: 'table',
    subaward: false
};

const titleFilterBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HAS_RESULTS':
            return Object.assign({}, state, {
                hasResults: action.value
            });

        default:
            return state;
    }
};

export default titleFilterBarReducer;
