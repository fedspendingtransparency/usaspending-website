import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const fetchLocations = (req) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'awards/summary/autocomplete',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: req,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
