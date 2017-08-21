/**
 * explorerHelper.js
 * Created by Kevin Li 8/16/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

const mockAgencyRoot = {
    total: 2712837928102,
    results: [
        {
            id: 2,
            type: "agency",
            name: "Second Department Name",
            code: "",
            amount: 580547316613.83
        },
        {
            id: 3,
            type: "agency",
            name: "Third Department or Agency",
            code: "",
            amount: 385222985790.48
        },
        {
            id: 4,
            type: "agency",
            name: "Fourth Thing with a Longer Name and Title",
            code: "",
            amount: 258262170755.31
        },
        {
            id: 5,
            type: "agency",
            name: "Fifth Agency",
            code: "",
            amount: 65379394067.26
        },
        {
            id: 6,
            type: "agency",
            name: "Agency of Sixth Item",
            code: "",
            amount: 229234804924.62
        },
        {
            id: 7,
            type: "agency",
            name: "Agency of Seventh Item",
            code: "",
            amount: 146221964324.70
        },
        {
            id: 8,
            type: "agency",
            name: "Agency of Eighth Item",
            code: "",
            amount: 37844089097.02
        },
        {
            id: 9,
            type: "agency",
            name: "Ninth Agency",
            code: "",
            amount: 163719768960.96
        },
        {
            id: 1,
            type: "agency",
            name: "Department of First Thing",
            code: "",
            amount: 846405433567.82
        }
    ]
};

const mockAgencyAccounts = {
    total: 18819494822,
    results: [
        {
            id: 1,
            type: "federal_account",
            name: "First Federal Account",
            code: "",
            amount: 2766465738.83
        },
        {
            id: 2,
            type: "federal_account",
            name: "Second Federal Account",
            code: "",
            amount: 1618476554.69
        },
        {
            id: 3,
            type: "federal_account",
            name: "Third Federal Account",
            code: "",
            amount: 2766465738.83
        },
        {
            id: 4,
            type: "federal_account",
            name: "Fourth Federal Account",
            code: "",
            amount: 5514111982.85
        },
        {
            id: 5,
            type: "federal_account",
            name: "Fifth Federal Account",
            code: "",
            amount: 959794235.92
        },
        {
            id: 6,
            type: "federal_account",
            name: "Sixth Federal Account",
            code: "",
            amount: 865696761.81
        },
        {
            id: 7,
            type: "federal_account",
            name: "Seventh Federal Account",
            code: "",
            amount: 752779792.88
        },
        {
            id: 8,
            type: "federal_account",
            name: "Eighth Federal Account",
            code: "",
            amount: 3575704016.18
        }
    ]
};

export const fetchBreakdown = (params) => {
    const source = CancelToken.source();
    return {
        promise: new Promise((resolve) => {
            console.log(params);
            setTimeout(() => {
                let data = mockAgencyRoot;

                if (params.type === 'federal_account') {
                    data = mockAgencyAccounts;
                }

                resolve({
                    data
                });
            }, 1500);
        }),
        // promise: Axios.request({
        //     url: 'v2/spending/',
        //     baseURL: kGlobalConstants.API,
        //     method: 'post',
        //     data: params,
        //     cancelToken: source.token
        // }),
        cancel() {
            source.cancel();
        }
    };
};
