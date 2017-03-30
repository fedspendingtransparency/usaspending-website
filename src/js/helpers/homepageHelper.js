/**
 * homepageHelper.js
 * Created by Emily Gullo 03/28/2017
 */

 /* eslint-disable import/prefer-default-export */
 // We only have one export but want to maintain consistency with other helpers
import Axios, { CancelToken } from 'axios';

export const fetchFile = (file) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: file,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
/* eslint-enable import/prefer-default-export */
