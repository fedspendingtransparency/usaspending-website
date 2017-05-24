/**
 * rseultsMetaReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Record } from 'immutable';

const initialValues = {
    page: {
        count: 0,
        num_pages: 0,
        page_number: 1,
        total_obligation_sum: 0
    },
    total: {
        count: 0,
        total_obligation_sum: 0
    },
    visualization: {
        transaction_sum: 0
    },
    tableType: 'contracts',
    inFlight: false
};

export const MetaRecord = Record(initialValues);

const resultsMetaReducer = (state = new MetaRecord(), action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULT_META':
            // set the search result metadata
            return state.merge({
                page: action.meta.page,
                total: action.meta.total
            });
        case 'SET_SEARCH_INFLIGHT':
            return state.merge({
                inFlight: action.inFlight
            });
        case 'SET_SEARCH_TABLE_TYPE':
            return state.merge({
                tableType: action.tableType
            });
        case 'SET_SEARCH_RESULT_PAGE_NUMBER':
            return state.mergeDeep({
                page: {
                    page_number: action.pageNumber
                }
            });
        case 'SET_VIZ_TXN_SUM':
            return state.mergeDeep({
                visualization: {
                    transaction_sum: action.sum
                }
            });
        default:
            return state;
    }
};

export default resultsMetaReducer;
