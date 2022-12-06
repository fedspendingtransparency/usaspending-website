/**
 * glossaryReducer.js
 * Created by Kevin Li 4/28/17
 */

import { Record, Map } from 'immutable';

export const Definition = Record({
    term: '',
    data_act_term: '',
    slug: '',
    plain: '',
    official: '',
    resources: '',
    termFromUrl: ''
});

export const initialState = {
    display: false,
    term: new Definition(),
    cache: new Map(),
    search: {
        input: '',
        results: []
    },
    termFromUrl: ''
};

const glossaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_GLOSSARY': {
            return Object.assign({}, state, {
                display: true
            });
        }
        case 'HIDE_GLOSSARY': {
            return Object.assign({}, state, {
                display: false
            });
        }
        case 'TOGGLE_GLOSSARY': {
            return Object.assign({}, state, {
                display: !state.display
            });
        }
        case 'SET_GLOSSARY_SEARCH_VALUE': {
            const search = Object.assign({}, state.search, {
                input: action.value
            });
            return Object.assign({}, state, {
                search,
                term: new Definition()
            });
        }
        case 'SET_GLOSSARY_SEARCH_RESULTS': {
            const search = Object.assign({}, state.search, {
                results: action.results
            });
            return Object.assign({}, state, {
                search
            });
        }
        case 'SET_GLOSSARY_FULL_CACHE': {
            return Object.assign({}, state, {
                cache: new Map(action.cache)
            });
        }
        case 'SET_GLOSSARY_TERM': {
            return Object.assign({}, state, {
                term: new Definition(action.term)
            });
        }
        case 'CLEAR_GLOSSARY_TERM': {
            return Object.assign({}, state, {
                term: new Definition(),
                termFromUrl: ''
            });
        }
        case 'SET_GLOSSARY_TERM_FROM_URL': {
            return {
                ...state,
                termFromUrl: action.term
            };
        }
        default:
            return state;
    }
};

export default glossaryReducer;
