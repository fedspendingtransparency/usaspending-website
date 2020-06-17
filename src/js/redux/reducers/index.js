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
import naicsReducer from './search/naicsReducer';
import tasReducer from './search/tasReducer';
import pscReducer from './search/pscReducer';
import mapLegendToggleReducer from './search/mapLegendToggleReducer';
import agencyV2Reducer from './agencyV2/agencyV2Reducer';
import covid19Reducer from './covid19/covid19Reducer';

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
    // tas/naics/psc filters are outside of redux.filter keyspace b/c
    // the expand/collapse of this filter is required to load
    // the tree & it cannot populated the correct user selections without the data.
    // Nesting it inside filters would be a bad idea.
    naics: naicsReducer,
    tas: tasReducer,
    psc: pscReducer,
    searchMapLegendToggle: mapLegendToggleReducer,
    agencyV2: agencyV2Reducer,
    covid19: covid19Reducer
});

export default appReducer;
