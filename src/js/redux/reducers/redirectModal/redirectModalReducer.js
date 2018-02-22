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
                display: true
            });
        }
        case 'HIDE_MODAL': {
            return Object.assign({}, state, {
                display: false
            });
        }
        case 'SET_MODAL_URL': {
            return Object.assign({}, state, {
                url: action.value
            });
        }
        case 'CLEAR_MODAL_URL': {
            return Object.assign({}, state, {
                url: ''
            });
        }
        default:
            return state;
    }
};

export default glossaryReducer;
