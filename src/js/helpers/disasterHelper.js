/**
 * disasterHelper.js
 * Created by Jonathan Hill 06/11/20
 */
import { sortAlphaNumbersLast } from "./search/collapsiblesidebarHelper";

export const defCodeQueryString = (defCodes) => defCodes.sort().reduce((acc, code, i, array) => {
    let currentString = acc;
    currentString += code;
    if (i + 1 !== array.length) currentString += ',';
    return currentString;
}, '');

export const parseCodes = (codes, type) => sortAlphaNumbersLast(
    codes.filter(((code) => code.disaster === type))
        .map((code) => code.code)
);

