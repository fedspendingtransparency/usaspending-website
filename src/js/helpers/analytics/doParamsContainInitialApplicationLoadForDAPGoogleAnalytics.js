/**
 * doParamsContainInitialApplicationLoadForDAPGoogleAnalytics.js
 * Created by Jonathan Hill 07/14/21
 */


const doParamsContainInitialApplicationLoadForDAPGoogleAnalytics = (params) => {
    if (!Array.isArray(params)) return false;
    return params.indexOf('isInitialApplicationLoadForDAPGoogleAnalytics') !== -1;
};

export default doParamsContainInitialApplicationLoadForDAPGoogleAnalytics;
