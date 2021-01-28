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

export const getNewUrlForGlossary = (pathname, url, queryParams = '') => {
    if (pathname === '/' && !queryParams) return url;
    if (pathname[pathname.length - 1] === '/' && !queryParams) {
        return `${pathname.substr(0, pathname.length - 1)}${url}`;
    }
    if (queryParams && pathname[pathname.length - 1] === '/') {
        const cleanQueryParams = queryParams[0] === '?'
            ? queryParams.substr(1)
            : queryParams;
        return `${pathname.substr(0, pathname.length - 1)}${url}&${cleanQueryParams}`;
    }
    return `${pathname}${url}`;
};
