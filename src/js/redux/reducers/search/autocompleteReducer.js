/**
 * Created by michaelbray on 12/12/16.
 */

const initialState = [];

const autocompleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_LOCATIONS':
            return action.locations;
        default:
            return state;
    }
};

export default autocompleteReducer;
