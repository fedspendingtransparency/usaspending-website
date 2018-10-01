/**
 * bulkDownloadHelper.js
 * Created by Lizzie Salita 11/1/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';


export const requestAgenciesList = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/bulk_download/list_agencies/`,
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

export const requestFederalAccountList = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v1/federal_accounts/`,
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

export const requestAwardsDownload = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/bulk_download/awards/`,
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

export const requestAccountsDownload = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: `v2/download/accounts/`,
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

export const requestBulkDownloadStatus = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/bulk_download/status/',
            baseURL: kGlobalConstants.API,
            method: 'get',
            params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestArchiveFiles = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v2/bulk_download/list_monthly_files/',
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

// export const requestDictionaryContent = () => {
//     const source = CancelToken.source();
//     return {
//         promise: Axios.request({
//             url: 'v2/references/data_dictionary/',
//             baseURL: kGlobalConstants.API,
//             method: 'get',
//             cancelToken: source.token
//         }),
//         cancel() {
//             source.cancel();
//         }
//     };
// };

const mockData = {
    "metadata": {
        "total_rows": 393,
        "total_columns": 12,
        "file_name": "Data Transparency Rosetta Stone_Public_only.xlsx",
        "total_size": "119.32KB"
    },
    "sections": [
        {
            "section": "Schema Data Label & Description",
            "colspan": 3
        },
        {
            "section": "File",
            "colspan": 1
        },
        {
            "section": "USA Spending Downloads",
            "colspan": 6
        },
        {
            "section": "Legacy USA Spending",
            "colspan": 2
        }
    ],
    "headers": [
        {
            "display": "Element",
            "raw": "element"
        },
        {
            "display": "Definition",
            "raw": "definition"
        },
        {
            "display": "FPDS Element",
            "raw": "fpds_element"
        },
        {
            "display": "File\nA-F",
            "raw": "file_a_f"
        },
        {
            "display": "Award File",
            "raw": "award_file"
        },
        {
            "display": "Award Element",
            "raw": "award_element"
        },
        {
            "display": "Subaward File",
            "raw": "subaward_file"
        },
        {
            "display": "Subaward Element",
            "raw": "subaward_element"
        },
        {
            "display": "Account File",
            "raw": "account_file"
        },
        {
            "display": "Account Element",
            "raw": "account_element"
        },
        {
            "display": "Award Element",
            "raw": "legacy_award_element"
        },
        {
            "display": "Subaward Element",
            "raw": "legacy_subaward_element"
        }
    ],
    "rows": [
        [
            "1862 Land Grant College",
            "https://www.sam.gov",
            "1862 Land Grant College",
            "D1",
            "all_contracts_prime_awards_1.csv,\nall_contracts_prime_transactions_1.csv",
            "1862_land_grant_college",
            null,
            null,
            null,
            null,
            "is1862landgrantcollege",
            null
        ],
        [
            "1890 Land Grant College",
            "https://www.sam.gov",
            "1890 Land Grant College",
            "D1",
            "all_contracts_prime_awards_1.csv,\nall_contracts_prime_transactions_1.csv",
            "1890_land_grant_college",
            null,
            null,
            null,
            null,
            "is1890landgrantcollege",
            null
        ],
        [
            "1994 Land Grant College",
            "https://www.sam.gov",
            "1994 Land Grant College",
            "D1",
            "all_contracts_prime_awards_1.csv,\nall_contracts_prime_transactions_1.csv",
            "1994_land_grant_college",
            null,
            null,
            null,
            null,
            "is1994landgrantcollege",
            null
        ],
        [
            "8a Program Participant",
            "List characteristic of the contractor such as whether the selected contractor is an 8(a) Program Participant Organization or not. It can be derived from the SAM data element, 'Business Types'.",
            "8(a) Program Participant",
            "D1",
            "all_contracts_prime_awards_1.csv,\nall_contracts_prime_transactions_1.csv",
            "c8a_program_participant",
            null,
            null,
            null,
            null,
            "firm8aflag",
            null
        ],
        [
            "A-76 FAIR Act Action",
            "Indicates whether the contract action resulted from an A- 76/Fair Act competitive sourcing process.",
            "A-76 (FAIR Act) Action",
            "D1",
            "all_contracts_prime_awards_1.csv,\nall_contracts_prime_transactions_1.csv",
            "a76_fair_act_action_code",
            null,
            null,
            null,
            null,
            "a76action",
            null
        ]
    ]
};

export const requestDictionaryContent = () => {
    const source = CancelToken.source();
    return {
        promise: new Promise((resolve) => {
            window.setTimeout(() => {
                resolve({
                    data: mockData
                });
            }, 500);
        }),
        cancel() {
            source.cancel();
        }
    };
};
