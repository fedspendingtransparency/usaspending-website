/**
  * naicsHelper.js
  * Created by Jonathan Hill 10/03/2019
  **/

import { apiRequest } from './apiRequest';

// perform search is a cancellable promise
// eslint-disable-next-line import/prefer-default-export
export const naicsRequest = (param) => apiRequest({
    url: `v2/references/naics/${param || ''}`
});
