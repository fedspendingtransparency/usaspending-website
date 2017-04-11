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
import awardIDReducer from './search/awardIDReducer';
import budgetCategoryReducer from './search/budgetCategoryReducer';
import awardReducer from './award/awardReducer';
import accountReducer from './account/accountReducer';

const appReducer = combineReducers({
    resultsMeta: resultsMetaReducer,
    resultsBatch: resultsBatchReducer,
    filters: filtersReducer,
    searchOrder: orderReducer,
    autocompleteLocations: autocompleteReducer,
    autocompleteAwardIDs: awardIDReducer,
    autocompleteAgencies: agencyReducer,
    autocompleteRecipients: recipientReducer,
    records: recordReducer,
    award: awardReducer,
    autocompleteBudgetCategories: budgetCategoryReducer,
    account: accountReducer
});

export default appReducer;
