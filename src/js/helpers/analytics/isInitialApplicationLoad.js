/**
 * isInitialApplicationLoad.js
 * Created by Jonathan Hill 07/14/21
 */


const isInitialApplicationLoad = (params) => {
    console.log(' Params : ', params);
    if (!Array.isArray(params)) return false;
    console.log(' Func : ', params);
    return params.indexOf('isInitialApplicationLoad') !== -1;
};

export default isInitialApplicationLoad;
