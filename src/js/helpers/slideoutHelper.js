/* eslint-disable linebreak-style */

import storeSingleton from 'redux/storeSingleton';
import * as slideoutActions from '../redux/actions/slideouts/slideoutActions';
import * as aboutTheDataActions from '../redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import * as glossaryActions from '../redux/actions/glossary/glossaryActions';

const closeLastOpenedSlideOut = (type) => {
    // used switch to allow for easier expandablity in the future
    switch (type) {
        case 'glossary':
            storeSingleton.store.dispatch(glossaryActions.hideGlossary());
            break;

        case 'atd':
            storeSingleton.store.dispatch(aboutTheDataActions.hideAboutTheData());
            break;

        default:
            // consider logging something here but for now just return null
            break;
    }
    return true;
};

// eslint-disable-next-line import/prefer-default-export
export const showSlideout = (type, options = {}) => {
    // options { 'clear', 'term', 'url', 'open' } any or all can be null
    const { lastOpenedSlideout } = storeSingleton.store.getState().slideouts;
    let open = true;

    if (lastOpenedSlideout !== '' && lastOpenedSlideout !== type) {
        closeLastOpenedSlideOut(lastOpenedSlideout);
    }

    switch (type) {
        case 'glossary':
            if (Object.hasOwn(options, 'clear')) {
                storeSingleton.store.dispatch(glossaryActions.clearGlossaryTerm());
            }
            if (Object.hasOwn(options, 'term')) {
                storeSingleton.store.dispatch(glossaryActions.setGlossaryTerm(options.term));
            }
            if (Object.hasOwn(options, 'url')) {
                storeSingleton.store.dispatch(glossaryActions.setTermFromUrl(options.url));
            }
            storeSingleton.store.dispatch(glossaryActions.showGlossary());
            break;

        case 'atd':
            if (Object.hasOwn(options, 'term')) {
                storeSingleton.store.dispatch(aboutTheDataActions.setAboutTheDataTerm(options.term));
            }
            if (Object.hasOwn(options, 'url')) {
                storeSingleton.store.dispatch(aboutTheDataActions.setAboutTheDataTermFromUrl(options.url));
            }
            if (Object.hasOwn(options, 'open')) {
                open = options.open;
            }
            if (open) {
                storeSingleton.store.dispatch(aboutTheDataActions.showAboutTheData());
            }
            break;

        default:
            // consider logging something here but for now just return null
            break;
    }

    if (open) {
        storeSingleton.store.dispatch(slideoutActions.setLastOpenedSlideout(type));
    }
    return true;
};

