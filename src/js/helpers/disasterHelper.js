/**
 * disasterHelper.js
 * Created by Jonathan Hill 06/11/20
 */

import { apiRequest } from 'helpers/apiRequest';

const defcAPI = () => apiRequest({
    url: 'v2/references/def_codes/'
});

export default defcAPI;
