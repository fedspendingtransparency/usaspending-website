/**
 * recipientHelper.js
 * Created by Lizzie Salita 6/14/18
 */

import { apiRequest } from "./apiRequest";

export const fetchRecipientOverview = (id, year) => apiRequest({
    url: `v2/recipient/duns/${id}/`,
    params: { year }
});

export const fetchChildRecipients = (duns, year) => apiRequest({
    url: `v2/recipient/children/${duns}/`,
    params: { year }
});

export const fetchNewAwardCounts = (params) => apiRequest({
    url: 'v2/search/new_awards_over_time/',
    method: 'post',
    data: params
});
