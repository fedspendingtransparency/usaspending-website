/**
  * searchHelper.js
  * Created by Lizzie Salita 2/14/19
  **/

import Axios, { CancelToken } from 'axios';
import kGlobalConstants from 'GlobalConstants';

export const fetchReferencedAwards = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/awards/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchReferencedAwardsCounts = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/awards/count/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAwardAmounts = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/awards/idvs/amounts/${awardId}/`,
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

// Fetch IDV Award Federal Account Funding Data
export const fetchAwardFedAccountFunding = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/funding/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAwardFundingSummary = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/funding_rollup/',
            baseURL: kGlobalConstants.API,
            method: "post",
            data: { award_id: awardId },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchIdvDownloadFile = (awardId) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/download/idv/',
            baseURL: kGlobalConstants.API,
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: { award_id: awardId },
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const fetchAwardFederalAccounts = (data) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/awards/idvs/accounts/',
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

export const fetchIdvActivity = () => {
    const source = CancelToken.source();
    return {
        promise: new Promise((resolve) => {
            window.setTimeout(() => {
                resolve({
                    data: {
                        results: [{
                            award_id: 69138778,
                            awarding_agency: "DEPARTMENT OF THE INTERIOR (DOI)",
                            awarding_agency_id: 228,
                            generated_unique_award_id: "CONT_AW_1425_4730_INR17PA00008_GS23F0170L",
                            last_date_to_order: "2019-11-30",
                            obligated_amount: 8000.0,
                            awarded_amount: 10000.0,
                            period_of_performance_start_date: "2016-01-14",
                            piid: "INR17PA00008",
                            recipient_name: "Booz Allen Hamilton",
                            recipient_id: "543ee6af-9096-f32a-abaa-834106bead6a-P",
                            grandchild: false
                        }, {
                            award_id: 69054107,
                            awarding_agency: "GENERAL SERVICES ADMINISTRATION (GSA)",
                            awarding_agency_id: 634,
                            generated_unique_award_id: "CONT_AW_4732_4730_GS33FCA001_GS23F0170L",
                            last_date_to_order: "2017-09-30",
                            obligated_amount: 2257.24,
                            awarded_amount: 20000.0,
                            period_of_performance_start_date: "2014-10-01",
                            piid: "GS33FCA001",
                            recipient_name: "Booz Allen Hamilton",
                            recipient_id: "9a277fc5-50fc-685f-0f77-be0d96420a17-C",
                            grandchild: false
                        }, {
                            award_id: 69216438,
                            awarding_agency: "DEPARTMENT OF AGRICULTURE (USDA)",
                            awarding_agency_id: 153,
                            generated_unique_award_id: "CONT_AW_12D2_4730_AG3151B140009_GS23F0170L",
                            last_date_to_order: "2015-04-06",
                            awarded_amount: 12000.0,
                            obligated_amount: 47840.0,
                            period_of_performance_start_date: "2014-04-07",
                            piid: "AG3151B140009",
                            recipient_name: "Booz Allen Hamilton",
                            recipient_id: "9a277fc5-50fc-685f-0f77-be0d96420a17-C",
                            grandchild: true
                        }],
                        page_metadata: {
                            hasNext: true,
                            count: 40,
                            hasPrevious: false,
                            limit: 10,
                            next: 2,
                            page: 1,
                            previous: null,
                            total: 111
                        }
                    }
                }, 500);
            });
        }),
        cancel() {
            source.cancel();
        }
    };
};
