/**
 * recipientHelper.js
 * Created by Lizzie Salita 6/14/18
 */

import Axios, { CancelToken } from "axios/index";
import kGlobalConstants from 'GlobalConstants';

export const fetchRecipientOverview = (id, year) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/recipient/duns/${id}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            params: {
                year
            },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchChildRecipients = (duns, year) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/recipient/children/${duns}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            params: {
                year
            },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
