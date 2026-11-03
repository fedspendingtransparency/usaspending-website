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
