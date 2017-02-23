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

export const setSearchPageNumber = (state) => ({
    type: 'SET_SEARCH_RESULT_PAGE_NUMBER',
    pageNumber: state
});

export const setVizTxnSum = (state) => ({
    type: 'SET_VIZ_TXN_SUM',
    sum: state
});
