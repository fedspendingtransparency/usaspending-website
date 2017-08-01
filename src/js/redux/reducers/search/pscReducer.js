/**
 * Created by Emily Gullo 07/25/2017
 */

import { concat } from 'lodash';

const initialState = [];

const pscReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_PSC': {
            return concat([], action.psc);
        }
        default:
            return state;
    }
};

export default pscReducer;
