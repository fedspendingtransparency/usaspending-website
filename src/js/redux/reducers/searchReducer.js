/**
 * searchReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { combineReducers } from 'redux';

import searchResultsReducer from './search/searchResultsReducer';
import searchFiltersReducer from './search/searchFiltersReducer';

const searchReducer = combineReducers({
    resultsMeta: searchResultsReducer,
    filters: searchFiltersReducer
});

export default searchReducer;
