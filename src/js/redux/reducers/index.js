/**
 * index.js
 * Created by Kevin Li 11/1/16
 **/

import { combineReducers } from 'redux';

import resultsMetaReducer from './resultsMeta/resultsMetaReducer';
import resultsBatchReducer from './resultsMeta/resultsBatchReducer';
import filtersReducer from './search/searchFiltersReducer';
import orderReducer from './search/searchOrderReducer';
import autocompleteReducer from './search/autocompleteReducer';
import recordReducer from './records/recordReducer';
import agencyAwardingReducer from './search/agencyAwardingReducer';
import agencyFundingReducer from './search/agencyFundingReducer';

const appReducer = combineReducers({
    resultsMeta: resultsMetaReducer,
    resultsBatch: resultsBatchReducer,
    filters: filtersReducer,
    searchOrder: orderReducer,
    autocompleteLocations: autocompleteReducer,
    autocompleteAwardingAgencies: agencyAwardingReducer,
    autocompleteFundingAgencies: agencyFundingReducer,
    records: recordReducer
});

export default appReducer;
