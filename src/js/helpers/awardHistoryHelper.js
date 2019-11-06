/**
  * awardHistoryHelper.js
  * Created by Max Kendall 09/18/19
  **/

/* eslint-disable import/prefer-default-export */
import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

// Get federal accounts
export const fetchFederalAccountFunding = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/funding/',
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

export const getAwardHistoryFederalAccountsIdv = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/idvs/count/federal_account/${awardId}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};


/**
 * @param type: oneOf(['subaward', 'transaction', 'federal_account'])
 */
export const getAwardHistoryCounts = (type, awardId, isIdv = false) => {
    const source = CancelToken.source();
    const parsedAwardId = encodeURI(awardId);
    if (type === 'federal_account' && isIdv) return getAwardHistoryFederalAccountsIdv(parsedAwardId);
    return {
        promise: Axios.request({
            url: `v2/awards/count/${type}/${parsedAwardId}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
