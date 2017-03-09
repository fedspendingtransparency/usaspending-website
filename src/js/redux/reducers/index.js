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
import agencyReducer from './search/agencyReducer';
import recipientReducer from './search/recipientReducer';
import awardReducer from './award/awardReducer';
import awardIDReducer from './search/awardIDReducer';

const appReducer = combineReducers({
    resultsMeta: resultsMetaReducer,
    resultsBatch: resultsBatchReducer,
    filters: filtersReducer,
    searchOrder: orderReducer,
    autocompleteLocations: autocompleteReducer,
    records: recordReducer,
    autocompleteAgencies: agencyReducer,
    autocompleteRecipients: recipientReducer,
    award: awardReducer,
    autocompleteAwardIDs: awardIDReducer
});

export default appReducer;
