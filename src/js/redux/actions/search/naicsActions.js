/**
  * naicsActions.js
  * Created by Jonathan Hill 12/30/19
  **/

import { cleanNaicsData } from "helpers/checkboxTreeHelper";

export const setNaics = (key, nodes) => ({
    type: 'SET_NAICS',
    key,
    payload: cleanNaicsData(nodes)
});

export const showNaicsTree = () => ({
    type: 'SHOW_NAICS_TREE'
});

export const setExpanded = (expanded, type = 'SET_EXPANDED') => ({
    type,
    payload: expanded
});

export const addChecked = (nodeValue) => ({
    type: 'ADD_CHECKED',
    payload: nodeValue
});

export const setChecked = (nodes) => ({
    type: 'SET_CHECKED',
    payload: nodes
});

export const setUnchecked = (nodes) => ({
    type: 'SET_UNCHECKED',
    payload: nodes
});

export const setSearchedNaics = (nodes) => ({
    type: 'SET_SEARCHED_NAICS',
    payload: cleanNaicsData(nodes)
});
