/**
 * index.js
 * Created by Kevin Li 11/1/16
 **/

import { combineReducers } from 'redux';

import resultsMetaReducer from './search/searchResultsReducer';
import filtersReducer from './search/searchFiltersReducer';
import recordReducer from './records/recordReducer';

const appReducer = combineReducers({
    resultsMeta: resultsMetaReducer,
    filters: filtersReducer,
    records: recordReducer
});

export default appReducer;
