/**
 * recordReducer.js
 * Created by Kevin Li 11/16/16
 **/

import { Map } from 'immutable';

const initialState = {
    awards: new Map(),
    finAssists: new Map(),
    procurements: new Map(),
    recipients: new Map(),
    locations: new Map()
};

const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BULK_INSERT_RECORDS': {
            return Object.assign({}, state, {
                [action.field]: state[action.field].merge(action.data)
            });
        }
        case 'CLEAR_RECORDS': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default recordReducer;
