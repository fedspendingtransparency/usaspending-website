/**
  * idvHelper.js
  * Created by Lizzie Salita 2/14/19
  **/

import { apiRequest } from "./apiRequest";

export const fetchReferencedAwards = (params) => apiRequest({
    url: 'v2/idvs/awards/',
    method: 'post',
    data: params
});

export const fetchReferencedAwardsCounts = (params) => apiRequest({
    url: 'v2/awards/idvs/awards/count/',
    method: 'post',
    data: params
});

export const fetchAwardAmounts = (awardId) => apiRequest({
    url: `v2/idvs/amounts/${awardId}/`
});

// Fetch IDV Award Federal Account Funding Data
export const fetchAwardFedAccountFunding = (params) => apiRequest({
    url: 'v2/idvs/funding/',
    method: 'post',
    data: params
});

export const fetchIdvFundingSummary = (awardId) => apiRequest({
    url: 'v2/idvs/funding_rollup/',
    method: 'post',
    data: { award_id: awardId }
});

export const fetchIdvDownloadFile = (awardId) => apiRequest({
    url: 'v2/download/idv/',
    method: 'post',
    headers: {
        "content-type": "application/json"
    },
    data: { award_id: awardId }
});

export const fetchIdvFederalAccounts = (data) => apiRequest({
    url: 'v2/idvs/accounts/',
    method: 'post',
    data
});

export const fetchIdvActivity = (data) => apiRequest({
    url: 'v2/idvs/activity/',
    method: 'post',
    data
});

export const getAllNetPositiveIdvFileCDefCodes = (parentIdv, childIdv) => {
    if (childIdv) {
        return childIdv
            .child_file_c
            .filter(({ amount }) => amount !== 0)
            .map(({ code }) => code)
            .reduce((arr, item) => ([...new Set(arr.concat([item]))]), [...parentIdv.defCodes]);
    }
    return [];
};

export const getChildAwardFileCDetails = (data) => data
    .child_account_obligations_by_defc
    .concat(data.child_account_outlays_by_defc)
    .concat(data.grandchild_account_obligations_by_defc)
    .concat(data.grandchild_account_outlays_by_defc)
    .reduce((arr, item) => ([...new Set(arr.concat(item))]), []);
