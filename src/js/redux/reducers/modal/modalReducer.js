/**
 * modalReducer.js
 * Created by Lizzie Salita 2/22/18
 */

export const initialState = {
    display: false,
    url: '',
    modal: ''
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL': {
            return Object.assign({}, state, {
                display: true,
                url: action.value,
                modal: action.modalType
            });
        }
        case 'HIDE_MODAL': {
            return Object.assign({}, state, {
                display: false,
                url: '',
                modal: ''
            });
        }
        default:
            return state;
    }
};

export default modalReducer;
