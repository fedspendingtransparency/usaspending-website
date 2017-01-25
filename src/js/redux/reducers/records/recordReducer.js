/**
 * recordReducer.js
 * Created by Kevin Li 11/16/16
 **/

import { List } from 'immutable';

const initialState = {
    awards: new List()
};

const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BULK_INSERT_RECORD_SET': {
            return Object.assign({}, state, {
                [action.field]: state[action.field].concat(action.data)
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
