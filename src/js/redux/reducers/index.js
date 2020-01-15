/**
 * index.js
 * Created by Kevin Li 11/1/16
 **/

import { combineReducers } from 'redux';

import filtersReducer from './search/searchFiltersReducer';
import appliedFiltersReducer from './search/appliedFiltersReducer';
import searchViewReducer from './search/searchViewReducer';
import awardReducer from './award/awardReducer';
import accountReducer from './account/accountReducer';
import agencyReducer from './agency/agencyReducer';
import explorerReducer from './explorer/explorerReducer';
import glossaryReducer from './glossary/glossaryReducer';
import agencyLandingReducer from './agencyLanding/agencyLandingReducer';
import recipientReducer from './recipient/recipientReducer';
import downloadReducer from './search/downloadReducer';
import bulkDownloadReducer from './bulkDownload/bulkDownloadReducer';
import redirectModalReducer from './redirectModal/redirectModalReducer';
import stateReducer from './state/stateReducer';
import searchSubAwardTableReducer from './search/searchSubAwardTableReducer';
import { naicsReducer } from './search/naicsReducer/naicsReducer';

const appReducer = combineReducers({
    filters: filtersReducer,
    appliedFilters: appliedFiltersReducer,
    searchView: searchViewReducer,
    download: downloadReducer,
    award: awardReducer,
    account: accountReducer,
    agency: agencyReducer,
    glossary: glossaryReducer,
    agencyLanding: agencyLandingReducer,
    recipient: recipientReducer,
    explorer: explorerReducer,
    bulkDownload: bulkDownloadReducer,
    redirectModal: redirectModalReducer,
    stateProfile: stateReducer,
    searchSubAwardTable: searchSubAwardTableReducer,
    naics: naicsReducer
});

export default appReducer;
