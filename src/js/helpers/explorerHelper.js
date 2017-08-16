/**
 * explorerHelper.js
 * Created by Kevin Li 8/16/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

// export const fetchAgencyOverview = (id) => {
//     const source = CancelToken.source();
//     return {
//         promise: Axios.request({
//             url: `tbd`,
//             baseURL: kGlobalConstants.API,
//             method: 'get',
//             cancelToken: source.token
//         }),
//         cancel() {
//             source.cancel();
//         }
//     };
// };
