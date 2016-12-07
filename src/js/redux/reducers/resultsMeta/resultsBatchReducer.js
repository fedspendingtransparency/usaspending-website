/**
 * rseultsBatchReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Record } from 'immutable';
import { uniqueId } from 'lodash';

const initialValues = {
    batchId: uniqueId()
};

const BatchRecord = Record(initialValues);

const resultsBatchReducer = (state = new BatchRecord(), action) => {
    switch (action.type) {
        case 'RESULTS_BATCH_UPDATE':
            // update the batch ID to trigger an update to subscribers
            return state.set('batchId', uniqueId());
        default:
            return state;
    }
};

export default resultsBatchReducer;
