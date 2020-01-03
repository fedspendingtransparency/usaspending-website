/**
 * naicsReducer.js
 * Created by Jonathan Hill 12/30/19
 */

import { List } from 'immutable';
import { updateNaics } from './updateNaics';

const initialState = new List();
/* eslint-disable import/prefer-default-export */
export const naicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAICS': {
            return new List(action.nodes);
        }
        case 'UPDATE_NAICS': {
            return updateNaics(action.nodes);
        }
        default:
            return state;
    }
};
