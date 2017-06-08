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
import columnVisibilityReducer from './search/columnVisibilityReducer';
import recordReducer from './records/recordReducer';
import autocompleteAgencyReducer from './search/agencyReducer';
import recipientReducer from './search/recipientReducer';
import awardIDReducer from './search/awardIDReducer';
import budgetCategoryReducer from './search/budgetCategoryReducer';
import awardReducer from './award/awardReducer';
import accountReducer from './account/accountReducer';
import agencyReducer from './agency/agencyReducer';
import guideReducer from './guide/guideReducer';

const appReducer = combineReducers({
    resultsMeta: resultsMetaReducer,
    resultsBatch: resultsBatchReducer,
    filters: filtersReducer,
    searchOrder: orderReducer,
    autocompleteLocations: autocompleteReducer,
    columnVisibility: columnVisibilityReducer,
    autocompleteAwardIDs: awardIDReducer,
    autocompleteAgencies: autocompleteAgencyReducer,
    autocompleteRecipients: recipientReducer,
    records: recordReducer,
    award: awardReducer,
    autocompleteBudgetCategories: budgetCategoryReducer,
    account: accountReducer,
    agency: agencyReducer,
    guide: guideReducer
});

export default appReducer;
