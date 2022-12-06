/**
 * aboutTheDataReducer.js
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

const aboutTheDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_ATD': {
            return Object.assign({}, state, {
                display: true
            });
        }
        case 'HIDE_ATD': {
            return Object.assign({}, state, {
                display: false
            });
        }
        case 'TOGGLE_ATD': {
            return Object.assign({}, state, {
                display: !state.display
            });
        }
        case 'SET_ATD_SEARCH_VALUE': {
            const search = Object.assign({}, state.search, {
                input: action.value
            });
            return Object.assign({}, state, {
                search,
                term: new Definition()
            });
        }
        case 'SET_ATD_SEARCH_RESULTS': {
            const search = Object.assign({}, state.search, {
                results: action.results
            });
            return Object.assign({}, state, {
                search
            });
        }
        case 'SET_ATD_FULL_CACHE': {
            return Object.assign({}, state, {
                cache: new Map(action.cache)
            });
        }
        case 'SET_ATD_TERM': {
            return Object.assign({}, state, {
                term: new Definition(action.term)
            });
        }
        case 'CLEAR_ATD_TERM': {
            return Object.assign({}, state, {
                term: new Definition(),
                termFromUrl: ''
            });
        }
        case 'SET_ATD_TERM_FROM_URL': {
            return {
                ...state,
                termFromUrl: action.term
            };
        }
        default:
            return state;
    }
};

export default aboutTheDataReducer;
