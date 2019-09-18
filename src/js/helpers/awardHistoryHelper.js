/* eslint-disable import/prefer-default-export */
import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

// Get federal accounts
export const fetchFederalAccountFunding = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/funding/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: { award_id: awardId },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
