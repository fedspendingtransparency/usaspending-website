/**
 * titleBarFilterReducer.js
 * Created by Nick Torres 4/11/24
 */

const initialState = {
    hasResults: false
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
