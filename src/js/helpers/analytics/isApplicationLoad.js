/**
 * isApplicationLoad.js
 * Created by Jonathan Hill 07/14/21
 */

const isApplicationLoad = (params) => {
    if (!Array.isArray(params)) return false;
    return params.indexOf('isAppLoad') !== -1;
};

export default isApplicationLoad;
