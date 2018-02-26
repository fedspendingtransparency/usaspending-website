/**
 * redirectModalActions.js
 * Created by Lizzie Salita 2/22/18
 */

export const showModal = (state) => ({
    type: 'SHOW_MODAL',
    value: state
});

export const hideModal = () => ({
    type: 'HIDE_MODAL'
});
