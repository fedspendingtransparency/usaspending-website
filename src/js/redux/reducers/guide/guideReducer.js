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
