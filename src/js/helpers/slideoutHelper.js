/* eslint-disable linebreak-style */

import storeSingleton from 'redux/storeSingleton';
import * as slideoutActions from '../redux/actions/slideouts/slideoutActions';
import * as aboutTheDataActions from '../redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import * as glossaryActions from '../redux/actions/glossary/glossaryActions';

const store = storeSingleton.store;

const closeLastOpenedSlideOut = (type) => {
    // used switch to allow for easier expandablity in the future
    switch (type) {
        case 'glossary':
            store.dispatch(glossaryActions.hideGlossary());
            break;

        case 'atd':
            store.dispatch(aboutTheDataActions.hideAboutTheData());
            break;

        default:
            // consider logging something here but for now just return null
            break;
    }
    return true;
};

const showSlideout = (type, options = {}) => {
    // options { 'clear', 'term', 'url' } any or all can be null
    const { lastOpenedSlideout } = store.getState().slideouts;

    if (lastOpenedSlideout !== '' && lastOpenedSlideout !== type) {
        closeLastOpenedSlideOut(lastOpenedSlideout);
    }

    switch (type) {
        case 'glossary':
            if (Object.hasOwn(options, 'clear')) {
                store.dispatch(glossaryActions.clearGlossaryTerm());
            }
            if (Object.hasOwn(options, 'url')) {
                store.dispatch(glossaryActions.setTermFromUrl(options.url));
            }
            store.dispatch(glossaryActions.showGlossary());
            break;

        case 'atd':
            if (Object.hasOwn(options, 'term')) {
                store.dispatch(aboutTheDataActions.setAboutTheDataTerm(options.term));
            }
            if (Object.hasOwn(options, 'url')) {
                store.dispatch(aboutTheDataActions.setAboutTheDataTermFromUrl(options.url));
            }
            store.dispatch(aboutTheDataActions.showAboutTheData());
            break;

        default:
            // consider logging something here but for now just return null
            break;
    }

    store.dispatch(slideoutActions.setLastOpenedSlideout(type));
    return true;
};

export default showSlideout;
