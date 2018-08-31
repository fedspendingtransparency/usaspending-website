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
            url: `v1/federal_accounts/`,
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

const mockData = {
    sections: [
        {
            sectionName: 'Data Labels',
            columns: [
                {
                    columnName: 'Data Element Label',
                    cells: [
                        {
                            value: 'Lorem ipsum',
                            subaward_term: false
                        },
                        {
                            value: 'dolor sit amet',
                            subaward_term: true
                        }
                    ]
                },
                {
                    columnName: 'Definition',
                    cells: [
                        {
                            value: 'Lorem ipsum',
                            subaward_term: false
                        },
                        {
                            value: 'dolor sit amet',
                            subaward_term: true
                        }
                    ]
                }
            ]
        },
        {
            sectionName: 'Data Attributes',
            columns: [
                {
                    columnName: 'Data Type',
                    cells: [
                        {
                            value: 'Lorem ipsum',
                            subaward_term: false
                        },
                        {
                            value: 'dolor sit amet',
                            subaward_term: true
                        }
                    ]
                },
                {
                    columnName: 'Max Character Length',
                    cells: [
                        {
                            value: 'Lorem ipsum',
                            subaward_term: false
                        },
                        {
                            value: 'dolor sit amet',
                            subaward_term: true
                        }
                    ]
                }
            ]
        }
    ]
};

export const requestDictionaryContent = () => {
    const source = CancelToken.source();
    return {
        promise: new Promise((resolve) => {
            window.setTimeout(() => {
                resolve({
                    data: mockData
                });
            }, 500);
        }),
        cancel() {
            source.cancel();
        }
    };
};
