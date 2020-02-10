/**
 * updateNaics.js
 * Created by Jonathan Hill 12/30/19
 */

import { List } from 'immutable';

export const setNaics = (state, naics) => {
    const newState = { ...state };
    newState.naics = new List(naics);
    return newState;
};

export const setExpanded = (state, expanded) => {
    const newState = { ...state };
    newState.expanded = new List(expanded);
    return newState;
};

export const setChecked = (state, checked) => {
    const newState = { ...state };
    newState.checked = new List(checked);
    return newState;
};
