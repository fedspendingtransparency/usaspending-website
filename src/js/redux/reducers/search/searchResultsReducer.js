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
    meta: {
        page: {
            count: 0,
            num_pages: 0,
            page_number: 0,
            total_obligation_sum: 0
        },
        total: {
            count: 0,
            total_obligation_sum: 0
        }
    }
};
/* eslint-enable new-cap */

const searchResultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            // the only search result values should be the new results
            return Object.assign({}, state, {
                rows: _.concat([], action.results)
            });
        case 'APPEND_SEARCH_RESULTS':
            // the search result values are the old results plus the new results
            return Object.assign({}, state, {
                rows: _.concat([], state.rows, action.results)
            });
        case 'RESET_SEARCH_RESULTS':
            // there should be no search results
            return Object.assign({}, state, {
                rows: _.concat([])
            });
        case 'SET_SEARCH_RESULT_META':
            // set the search result metadata
            return Object.assign({}, state, {
                meta: action.meta
            });
        default:
            return state;
    }
};

export default searchResultsReducer;
