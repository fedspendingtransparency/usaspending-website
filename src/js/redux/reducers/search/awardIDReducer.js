/**
 * awardIDReducer.js
 * Created by michaelbray on 3/2/17.
 */

import { concat } from 'lodash';

const initialState = {
    piid: [],
    fain: [],
    uri: [],
    parent_award__piid: []
};

const awardIDReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_AWARD_IDS': {
            return Object.assign({}, state, {
                piid: concat([], action.awardIDs.piid),
                fain: concat([], action.awardIDs.fain),
                uri: concat([], action.awardIDs.uri),
                parent_award__piid: concat([], action.awardIDs.parent_award__piid)
            });
        }
        default:
            return state;
    }
};

export default awardIDReducer;
