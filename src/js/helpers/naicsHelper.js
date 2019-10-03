/**
  * naicsHelper.js
  * Created by Jonathan Hill 10/03/2019
  **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

// perform search is a cancellable promise
export const naicsRequest = (param) => {
    const source = CancelToken.source();
    const url = param ?
        `v2/references/naics/${param}` :
        'v2/references/naics/';
    return {
        promise: Axios.request({
            url,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
