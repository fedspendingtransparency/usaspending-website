/**
 * naicsReducer.js
 * Created by Jonathan Hill 12/30/19
 */

import { List } from 'immutable';
import { updateNAICS } from './updateNaics';

const initialState = {
    naics: new List()
};
/* eslint-disable import/prefer-default-export */
export const naicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAICS': {
            return new List(action.naics);
        }
        case 'UPDATE_NAICS': {
            return updateNAICS();
        }
        default:
            return state;
    }
};
