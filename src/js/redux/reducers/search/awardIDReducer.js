/**
 * awardIDReducer.js
 * Created by michaelbray on 3/2/17.
 */

import _ from 'lodash';

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
                piid: _.concat([], action.awardIDs.piid),
                fain: _.concat([], action.awardIDs.fain),
                uri: _.concat([], action.awardIDs.uri),
                parent_award__piid: _.concat([], action.awardIDs.parent_award__piid)
            });
        }
        default:
            return state;
    }
};

export default awardIDReducer;
