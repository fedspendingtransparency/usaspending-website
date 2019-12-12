/**
 * agencyLandingHelper.js
 * Created by Lizzie Salita 7/10/17
 **/

import { apiRequest } from './apiRequest';

// eslint-disable-next-line import/prefer-default-export
export const fetchAllAgencies = (params) => apiRequest({
    url: 'v2/references/toptier_agencies/',
    params
});
