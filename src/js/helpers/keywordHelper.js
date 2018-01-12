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

// TODO - Lizzie: update when API is ready
// export const performKeywordSearch = (params) => {
//    const source = CancelToken.source();
//    return {
//        promise: Axios.request({
//            url: 'v2/search/spending_by_transaction/',
//            baseURL: kGlobalConstants.API,
//            method: 'post',
//            data: params,
//            cancelToken: source.token
//        }),
//        cancel() {
//            source.cancel();
//        }
//    };
// };

const mockResponse = {
    limit: 30,
    page_metadata: {
        page: 1,
        hasNext: false
    },
    results: [
        {
            internal_id: 1,
            'Award ID': 'ABC123',
            'Recipient Name': 'Blerg',
            'Action Date': '2011-12-31',
            'Transaction Amount': '123.45',
            'Award Type': 'Definitive Contract',
            'Awarding Agency': 'Department of Sandwiches',
            'Awarding Sub Agency': 'Office of Subs',
            Mod: '2'
        },
        {
            internal_id: 4,
            'Award ID': 'XYZ123',
            'Recipient Name': 'Mock Recipient 2',
            'Action Date': '1987-9-31',
            'Transaction Amount': '200',
            'Award Type': 'Definitive Contract',
            'Awarding Agency': 'Mock Agency',
            'Awarding Sub Agency': 'Mock Office',
            Mod: '5'
        },
        {
            internal_id: 7,
            'Award ID': 'DEF123',
            'Recipient Name': 'Mock Recipient 3',
            'Action Date': '1987-10-31',
            'Transaction Amount': '300',
            'Award Type': 'Definitive Contract',
            'Awarding Agency': 'Mock Agency 3',
            'Awarding Sub Agency': 'Mock Office 3',
            Mod: '8'
        }
    ]
};

export const performKeywordSearch = () => (
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
