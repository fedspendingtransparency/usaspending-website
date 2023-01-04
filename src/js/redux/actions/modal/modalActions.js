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

export const showTrainingVideoModal = (props) => ({
    type: 'SHOW_TRAINING_MODAL',
    url: props.url,
    modalType: props.modalType,
    title: props.title,
    description: props.description,
    publishedAt: props.publishedAt,
    duration: props.duration,
    id: props.id
});

export const hideModal = () => ({
    type: 'HIDE_MODAL'
});
