/**
 * keywordHelper.js
 * Created by Lizzie Salita 1/5/17
 **/

import { apiRequest } from './apiRequest';

export const fetchSummary = (params) => apiRequest({
    url: 'v2/search/transaction_spending_summary/',
    method: 'post',
    data: params
});

export const performKeywordSearch = (params) => apiRequest({
    url: 'v2/search/spending_by_transaction/',
    method: 'post',
    data: params
});

export const performTabCountSearch = (params) => apiRequest({
    url: 'v2/search/spending_by_transaction_count/',
    method: 'post',
    data: params
});
