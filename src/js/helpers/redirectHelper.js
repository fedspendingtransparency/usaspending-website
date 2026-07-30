/**
 * redirectHelper.js
 * Created by Lizzie Salita 2/23/18
 **/

import storeSingleton from 'redux/storeSingleton';
import * as redirectModalActions from 'redux/actions/modal/modalActions';
import { sanitizeUrl } from './url';

// eslint-disable-next-line import/prefer-default-export
export const showRedirectModal = (url) => {
    const safeUrl = sanitizeUrl(url);
    if (safeUrl) {
        storeSingleton.store.dispatch(redirectModalActions.showModal(safeUrl));
    }
};
