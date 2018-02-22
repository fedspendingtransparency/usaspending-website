/**
 * redirectModalActions.js
 * Created by Lizzie Salita 2/22/18
 */

export const showModal = () => ({
    type: 'SHOW_MODAL'
});

export const hideModal = () => ({
    type: 'HIDE_MODAL'
});

export const setModalUrl = (state) => ({
    type: 'SET_MODAL_URL',
    value: state
});

export const clearModalUrl = () => ({
    type: 'CLEAR_MODAL_URL'
});
