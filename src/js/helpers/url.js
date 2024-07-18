import { showModal } from '../redux/actions/modal/modalActions';

export const displayRedirectModal = (url, dispatch) => {
    dispatch(showModal(url, 'redirect'));
};

export const isRedirectNeeded = (item) => item.externalLink && !item.url.includes('.gov');
