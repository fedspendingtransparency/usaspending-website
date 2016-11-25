/**
 * searchResultsReducer.js
 * Created by Kevin Li 11/1/16
 **/

const initialState = {
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
    tableType: 'contracts'
};

const searchResultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULT_META':
            // set the search result metadata
            return Object.assign({}, state, action.meta);
        case 'SET_SEARCH_TABLE_TYPE':
            return Object.assign({}, state, {
                tableType: action.tableType
            });
        default:
            return state;
    }
};

export default searchResultsReducer;
