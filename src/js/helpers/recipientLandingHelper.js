/**
 * recipientLandingHelper.js
 * Created by David Trinh 7/3/18
 **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

export const fetchAllRecipients = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/recipient/duns/',
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
