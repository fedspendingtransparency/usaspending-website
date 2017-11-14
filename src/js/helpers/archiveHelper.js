/**
 * archiveHelper.js
 * Created by Kevin Li 11/13/17
 */

import Axios, { CancelToken } from 'axios';

export const fetchArchiveURLs = () => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `data/archive.json`,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
