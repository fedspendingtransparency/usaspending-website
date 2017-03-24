/**
 * accountHelper.js
 * Created by Kevin Li 3/24/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchFederalAccount = (id) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `federal_accounts/${id}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchTASCategoryTotals = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: '/tas/categories/total/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: data,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// export const fetchAccountBalances = (id) => {
    // const fields = {
    //     outlay: 'gross_outlay_amount_by_tas_cpe',
    //     budgetAuthority: 'budget_authority_available_amount_total_cpe',
    //     obligated: 'obligations_incurred_total_by_tas_cpe',
    //     unobligated: 'unobligated_balance_cpe'
    // };

    // const types = [];
    // Object.keys(fields).forEach((key) => {
    //     types.push(key);

    //     const query = {
    //         field: fields[key],
    //         group: 
    //     };
    // });

    // return {
    //     types: types,
    //     promises: 
    // }
// }
