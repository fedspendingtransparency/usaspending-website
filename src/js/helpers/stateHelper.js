/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */

import Axios, { CancelToken } from "axios/index";
import kGlobalConstants from 'GlobalConstants';

export const fetchStateOverview = (id, year) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/recipient/state/${id}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            params: {
                year
            },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

const mockBreakdown = {
    results: [
        {
            type: 'contracts',
            count: 50,
            amount: 500.25
        },
        {
            type: 'grants',
            count: 20,
            amount: 200.15
        },
        {
            type: 'direct_payments',
            count: 5,
            amount: 50.50
        },
        {
            type: 'loans',
            count: 15,
            amount: 150.05
        },
        {
            type: 'other',
            count: 10,
            amount: 100.00
        }
    ]
};

export const fetchAwardBreakdown = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockBreakdown
                });
            });
        })
    }
);
