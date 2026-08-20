/**
 * search.js
 * Created by Andrea Blackwell 12/14/2023
 */

import { apiRequest } from '../helpers/apiRequest';
import GlobalConstants from "GlobalConstants";

export const performSpendingByGeographySearch = (params) => apiRequest({
    url: 'v2/search/spending_by_geography/',
    method: 'post',
    data: params
});

export const nlSearch = (params) => {
    apiRequest({
        url: 'v2/llm/filter-search/',
        method: 'post',
        data: params,
        headers: GlobalConstants.LLM_HEADER
    });


    return apiRequest;
};
