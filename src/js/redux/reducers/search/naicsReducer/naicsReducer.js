/**
 * naicsReducer.js
 * Created by Jonathan Hill 12/30/19
 */

import { List } from 'immutable';
import { setNaics, setExpanded, setChecked } from './naicsReducerFunctions';

const initialState = {
    naics: new List(),
    expanded: new List(),
    checked: new List()
};
/* eslint-disable import/prefer-default-export */
export const naicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAICS': {
            return setNaics(state, action.nodes);
        }
        case 'SET_EXPANDED': {
            return setExpanded(state, action.expanded);
        }
        case 'SET_CHECKED': {
            return setChecked(state, action.checked);
        }
        default:
            return state;
    }
};
