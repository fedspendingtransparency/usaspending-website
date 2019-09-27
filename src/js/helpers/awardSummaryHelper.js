/**
 * awardSummaryHelper.js
 * Created by Lizzie Salita 8/16/19
**/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

export const fetchAwardFundingSummary = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/funding_rollup/',
            baseURL: kGlobalConstants.API,
            method: "post",
            data: { award_id: awardId },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAwardFederalAccounts = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/accounts/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
