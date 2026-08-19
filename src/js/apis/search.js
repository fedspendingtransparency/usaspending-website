/**
 * search.js
 * Created by Andrea Blackwell 12/14/2023
 */

import { apiRequest } from '../helpers/apiRequest';

export const performSpendingByGeographySearch = (params) => apiRequest({
    url: 'v2/search/spending_by_geography/',
    method: 'post',
    data: params
});

export const nlSearch = (params) => {

    apiRequest({
        url: 'v2/llm/filter-search/',
        method: 'post',
        data: params
    });

    apiRequest.headers = ({"X-LLM-API-Key":"eae262ce-9ff8-416c-8965-84fdbb9034bf"});

    return apiRequest;
};
