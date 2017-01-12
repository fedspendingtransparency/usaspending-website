/**
 * Created by michaelbray on 12/12/16.
 */

import _ from 'lodash';

const initialState = [];

const agencyAwardingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_AWARDING_AGENCIES': {
            return _.concat([], action.awardingAgencies);
        }
        default:
            return state;
    }
};

export default agencyAwardingReducer;
