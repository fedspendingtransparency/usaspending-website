/**
 * modalActions.js
 * Created by Lizzie Salita 2/22/18
 */

// Originally, this was for only the redirect modal, so modalType is by default redirect.
export const showModal = (url, modalType = "redirect") => ({
    type: 'SHOW_MODAL',
    url,
    modalType
});

export const hideModal = () => ({
    type: 'HIDE_MODAL'
});
