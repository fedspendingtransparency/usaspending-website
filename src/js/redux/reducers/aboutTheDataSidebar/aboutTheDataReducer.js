/**
 * aboutTheDataReducer.js
 * Created by Andrea Blackwell 12/06/2022
 */

import { Record } from 'immutable';

export const Entry = Record({
    name: '',
    slug: ''
});

export const initialState = {
    display: false,
    term: new Entry(),
    search: {
        input: '',
        results: []
    },
    termFromUrl: ''
};

const aboutTheDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_ABOUT_THE_DATA': {
            return Object.assign({}, state, {
                display: true
            });
        }
        case 'HIDE_ABOUT_THE_DATA': {
            return Object.assign({}, state, {
                display: false
            });
        }
        case 'SET_ABOUT_THE_DATA_SEARCH_VALUE': {
            const search = Object.assign({}, state.search, {
                input: action.value
            });
            return Object.assign({}, state, {
                search,
                term: new Entry()
            });
        }
        case 'SET_ABOUT_THE_DATA_SEARCH_RESULTS': {
            const search = Object.assign({}, state.search, {
                results: action.results
            });
            return Object.assign({}, state, {
                search
            });
        }
        case 'SET_ABOUT_THE_DATA_TERM': {
            return Object.assign({}, state, {
                term: new Entry(action.term)
            });
        }
        case 'CLEAR_ABOUT_THE_DATA_TERM': {
            return Object.assign({}, state, {
                term: new Entry(),
                termFromUrl: ''
            });
        }
        case 'SET_ABOUT_THE_DATA_TERM_FROM_URL': {
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
