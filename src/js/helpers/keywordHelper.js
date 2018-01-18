/**
 * keywordHelper.js
 * Created by Lizzie Salita 1/5/17
 **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchSummary = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/search/transaction_spending_summary/',
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

export const performKeywordSearch = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/search/spending_by_transaction/',
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

const mockResponse = {
    results: {
        contracts: 200,
        grants: 74,
        direct_payments: 28,
        loans: 621,
        other: 17
    }
};

export const performTabCountSearch = () => (
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
