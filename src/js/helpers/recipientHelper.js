/**
 * recipientHelper.js
 * Created by Lizzie Salita 6/14/18
 */

import { apiRequest } from "./apiRequest";

// ids are uei or duns
export const fetchRecipientOverview = (id, year) => apiRequest({
    url: `v2/recipient/${id}/`,
    params: { year }
});

export const fetchChildRecipients = (id, year) => apiRequest({
    url: `v2/recipient/children/${id}/`,
    params: { year }
});

export const fetchNewAwardCounts = (params) => apiRequest({
    url: 'v2/search/new_awards_over_time/',
    method: 'post',
    data: params
});

export const fetchXRecipients = (limit = 100) => apiRequest({
    url: 'v2/recipient/',
    method: 'post',
    data: {
        page_metadata: {
            limit
        }
    }
});
