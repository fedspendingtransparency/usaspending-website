/**
 * covid19Reducer.js
 * Created by Jonathan Hill 06/11/20
 */

const initialState = {
    defCodes: [],
    overview: {}
};

const covid19Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEF_CODES': {
            return Object.assign(state, { defCodes: action.defCodes });
        }
        case 'SET_COVID_OVERVIEW': {
            return Object.assign(state, { overview: action.overview });
        }
        default: return state;
    }
};

export default covid19Reducer;
