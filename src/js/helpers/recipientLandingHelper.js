/**
 * recipientLandingHelper.js
 * Created by David Trinh 7/3/18
 **/

import { apiRequest } from "./apiRequest";

// eslint-disable-next-line import/prefer-default-export
export const fetchAllRecipients = (data) => apiRequest({
    url: 'v2/recipient/',
    method: 'post',
    data
});
