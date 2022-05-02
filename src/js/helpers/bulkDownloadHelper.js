/**
 * bulkDownloadHelper.js
 * Created by Lizzie Salita 11/1/17
 */

import { apiRequest } from './apiRequest';

export const requestAgenciesList = (params) => apiRequest({
    url: 'v2/bulk_download/list_agencies/',
    method: 'post',
    data: params
});

export const requestFederalAccountList = (agencyCode, page = 1) => apiRequest({
    url: 'v2/federal_accounts/',
    method: 'post',
    data: {
        filters: {
            agency_identifier: agencyCode
        },
        limit: 100,
        page
    }
});

export const requestBudgetFunctionList = (params) => apiRequest({
    url: 'v2/budget_functions/list_budget_functions/',
    data: params
});

export const requestBudgetSubfunctionList = (params) => apiRequest({
    url: 'v2/budget_functions/list_budget_subfunctions/',
    method: 'post',
    data: params
});

export const requestAwardsDownload = (params) => apiRequest({
    url: 'v2/bulk_download/awards/',
    method: 'post',
    data: params
});

export const requestAccountsDownload = (params) => apiRequest({
    url: 'v2/download/accounts/',
    method: 'post',
    data: params
});

export const requestBulkDownloadStatus = (params) => apiRequest({
    url: 'v2/bulk_download/status/',
    params
});

export const requestArchiveFiles = (params) => apiRequest({
    url: 'v2/bulk_download/list_monthly_files/',
    method: 'post',
    data: params
});

export const areDefCodesDisabled = (accountDownloadSubmissionTypeSelections) => (
    accountDownloadSubmissionTypeSelections?.length === 1 &&
    accountDownloadSubmissionTypeSelections?.includes('accountBalances')
);
