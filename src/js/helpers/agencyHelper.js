/**
 * agencyHelper.js
 * Created by Kevin Li 6/8/17
 */

import { apiRequest } from './apiRequest';

export const fetchAgencyOverview = (id) => apiRequest({
    url: `v2/references/agency/${id}/`
});

// Get major object classes
export const fetchAgencyMajorObjectClasses = (params) => apiRequest({
    url: 'v2/financial_spending/major_object_class/',
    params
});

// Get minor object classes
export const fetchAgencyMinorObjectClasses = (params) => apiRequest({
    url: 'v2/financial_spending/object_class/',
    params
});

// get federal accounts
export const fetchAgencyFederalAccounts = (params) => apiRequest({
    url: 'v2/federal_obligations/',
    params
});

// get recipients
export const fetchAwardRecipients = (params) => apiRequest({
    url: 'v2/award_spending/recipient/',
    params
});

// Get Obligated Amount and Budget Authority Amount
export const fetchAgencyObligatedAmounts = (params) => apiRequest({
    url: `v2/financial_balances/agencies/`,
    params
});

export const fetchSpendingCount = (agencyId, fy, type) => apiRequest({
    url: `v2/agency/${agencyId}/${type}/count/`,
    params: {
        fiscal_year: parseInt(fy, 10)
    }
});

export const fetchSpendingByCategory = (agencyId, fy, type) => apiRequest({
    url: `v2/agency/${agencyId}/${type}/`,
    params: {
        fiscal_year: parseInt(fy, 10)
    }
});
