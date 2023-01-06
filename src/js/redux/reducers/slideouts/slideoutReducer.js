/**
 * slideoutReducer.js
 * Created by Brian Petway 01/05/2023
 */

export const initialState = {
    lastOpenedSlideout: ''
};

const slideoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LAST_OPENED': {
            return Object.assign({}, state, {
                lastOpenedSlideout: action.lastOpenedSlideout
            });
        }
        default:
            return state;
    }
};

export default slideoutReducer;
