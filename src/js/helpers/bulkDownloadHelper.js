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

// TODO - Lizzie: update when API is ready

//export const requestBulkDownload = (params, type) => {
//    const source = CancelToken.source();
//    return {
//        promise: Axios.request({
//            url: `v2/bulk_download/${type}/`,
//            baseURL: kGlobalConstants.API,
//            method: 'post',
//            data: params,
//            cancelToken: source.token
//        }),
//        cancel() {
//            source.cancel();
//        }
//    };
//};

const mockResponse = {
    "status":"ready",
    "total_rows":null,
    "file_name":"file_name.zip",
    "total_size":null,
    "total_columns":null,
    "message":null,
    "url":"https://api.usaspending.gov/downloads/file_name.zip",
    "seconds_elapsed":null
};

export const requestBulkDownload = () => (
    {
        promise: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: mockResponse
                });
            }, 1000);
        })
    }
);

//export const requestBulkDownloadStatus = (params) => {
//    const source = CancelToken.source();
//    return {
//        promise: Axios.request({
//            url: 'v2/bulk_download/status/',
//            baseURL: kGlobalConstants.API,
//            method: 'get',
//            params,
//            cancelToken: source.token
//        }),
//        cancel() {
//            source.cancel();
//        }
//    };
//};

const mockStatus = {
    "status":"running",
    "total_rows":300,
    "file_name":"file_name.zip",
    "total_size":3000.475,
    "total_columns":10,
    "message":null,
    "url":"https://api.usaspending.gov/downloads/file_name.zip",
    "seconds_elapsed":"0.438393"
};

export const requestBulkDownloadStatus = () => (
    {
        promise: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: mockStatus
                });
            }, 1000);
        })
    }
);

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
