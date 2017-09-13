/**
 * searchOrderReducer.js
 * Created by Kevin Li 1/5/17
 **/

import { Record } from 'immutable';

export const initialState = {
    field: 'Award Amount',
    direction: 'desc'
};

export const OrderRecord = Record(initialState);

const searchFiltersReducer = (state = new OrderRecord(), action) => {
    switch (action.type) {
        case 'SET_SEARCH_ORDER': {
            return new OrderRecord({
                field: action.field,
                direction: action.direction
            });
        }
        case 'RESET_SEARCH_ORDER': {
            return new OrderRecord();
        }
        default:
            return state;
    }
};

export default searchFiltersReducer;
