/**
 * apiRequest.js
 * Created by Jonathan Hill 12/11/19
 **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

const mockUrl = `http://localhost:5000/api/`;
const localUrl = `http://localhost:8000/api/`;

const getBaseUrl = (params) => {
    if (params.isMocked) return mockUrl;
    if (params.isLocal) return localUrl;
    return kGlobalConstants.API;
};

// eslint-disable-next-line import/prefer-default-export
export const apiRequest = (axiosParams = {}) => {
    const defaultHeaders = { 'X-Requested-With': 'USASpendingFrontend' };
    const cancelToken = CancelToken.source();
    const defaultParams = {
        baseURL: getBaseUrl(axiosParams),
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
        if (parameters.data) {
            if (parameters.data.award_id) {
                parameters.data.award_id = decodeURIComponent(options.data.award_id);
            }
        }
        return parameters;
    };

    const cancel = () => cancelToken.cancel();
    // method to run before executing the request
    // e.g. additional pagination, setting state
    const before = () => {};
    // method to run after executing the request
    // e.g. manipulating the data, setting state
    const after = (response) => response;
    // runs the flow of before -> request -> after
    const request = async (parameters) => {
        const newRequest = Axios.request(parameters);
        try {
            before();
            const response = await newRequest;
            return after(response);
        }
        catch (e) {
            cancel();
            throw new Error(e);
        }
    };
    // execute the request
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
