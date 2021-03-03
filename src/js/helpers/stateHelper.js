/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */

import { stateNameByFipsId, fipsIdByStateName } from "../dataMapping/state/stateNames";
import { apiRequest } from "./apiRequest";

export const fetchStateOverview = (id, year) => apiRequest({
    url: `v2/recipient/state/${id}/`,
    params: { year }
});

export const fetchAwardBreakdown = (id, year) => apiRequest({
    url: `v2/recipient/state/awards/${id}/`,
    params: { year }
});

export const fetchStateList = () => apiRequest({
    url: 'v2/recipient/state/'
});

const acceptableChars = "abcdefghijklmnopqrstuvwxyz";

export const URLifyStateName = (str) => str
    .split(' ')
    .map((s) => s.split('').filter((s2) => acceptableChars.includes(s2.toLowerCase())).join('').toLowerCase())
    .join('-');

/**
 * parseStateDataFromUrl
 * @param {string} state the fragment of the url containing either state name or fips id
 * @returns {array} [isName, urlName, fipsId]; isName indicating if the input is the state name
*/
export const parseStateDataFromUrl = (state) => {
    const isName = Number.isNaN(parseInt(state, 10));
    if (isName) {
        const parsedName = state.split('-').join(' ').toLowerCase();
        if (fipsIdByStateName[parsedName]) {
            return [
                isName,
                state.toLowerCase(),
                fipsIdByStateName[parsedName]
            ];
        }
    }
    if (state.length === 1 && stateNameByFipsId[`0${state}`]) {
        return [
            isName,
            URLifyStateName(stateNameByFipsId[`0${state}`]),
            `0${state}`
        ];
    }
    if (stateNameByFipsId[`${state}`]) {
        return [
            isName,
            URLifyStateName(stateNameByFipsId[`${state}`]),
            `${state}`
        ];
    }
    return [null, null];
};
