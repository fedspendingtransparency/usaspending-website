/**
  * resultsMetaActions.js
  * Created by Kevin Li 11/1/16
  **/

export const setSearchResultMeta = (state) => ({
    type: 'SET_SEARCH_RESULT_META',
    meta: state
});

export const setSearchTableType = (state) => ({
    type: 'SET_SEARCH_TABLE_TYPE',
    tableType: state
});

export const setSearchInFlight = (state) => ({
    type: 'SET_SEARCH_INFLIGHT',
    inFlight: state
});
