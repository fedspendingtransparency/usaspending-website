/**
 * covid19Reducer.js
 * Created by Jonathan Hill 06/11/20
 */

const initialState = {
    codes: []
};

const covid19Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CODES': {
            return Object.assign(state, { codes: action.codes });
        }
        default: return state;
    }
};

export default covid19Reducer;
