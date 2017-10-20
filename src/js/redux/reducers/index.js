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
import awardReducer from './award/awardReducer';
import accountReducer from './account/accountReducer';
import agencyReducer from './agency/agencyReducer';
import explorerReducer from './explorer/explorerReducer';
import glossaryReducer from './glossary/glossaryReducer';
import agencyLandingReducer from './agencyLanding/agencyLandingReducer';
import cfdaReducer from './search/cfdaReducer';
import naicsReducer from './search/naicsReducer';
import pscReducer from './search/pscReducer';
import downloadReducer from './search/downloadReducer';

const appReducer = combineReducers({
    resultsMeta: resultsMetaReducer,
    resultsBatch: resultsBatchReducer,
    filters: filtersReducer,
    searchOrder: orderReducer,
    autocompleteLocations: autocompleteReducer,
    autocompleteCFDA: cfdaReducer,
    autocompleteNAICS: naicsReducer,
    autocompletePSC: pscReducer,
    columnVisibility: columnVisibilityReducer,
    autocompleteAwardIDs: awardIDReducer,
    autocompleteAgencies: autocompleteAgencyReducer,
    autocompleteRecipients: recipientReducer,
    records: recordReducer,
    download: downloadReducer,
    award: awardReducer,
    account: accountReducer,
    agency: agencyReducer,
    glossary: glossaryReducer,
    agencyLanding: agencyLandingReducer,
    explorer: explorerReducer
});

export default appReducer;
