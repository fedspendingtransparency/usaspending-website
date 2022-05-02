/**
 * accountLandingHelper.js
 * Created by Lizzie Salita 8/4/17
 **/

import { apiRequest } from './apiRequest';

// eslint-disable-next-line import/prefer-default-export
export const fetchAllAccounts = (data) => apiRequest({
    url: 'v2/federal_accounts/',
    method: 'post',
    data
});
