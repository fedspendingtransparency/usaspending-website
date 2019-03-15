/**
 * awardReducer.js
 * Created by Lizzie Salita 12/4/18
 **/

export const initialState = {
    id: '',
    category: '',
    overview: null,
    counts: null
};

const awardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AWARD': {
            return Object.assign({}, state, {
                id: action.overview.generatedId,
                category: action.overview.category,
                overview: action.overview
            });
        }
        case 'SET_COUNTS': {
            return Object.assign({}, state, {
                counts: action.counts
            });
        }
        case 'RESET_AWARD': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default awardReducer;
