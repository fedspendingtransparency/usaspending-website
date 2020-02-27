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
            const { payload, key } = action;
            // initial top-tier data only
            if (!key) return { ...state, naics: new List(payload) };

            const newState = state.naics
                .toJS()
                .map((node) => {
                    if (node.value === key) {
                        return {
                            ...node,
                            children: payload[0].children
                        };
                    }
                    return {
                        ...node,
                        children: node.children.map((child) => {
                            if (child.value === key) {
                                return {
                                    ...child,
                                    children: payload[0].children
                                };
                            }
                            return child;
                        })
                    };
                });

            return {
                ...state,
                naics: new List(newState)
            };
        }
        case 'SET_SEARCHED_NAICS': {
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
