/**
 * guideReducer.js
 * Created by Kevin Li 4/28/17
 */

import { Record, Map } from 'immutable';

export const Definition = Record({
    term: '',
    data_act_term: '',
    slug: '',
    plain: '',
    official: '',
    resources: ''
});

export const initialState = {
    display: false,
    term: new Definition(),
    cache: new Map(),
    search: {
        input: '',
        results: []
    }
};

const guideReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_GUIDE': {
            return Object.assign({}, state, {
                display: true
            });
        }
        case 'HIDE_GUIDE': {
            return Object.assign({}, state, {
                display: false
            });
        }
        case 'TOGGLE_GUIDE': {
            return Object.assign({}, state, {
                display: !state.display
            });
        }
        case 'SET_GUIDE_SEARCH_VALUE': {
            const search = Object.assign({}, state.search, {
                input: action.value
            });
            return Object.assign({}, state, {
                search,
                term: new Definition()
            });
        }
        case 'SET_GUIDE_SEARCH_RESULTS': {
            const search = Object.assign({}, state.search, {
                results: action.results
            });
            return Object.assign({}, state, {
                search
            });
        }
        case 'SET_GUIDE_FULL_CACHE': {
            return Object.assign({}, state, {
                cache: new Map(action.cache)
            });
        }
        case 'SET_GUIDE_TERM': {
            return Object.assign({}, state, {
                term: new Definition(action.term)
            });
        }
        case 'CLEAR_GUIDE_TERM': {
            return Object.assign({}, state, {
                term: new Definition()
            });
        }
        default:
            return state;
    }
};

export default guideReducer;
