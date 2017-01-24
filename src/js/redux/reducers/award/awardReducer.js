/**
 * awardReducer.js
 * Created by Emily Gullo 01/23/2017
 **/

const initialState = [];

const awardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_AWARD': {
            return Object.assign({}, state, {
                selectedAward: action.selectedAward
            });
        }
        default:
            return state;
    }
};

export default awardReducer;
