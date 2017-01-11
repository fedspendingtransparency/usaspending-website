/**
 * rseultsBatchReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Record } from 'immutable';
import { uniqueId } from 'lodash';

// a search ID represents a single set of filters and sort params
// a query ID represents a single API call (so params may be the same except for page number/offset)
const initialValues = {
    searchId: uniqueId(),
    queryId: uniqueId()
};

const BatchRecord = Record(initialValues);

const resultsBatchReducer = (state = new BatchRecord(), action) => {
    switch (action.type) {
        case 'RESULTS_BATCH_SEARCH_UPDATE': {
            let updatedState = state.set('searchId', uniqueId());
            updatedState = updatedState.set('queryId', uniqueId());
            return updatedState;
        }
        case 'RESULTS_BATCH_QUERY_UPDATE':
            // update the query ID to trigger an update to subscribers
            return state.set('queryId', uniqueId());
        default:
            return state;
    }
};

export default resultsBatchReducer;
