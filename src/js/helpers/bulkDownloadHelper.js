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
            name: 'Data Labels',
            colspan: 2
        },
        {
            name: 'Data Attributes',
            colspan: 2
        },
        {
            name: 'Broker',
            colspan: 2
        },
        {
            name: 'Data Store',
            colspan: 3
        },
        {
            name: 'USAspending API',
            colspan: 2
        },
        {
            name: 'USAspending Download',
            colspan: 4
        },
        {
            name: 'Legacy USAspending',
            colspan: 2
        }
    ],
    columns: [
        'Data Element Label',
        'Definition',
        'Data Type',
        'Max Character Length',
        'Table',
        'Element',
        'Model',
        'Class/Table',
        'Element',
        'Endpoint URL',
        'Element',
        'Award File',
        'Award Element',
        'Sub-award File',
        'Sub-award Element',
        'Award Element',
        'Sub-award Element'
    ],
    rows: [
        // Data Labels
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        // Data Attributes
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        // Broker
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        // Data Store
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit', 'Sed purus purus'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit', 'Sed purus purus'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit', 'Sed purus purus'],
        // API
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        // Download
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit', 'Sed purus purus', 'dignissim nec pharetra vitae'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit', 'Sed purus purus', 'dignissim nec pharetra vitae'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit', 'Sed purus purus', 'dignissim nec pharetra vitae'],
        // Legacy
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit'],
        ['Lorem ipsum', 'dolor sit amet, consectetur adipiscing elit']
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
