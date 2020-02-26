/**
 * naicsReducer.js
 * Created by Jonathan Hill 12/30/19
 */

import { List } from 'immutable';

const initialState = {
    naics: new List(),
    searchedNaics: new List(),
    expanded: new List(),
    checked: new List()
};
/* eslint-disable import/prefer-default-export */
const naicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAICS': {
            return {
                ...state,
                naics: new List(action.payload)
            };
        }
        case 'SET_SEARCHED': {
            return {
                ...state,
                searchedNaics: new List(action.payload)
            };
        }
        case 'SET_EXPANDED': {
            return {
                ...state,
                expanded: new List(action.payload)
            };
        }
        case 'SET_CHECKED': {
            return {
                ...state,
                checked: new List(action.payload)
            };
        }
        default:
            return state;
    }
};

export default naicsReducer;
