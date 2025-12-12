/**
 * stateHelper.jsx
 * Created by Lizzie Salita 5/1/18
 */

import React from "react";
import { FiscalYearPicker, ShareIcon } from "data-transparency-ui";

import { stateNameByFipsId, fipsIdByStateName } from "dataMapping/state/stateNames";
import { apiRequest } from "helpers/apiRequest";
import { currentFiscalYear, earliestFiscalYear, getFiscalYearsWithLatestAndAll } from "helpers/fiscalYearHelper";
import { getBaseUrl, handleShareOptionClick } from "helpers/socialShare";

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
        const parsedName = state?.split('-').join(' ').toLowerCase();
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

export const statePageToolbarComponents = (stateProfile, handleFyChange, handleShareDispatch) => {
    const backgroundColor = "#1a4480";

    const slug = `state/${stateProfile.id}/${stateProfile.fy}`;

    const emailArgs = {
        subject: `USAspending.gov State Profile: ${stateProfile.overview.name}`,
        body: `View the spending activity for this state on USAspending.gov: ${getBaseUrl(slug)}`
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
    };

    return ([
        <FiscalYearPicker
            backgroundColor={backgroundColor}
            selectedFy={stateProfile?.fy}
            handleFyChange={handleFyChange}
            options={getFiscalYearsWithLatestAndAll(earliestFiscalYear, currentFiscalYear())} />,
        <ShareIcon
            onShareOptionClick={handleShare}
            url={getBaseUrl(slug)} />
    ]);
};
