/**
 * columnVisibilityReducerInitialState.js
 * Created by Lizzie Salita 5/23/17
 **/

import { List, Map } from 'immutable';

const initialState = {
    contracts: {
        visibleOrder: new List(),
        hiddenOrder: new List(),
        data: new Map()
    },
    grants: {
        visibleOrder: new List(),
        hiddenOrder: new List(),
        data: new Map()
    },
    direct_payments: {
        visibleOrder: new List(),
        hiddenOrder: new List(),
        data: new Map()
    },
    loans: {
        visibleOrder: new List(),
        hiddenOrder: new List(),
        data: new Map()
    },
    other: {
        visibleOrder: new List(),
        hiddenOrder: new List(),
        data: new Map()
    }
};

export default initialState;

