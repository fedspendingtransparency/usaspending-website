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
                url: action.url,
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
        case 'SHOW_TRAINING_MODAL': {
            return Object.assign({}, state, {
                display: true,
                url: action.url,
                modal: action.modalType,
                description: action.description,
                publishedAt: action.publishedAt,
                duration: action.duration,
                title: action.title,
                id: action.id
            });
        }
        default:
            return state;
    }
};

export default modalReducer;
