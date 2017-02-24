/**
 * recipientReducer.js
 * Created by michaelbray on 2/17/17.
 */

import _ from 'lodash';

const initialState = {
    recipients: [],
    recipientLocations: []
};

const recipientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_RECIPIENTS': {
            return Object.assign({}, state, {
                recipients: _.concat([], action.recipients)
            });
        }
        case 'SET_AUTOCOMPLETE_RECIPIENT_LOCATIONS': {
            return Object.assign({}, state, {
                recipientLocations: _.concat([], action.locations)
            });
        }
        default:
            return state;
    }
};

export default recipientReducer;
