/**
 * disasterHelper.js
 * Created by Jonathan Hill 06/11/20
 */

export const defCodeQueryString = (defCodes) => defCodes.sort().reduce((acc, code, i, array) => {
    let currentString = acc;
    currentString += code;
    if (i + 1 !== array.length) currentString += ',';
    return currentString;
}, '');
