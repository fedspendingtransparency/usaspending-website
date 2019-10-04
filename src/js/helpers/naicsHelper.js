/**
  * naicsHelper.js
  * Created by Jonathan Hill 10/03/2019
  **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

// perform search is a cancellable promise
export const naicsRequest = (param) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/references/naics/',
            baseURL: kGlobalConstants.API,
            method: 'get',
            param,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
