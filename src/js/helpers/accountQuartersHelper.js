/**
 * accountQuartersHelper.js
 * Created by Lizzie Salita 4/04/17
 */

import { apiRequest } from './apiRequest';

export const fetchTasCategoryTotals = (data) => apiRequest({
    url: 'v1/tas/categories/quarters/total/',
    method: 'post',
    data
});

export const fetchTasBalanceTotals = (data) => apiRequest({
    url: 'v1/tas/balances/quarters/total/',
    method: 'post',
    data
});
