import { useLocation } from 'react-router-dom';

export const useQueryParams = () => Object.fromEntries(new URLSearchParams(useLocation().search));

export const combineQueryParams = (existingParams, newParams) => Object
    .entries(newParams)
    .filter(([, value]) => value !== '' && value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), existingParams);

export const getQueryParamString = (obj) => `?${new URLSearchParams(obj).toString()}`;

/**
 * remove unrecognized URL parameters; update the history
 * @param {string} queryString current URL query string to be processed (first char assumed to be "?")
 * @param {string[]} allowedParams array of parameter names that are recognized (remove all others)
 *
 * returns same querystring with parameters not in allowedParams removed
 */
export const stripUrlParams = (queryString, allowedParams) => {
    if (queryString.length < 2) {
        return queryString;
    }
    const queryParams = queryString.slice(1).split('&');
    const allowedQuery = queryParams.filter((i) => allowedParams.includes(i.slice(0, i.indexOf('='))));
    return `?${allowedQuery.join('&')}`;
};
