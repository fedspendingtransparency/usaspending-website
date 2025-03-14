import { List } from 'immutable';

import { addSearchResultsToTree, populateChildNodes, showAllNodes } from 'helpers/checkboxTreeHelper';
import {
    getTasNodeFromTree,
    getHighestTasAncestorCode,
    getImmediateTasAncestorCode,
    tasSortFn
} from 'helpers/tasHelper';


const populateTasBranchOrLeafLevelNodes = (nodes, key, newNodes) => populateChildNodes(
    nodes,
    key,
    newNodes,
    getHighestTasAncestorCode,
    getImmediateTasAncestorCode,
    getTasNodeFromTree
);

const addTasSearchResultsToTree = (tree, searchResults) => addSearchResultsToTree(
    tree,
    searchResults,
    getTasNodeFromTree,
    tasSortFn
);

export const initialState = {
    tas: new List(),
    expanded: new List(),
    searchExpanded: new List(),
    checked: new List(),
    unchecked: new List(),
    counts: new List()
};

/* eslint-disable import/prefer-default-export */
export const tasReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TAS_NODES': {
            const { payload, key } = action;
            // initial top-tier data only
            if (!key) {
                return {
                    ...state,
                    tas: new List(payload)
                };
            }
            // need to do this non-sense to match the response object of NAICS :smh:
            const newState = populateTasBranchOrLeafLevelNodes(state.tas.toJS(), key, [{ value: key, children: payload }]);

            return {
                ...state,
                tas: new List(newState)
            };
        }
        case 'SHOW_TAS_TREE': {
            // removes className 'hide' added to nodes from search results
            return {
                ...state,
                tas: new List(showAllNodes(state.tas.toJS()))
            };
        }
        case 'SET_SEARCHED_TAS': {
            const visibleNodes = action.payload;
            const newState = addTasSearchResultsToTree(state.tas.toJS(), visibleNodes);
            return {
                ...state,
                tas: new List(newState)
            };
        }
        case 'SET_SEARCHED_EXPANDED_TAS': {
            return {
                ...state,
                searchExpanded: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_EXPANDED_TAS': {
            return {
                ...state,
                expanded: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_CHECKED_TAS': {
            return {
                ...state,
                checked: new List([...new Set([...action.payload])])
            };
        }
        case 'SET_UNCHECKED_TAS': {
            return {
                ...state,
                unchecked: new List([...new Set([...action.payload])])
            };
        }
        case 'ADD_CHECKED_TAS': {
            return {
                ...state,
                // new Set to eliminate any duplicate values
                checked: new List([...new Set([...state.checked, action.payload])])
            };
        }

        case 'SET_TAS_COUNTS': {
            return {
                ...state,
                counts: new List(action.payload)
            };
        }

        case 'CLEAR_SEARCH_FILTER_ALL': {
            return {
                ...initialState,
                tas: new List(showAllNodes(state.tas.toJS()))
            };
        }

        default:
            return state;
    }
};

export default tasReducer;
