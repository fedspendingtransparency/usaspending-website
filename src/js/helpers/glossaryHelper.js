/**
  * glossaryHelper.js
  * Created by Kevin Li 5/3/17
  **/

import { apiRequest } from './apiRequest';

// perform search is a cancellable promise
export const fetchAllTerms = () => apiRequest({
    url: 'v2/references/glossary/?limit=500'
});

export const fetchSearchResults = (params) => apiRequest({
    url: 'v2/autocomplete/glossary/',
    method: 'post',
    data: params
});

export const getNewUrlForGlossary = (existingUrl, glossaryFragment, existingQueryParams = '') => {
    if (existingUrl === '/' && !existingQueryParams) return glossaryFragment;
    if (existingUrl[existingUrl.length - 1] === '/' && !existingQueryParams) {
        return `${existingUrl.substr(0, existingUrl.length - 1)}${glossaryFragment}`;
    }
    if (existingQueryParams && existingUrl[existingUrl.length - 1] === '/') {
        const cleanQueryParams = existingQueryParams[0] === '?'
            ? existingQueryParams.substr(1)
            : existingQueryParams;
        return `${existingUrl.substr(0, existingUrl.length - 1)}${glossaryFragment}&${cleanQueryParams}`;
    }
    if (existingQueryParams) {
        const cleanQueryParams = existingQueryParams[0] === '?'
            ? existingQueryParams.substr(1)
            : existingQueryParams;
        return `${existingUrl}${glossaryFragment}&${cleanQueryParams}`;
    }
    return `${existingUrl}${glossaryFragment}`;
};
