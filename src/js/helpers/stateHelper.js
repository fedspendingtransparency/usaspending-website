/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */

// import Axios, {CancelToken} from "axios/index";

// import kGlobalConstants from 'GlobalConstants';

// TODO - Lizzie: remove mock API
export const fetchStateOverview = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: {
                            name: 'California',
                            code: 'CA',
                            fips: 6,
                            pop_year: 1992,
                            mhi_year: 1993,
                            state_type: "state",
                            population: 8414380,
                            total_prime_amount: 300200000000,
                            total_prime_awards: 327721,
                            award_amount_per_capita: 916023.08,
                            median_household_income: 68114,
                            pop_source: ["U.S. Census Bureau", "2010 Census", "2017 Population Estimates", "2010 American Community Survey"],
                            mhi_source: ["U.S. Census Bureau", "2010 Census", "2017 Population Estimates", "2010 American Community Survey"]
                        }
                    }
                });
            });
        })
    }
);

// export const fetchStateOverview = (id, year) => {
//     const source = CancelToken.source();
//     return {
//         promise: Axios.request({
//             url: `v2/recipient/state/${id}?year=${year}`,
//             baseURL: kGlobalConstants.API,
//             method: 'get',
//             cancelToken: source.token
//         }),
//         cancel() {
//             source.cancel();
//         }
//     };
// };
