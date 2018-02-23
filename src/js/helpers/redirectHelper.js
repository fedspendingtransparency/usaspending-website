/**
 * redirectHelper.js
 * Created by Lizzie Salita 2/23/18
 **/

import storeSingleton from 'redux/storeSingleton';
import * as redirectModalActions from 'redux/actions/redirectModal/redirectModalActions';


export const showRedirectModal = (url) => {
    storeSingleton.store.dispatch(redirectModalActions.showModal(url));
};

export const hideRedirectModal = () => {
    storeSingleton.store.dispatch(redirectModalActions.hideModal());
};
