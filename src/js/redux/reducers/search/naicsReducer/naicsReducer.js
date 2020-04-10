/**
 * naicsReducer.js
 * Created by Jonathan Hill 12/30/19
 */

import { List } from 'immutable';

import { addSearchResultsToTree, populateTree } from 'helpers/checkboxTreeHelper';
import { getHighestAncestorNaicsCode, getNaicsNodeFromTree } from 'helpers/naicsHelper';

export const initialState = {
    naics: new List(),
    expanded: new List(),
    searchExpanded: new List(),
    checked: new List(),
    unchecked: new List()
};

const showAllNaicsTreeItems = (nodes, key, newNodes) => populateTree(
    nodes,
    key,
    newNodes,
    getHighestAncestorNaicsCode,
    getNaicsNodeFromTree
);

const addNaicsSearchResultsToTree = (tree, searchResults) => addSearchResultsToTree(
    tree,
    searchResults,
    getNaicsNodeFromTree
);

/* eslint-disable import/prefer-default-export */
export const naicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAICS_NODES': {
            const { payload, key } = action;
            // initial top-tier data only
            if (!key) return { ...state, naics: new List(payload) };

            const newState = showAllNaicsTreeItems(state.naics.toJS(), key, payload);

            return {
                ...state,
                naics: new List(newState)
            };
        }
        case 'SHOW_NAICS_TREE': {
            // removes className 'hide' added to nodes from search results
            return {
                ...state,
                naics: new List(showAllNaicsTreeItems(state.naics.toJS()))
            };
        }
        case 'SET_SEARCHED_NAICS': {
            const visibleNodes = action.payload;
            const newState = addNaicsSearchResultsToTree(state.naics.toJS(), visibleNodes);
            return {
                ...state,
                naics: new List(newState)
            };
        }
        case 'SET_SEARCHED_EXPANDED_NAICS': {
            return {
                ...state,
                searchExpanded: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_EXPANDED_NAICS': {
            return {
                ...state,
                expanded: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_CHECKED_NAICS': {
            return {
                ...state,
                checked: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_UNCHECKED_NAICS': {
            return {
                ...state,
                unchecked: new List([...new Set([...action.payload])])
            };
        }
        case 'ADD_CHECKED_NAICS': {
            return {
                ...state,
                // new Set to eliminate any duplicate values
                checked: new List([...new Set([...state.checked, action.payload])])
            };
        }
        default:
            return state;
    }
};

export default naicsReducer;
