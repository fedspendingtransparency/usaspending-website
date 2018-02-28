/**
 * redirectModalReducer.js
 * Created by Lizzie Salita 2/22/18
 */

export const initialState = {
    display: false,
    url: ''
};

const glossaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL': {
            return Object.assign({}, state, {
                display: true,
                url: action.value
            });
        }
        case 'HIDE_MODAL': {
            return Object.assign({}, state, {
                display: false,
                url: ''
            });
        }
        default:
            return state;
    }
};

export default glossaryReducer;
