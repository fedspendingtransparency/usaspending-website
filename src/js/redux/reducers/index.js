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
import explorerReducer from './explorer/explorerReducer';
import glossaryReducer from './glossary/glossaryReducer';
import agencyLandingReducer from './agencyLanding/agencyLandingReducer';
import recipientReducer from './recipient/recipientReducer';
import downloadReducer from './search/downloadReducer';
import bulkDownloadReducer from './bulkDownload/bulkDownloadReducer';
import modalReducer from './modal/modalReducer';
import stateReducer from './state/stateReducer';
import searchSubAwardTableReducer from './search/searchSubAwardTableReducer';
import naicsReducer from './search/naicsReducer';
import tasReducer from './search/tasReducer';
import pscReducer from './search/pscReducer';
import mapLegendToggleReducer from './search/mapLegendToggleReducer';
import agencyReducer from './agency/agencyReducer';
import covid19Reducer from './covid19/covid19Reducer';
import aboutTheDataReducer from './aboutTheData';
import googleAnalyticsReducer from './googleAnalytics/googleAnalyticsReducer';
import aboutTheDataSidebarReducer from './aboutTheDataSidebar/aboutTheDataReducer';
import slideoutReducer from './slideouts/slideoutReducer';
import titleBarFilterReducer from './search/titleBarFilterReducer';

const appReducer = combineReducers({
    filters: filtersReducer,
    appliedFilters: appliedFiltersReducer,
    searchView: searchViewReducer,
    titleBarFilter: titleBarFilterReducer,
    download: downloadReducer,
    award: awardReducer,
    account: accountReducer,
    glossary: glossaryReducer,
    agencyLanding: agencyLandingReducer,
    recipient: recipientReducer,
    explorer: explorerReducer,
    bulkDownload: bulkDownloadReducer,
    modal: modalReducer,
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
    agency: agencyReducer,
    covid19: covid19Reducer,
    aboutTheData: aboutTheDataReducer,
    googleAnalytics: googleAnalyticsReducer,
    aboutTheDataSidebar: aboutTheDataSidebarReducer,
    slideouts: slideoutReducer
});

export default appReducer;
