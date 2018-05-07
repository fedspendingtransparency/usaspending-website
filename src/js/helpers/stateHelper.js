/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */

// import Axios, {CancelToken} from "axios/index";

// import kGlobalConstants from 'GlobalConstants';

// TODO - Lizzie: remove mock API
export const fetchStateOverview = (id, year) => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        results: {
                            name: 'California',
                            fips: id,
                            year,
                            state_type: "state",
                            population: 8414380,
                            total_prime_amount: 300200000000,
                            total_prime_awards: 327721,
                            award_amount_per_capita: 916023.08,
                            median_household_income: 68114,
                            icon_filename: 'CA.jpg'
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
