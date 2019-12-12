/**
 * apiRequest.js
 * Created by Jonathan Hill 12/11/19
 **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

// eslint-disable-next-line import/prefer-default-export
export const apiRequest = (axiosParams = {}) => {
    const defaultHeaders = { 'X-Requested-With': 'USASpendingFrontend' };
    const cancelToken = CancelToken.source();
    const defaultParams = {
        baseURL: kGlobalConstants.API,
        cancelToken: cancelToken.token
    };

    const headers = (additionalHeaders) => {
        if (additionalHeaders) return { ...defaultHeaders, ...additionalHeaders };
        return defaultHeaders;
    };

    const params = (options = {}) => {
        const parameters = { ...defaultParams };
        Object.assign(parameters, options);
        parameters.headers = headers(options.headers);
        return parameters;
    };

    const cancel = () => cancelToken.cancel();

    const before = () => {};

    const after = () => {};

    const request = async (parameters) => {
        const newRequest = Axios.request(parameters);
        try {
            before();
            const response = await newRequest;
            after();
            return response;
        }
        catch (e) {
            cancel();
            throw new Error(e);
        }
    };

    const execute = async () => request(params(axiosParams));

    const promise = Axios.request(params(axiosParams));

    return {
        promise,
        execute,
        cancel,
        before,
        after,
        headers,
        params
    };
};

