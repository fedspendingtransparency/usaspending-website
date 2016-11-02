/**
 * searchResultsReducer.js
 * Created by Kevin Li 11/1/16
 **/

import _ from 'lodash';

/* eslint-disable new-cap */
// this is a correct usage of capitalized functions because
// we are, in fact, using List as a constructor
const initialState = {
    rows: [],
    meta: {}
};
/* eslint-enable new-cap */

const searchResultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return Object.assign({}, state, {
                rows: _.concat([], state.rows, action.results)
            });
        case 'RESET_SEARCH_RESULTS':
            return Object.assign({}, state, {
                rows: _.concat([])
            });
        default:
            return state;
    }
};

export default searchResultsReducer;
