/**
 * rseultsMetaReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Record } from 'immutable';

const initialValues = {
    page: {
        count: 0,
        num_pages: 0,
        page_number: 0,
        total_obligation_sum: 0
    },
    total: {
        count: 0,
        total_obligation_sum: 0
    },
    tableType: 'contracts',
    inFlight: false
};

const MetaRecord = Record(initialValues);

const resultsMetaReducer = (state = new MetaRecord(), action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULT_META':
            // set the search result metadata
            return state.merge(action.meta);
        case 'SET_SEARCH_INFLIGHT':
            return state.merge({
                inFlight: action.inFlight
            });
        case 'SET_SEARCH_TABLE_TYPE':
            return state.merge({
                tableType: action.tableType
            });
        default:
            return state;
    }
};

export default resultsMetaReducer;
