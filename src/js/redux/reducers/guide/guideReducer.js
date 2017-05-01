/**
 * guideReducer.js
 * Created by Kevin Li 4/28/17
 */

import { Record } from 'immutable';

export const Definition = Record({
    value: '',
    plain: '',
    official: '',
    resources: []
});

export const initialState = {
    display: true,
    term: new Definition(),
    search: {
        input: '',
        results: [
            {
                value: 'Recipient Location'
            },
            {
                value: 'Recipients'
            },
            {
                value: 'Recipient Name'
            },
            {
                value: 'Recipient Type'
            },
            {
                value: 'Award ID'
            },
            {
                value: 'Appropriation Account'
            },
            {
                value: 'my super long term that I hope will wrap correctly'
            }
        ]
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
                search
            });
        }
        case 'SET_TERM': {
            return Object.assign({}, state, {
                term: new Definition(action.term)
            });
        }
        default:
            return state;
    }
};

export default guideReducer;
