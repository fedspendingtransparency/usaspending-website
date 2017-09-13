/**
 * columnVisibilityReducerInitialState.js
 * Created by Lizzie Salita 5/23/17
 **/

import { OrderedSet, Map } from 'immutable';

const initialState = {
    contracts: {
        visibleOrder: new OrderedSet(),
        hiddenOrder: new OrderedSet(),
        data: new Map()
    },
    grants: {
        visibleOrder: new OrderedSet(),
        hiddenOrder: new OrderedSet(),
        data: new Map()
    },
    direct_payments: {
        visibleOrder: new OrderedSet(),
        hiddenOrder: new OrderedSet(),
        data: new Map()
    },
    loans: {
        visibleOrder: new OrderedSet(),
        hiddenOrder: new OrderedSet(),
        data: new Map()
    },
    other: {
        visibleOrder: new OrderedSet(),
        hiddenOrder: new OrderedSet(),
        data: new Map()
    }
};

export default initialState;

