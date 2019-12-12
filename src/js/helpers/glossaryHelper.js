/**
  * glossaryHelper.js
  * Created by Kevin Li 5/3/17
  **/

import { apiRequest } from './apiRequest';

// perform search is a cancellable promise
export const fetchAllTerms = () => apiRequest({
    url: 'v2/references/glossary/?limit=500',
});

export const fetchSearchResults = (params) => apiRequest({
    url: 'v2/autocomplete/glossary/',
    method: 'post',
    data: params
});
