/**
  * awardHistoryHelper.js
  * Created by Max Kendall 09/18/19
  **/

import { apiRequest } from './apiRequest';

// Get federal accounts
export const fetchFederalAccountFunding = (params) => apiRequest({
    url: 'v2/awards/funding/',
    method: 'post',
    data: params
});

export const getAwardHistoryFederalAccountsIdv = (awardId) => apiRequest({
    url: `v2/idvs/count/federal_account/${awardId}/`
});

/**
 * @param type: oneOf(['subaward', 'transaction', 'federal_account'])
 */
export const getAwardHistoryCounts = (type, awardId, isIdv = false) => {
    if (type === 'federal_account' && isIdv) return getAwardHistoryFederalAccountsIdv(awardId);
    return apiRequest({
        url: `v2/awards/count/${type}/${awardId}/`
    });
};
