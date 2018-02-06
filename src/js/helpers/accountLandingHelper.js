/**
 * accountLandingHelper.js
 * Created by Lizzie Salita 8/4/17
 **/

// import Axios, { CancelToken } from 'axios';

// import kGlobalConstants from 'GlobalConstants';

// TODO - Lizzie: update when API is ready
// export const fetchAllAccounts = (params) => {
//    const source = CancelToken.source();
//    return {
//        promise: Axios.request({
//            url: 'v2/references/federal_account/',
//            baseURL: kGlobalConstants.API,
//            method: 'post',
//            params,
//            cancelToken: source.token
//        }),
//        cancel() {
//            source.cancel();
//        }
//    };
// };

const mockResponse = {
    page: 1,
    limit: 10,
    count: 20,
    results: [
        {
            account_id: 1,
            account_number: '123-4567',
            account_name: 'Mock Account',
            managing_agency: 'Mock Agency',
            managing_agency_acronym: 'XYZ',
            budgetary_resources: 5000000
        },
        {
            account_id: 2,
            account_number: '098-7654',
            account_name: 'Mock Account 2',
            managing_agency: 'Mock Agency 2',
            managing_agency_acronym: 'ABC',
            budgetary_resources: 6500000
        },
        {
            account_id: 3,
            account_number: '234-5678',
            account_name: 'Test Account',
            managing_agency: 'Mock Agency 3',
            managing_agency_acronym: 'DEF',
            budgetary_resources: 4500000
        },
        {
            account_id: 4,
            account_number: '123-4567',
            account_name: 'Mock Account 4',
            managing_agency: 'Mock Agency 4',
            managing_agency_acronym: 'XYZ',
            budgetary_resources: 5500000
        },
        {
            account_id: 5,
            account_number: '098-7654',
            account_name: 'Mock Account 5',
            managing_agency: 'Mock Agency 5',
            managing_agency_acronym: 'ABC',
            budgetary_resources: 6000000
        },
        {
            account_id: 6,
            account_number: '234-5678',
            account_name: 'Test Account 2',
            managing_agency: 'Mock Agency 6',
            managing_agency_acronym: 'DEF',
            budgetary_resources: 4000000
        },
        {
            account_id: 7,
            account_number: '123-4567',
            account_name: 'Mock Account 7',
            managing_agency: 'Mock Agency 7',
            managing_agency_acronym: 'XYZ',
            budgetary_resources: 5000000
        },
        {
            account_id: 8,
            account_number: '098-7654',
            account_name: 'Mock Account 8',
            managing_agency: 'Mock Agency 8',
            managing_agency_acronym: 'ABC',
            budgetary_resources: 6500000
        },
        {
            account_id: 9,
            account_number: '234-5678',
            account_name: 'Test Account 3',
            managing_agency: 'Mock Agency 9',
            managing_agency_acronym: 'DEF',
            budgetary_resources: 4500000
        },
        {
            account_id: 10,
            account_number: '123-4567',
            account_name: 'Mock Account 10',
            managing_agency: 'Mock Agency 6',
            managing_agency_acronym: 'XYZ',
            budgetary_resources: 5500000
        }
    ]
};

export const fetchAllAccounts = () => (
    {
        promise: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: mockResponse
                });
            }, 1000);
        })
    }
);

