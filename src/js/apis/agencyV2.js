/**
 * agencyV2.js
 * Created by Lizzie Salita 5/26/20
 */

import { apiRequest } from '../helpers/apiRequest';

export const fetchSpendingCount = (agencyId, fy, type) => apiRequest({
    url: `v2/agency/${agencyId}/${type}/count/`,
    params: {
        fiscal_year: parseInt(fy, 10)
    }
});

export const fetchSpendingByCategory = (agencyId, type, params) => apiRequest({
    url: `v2/agency/${agencyId}/${type}/`,
    params
});

export const fetchBudgetaryResources = (agencyId) => apiRequest({
    url: `v2/agency/${agencyId}/budgetary_resources`
});

export const fetchAgencyOverview = (code, fy) => apiRequest({
    url: `v2/agency/${code}/${fy ? `?fiscal_year=${fy}` : ''}`
});
