/**
 * spendingLevelReducer.js
 * Created by Nick Torres 5/19/26
 */

const initialState = [];

const spendingLevelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SPENDING':
            return action.value;
        default:
            return state;
    }
};

export default spendingLevelReducer;
