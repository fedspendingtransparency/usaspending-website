/**
 * bulkDownloadHelper.js
 * Created by Lizzie Salita 11/1/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const requestAgenciesList = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/bulk_download/list_agencies/`,
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestFederalAccountList = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/federal_accounts/`,
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestBudgetFunctionList = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/budget_functions/list_budget_functions/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestBudgetSubfunctionList = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/budget_functions/list_budget_subfunctions/`,
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestAwardsDownload = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/bulk_download/awards/`,
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestAccountsDownload = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/download/accounts/`,
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestBulkDownloadStatus = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/bulk_download/status/',
            baseURL: kGlobalConstants.API,
            method: 'get',
            params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestArchiveFiles = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/bulk_download/list_monthly_files/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestDictionaryContent = () => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/references/data_dictionary/',
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
