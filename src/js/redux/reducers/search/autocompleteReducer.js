/**
 * Created by michaelbray on 12/12/16.
 */

import { concat } from 'lodash';

const initialState = [];

const autocompleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_LOCATIONS': {
            return concat([], action.locations);
        }
        case 'SET_AUTOCOMPLETE_CFDA': {
            return concat([], action.cfda);
        }
        case 'SET_AUTOCOMPLETE_NAICS': {
            return concat([], action.naics);
        }
        case 'SET_AUTOCOMPLETE_PSC': {
            return concat([], action.psc);
        }
        default:
            return state;
    }
};

export default autocompleteReducer;
