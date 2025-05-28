/**
 * pscReducer.js
 * Created by Jonathan Hill 12/30/19
 */

import { List } from 'immutable';

import { addSearchResultsToTree, populateChildNodes, showAllNodes } from 'helpers/checkboxTreeHelper';
import { getHighestPscAncestor, getImmediatePscAncestor, getPscNodeFromTree } from 'helpers/pscHelper';

export const initialState = {
    psc: new List(),
    expanded: new List(),
    searchExpanded: new List(),
    checked: new List(),
    unchecked: new List(),
    counts: new List()
};

const populatePscBranchOrLeafNodes = (nodes, key, newNodes) => populateChildNodes(
    nodes,
    key,
    newNodes,
    getHighestPscAncestor,
    getImmediatePscAncestor,
    getPscNodeFromTree
);

const addPscSearchResultsToTree = (tree, searchResults) => addSearchResultsToTree(
    tree,
    searchResults,
    getPscNodeFromTree
);

/* eslint-disable import/prefer-default-export */
export const pscReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PSC_NODES': {
            const { payload, key } = action;
            // initial top-tier data only
            if (!key) return { ...state, psc: new List(payload) };

            // need to do this non-sense to match the response object of NAICS :smh:
            const newState = populatePscBranchOrLeafNodes(state.psc.toJS(), key, [{ value: key, children: payload }]);

            return {
                ...state,
                psc: new List(newState)
            };
        }
        case 'SHOW_PSC_TREE': {
            // removes className 'hide' added to nodes from search results
            return {
                ...state,
                psc: new List(showAllNodes(state.psc.toJS()))
            };
        }
        case 'SET_SEARCHED_PSC': {
            const visibleNodes = action.payload;
            const newState = addPscSearchResultsToTree(state.psc.toJS(), visibleNodes);
            return {
                ...state,
                psc: new List(newState)
            };
        }
        case 'SET_SEARCHED_EXPANDED_PSC': {
            return {
                ...state,
                searchExpanded: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_EXPANDED_PSC': {
            return {
                ...state,
                expanded: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_CHECKED_PSC': {
            return {
                ...state,
                checked: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_UNCHECKED_PSC': {
            return {
                ...state,
                unchecked: new List([...new Set([...action.payload])])
            };
        }
        case 'ADD_CHECKED_PSC': {
            return {
                ...state,
                // new Set to eliminate any duplicate values
                checked: new List([...new Set([...state.checked, action.payload])])
            };
        }
        case 'SET_PSC_COUNTS': {
            return {
                ...state,
                counts: new List(action.payload)
            };
        }
        case 'CLEAR_SEARCH_FILTER_ALL': {
            return {
                ...initialState,
                psc: new List(showAllNodes(state.psc.toJS()))
            };
        }
        default:
            return state;
    }
};

export default pscReducer;
