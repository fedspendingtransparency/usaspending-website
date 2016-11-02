/**
  * searchResultActions.js
  * Created by Kevin Li 11/1/16
  **/

export const setSearchResults = (state) => ({
    type: 'SET_SEARCH_RESULTS',
    results: state
});

export const resetSearchResults = () => ({
    type: 'RESET_SEARCH_RESULTS'
});
