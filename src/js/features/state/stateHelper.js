/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */
import { stateNameByFipsId, fipsIdByStateName } from "dataMapping/state/stateNames";
import { convertFYToDateRange, currentFiscalYear, earliestFiscalYear } from "../../helpers/fiscalYearHelper";
import { useCallback } from "react";
import BaseStateCategoryResult from "../../models/v2/state/BaseStateCategoryResult";
// import { apiRequest } from "helpers/apiRequest";

// export const fetchStateOverview = (id, year) => apiRequest({
//     url: `v2/recipient/state/${id}/`,
//     params: { year }
// });
//
// export const fetchAwardBreakdown = (id, year) => apiRequest({
//     url: `v2/recipient/state/awards/${id}/`,
//     params: { year }
// });
//
// export const fetchStateList = () => apiRequest({
//     url: 'v2/recipient/state/'
// });

export const createApiParams = (stateCode, period) => {
    const earliestYear = earliestFiscalYear;
    const thisYear = currentFiscalYear();

    const filterParams = {
        place_of_performance_locations: [
            {
                country: 'USA',
                state: stateCode
            }
        ],
        time_period: [
            {
                start_date: convertFYToDateRange(earliestYear)[0],
                end_date: convertFYToDateRange(thisYear)[1]
            }
        ]
    };

    const apiParams = {
        group: period,
        filters: filterParams,
        spending_level: "transactions",
        auditTrail: 'Spending Over Time Visualization'
    };

    return apiParams;
};

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

export const tabTypes = [
    {
        internal: 'all',
        label: 'All Awards'
    },
    {
        internal: 'contracts',
        label: 'Contracts'
    },
    {
        internal: 'grants',
        label: 'Grants'
    },
    {
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        internal: 'loans',
        label: 'Loans'
    },
    {
        internal: 'other',
        label: 'Other Financial Assistance'
    }
];

export const parseData = (res, category) => {
    const parsedDataResults = {
        noResults: false,
        parsedData: null
    };

    if (!res) {
        parsedDataResults.noResults = true;
        return parsedDataResults;
    }

    const { results, categories: resCategory } = res;
    if (results.length < 1) {
        parsedDataResults.noResults = true;
        return parsedDataResults;
    }

    const parsedData = results.map((item, index) => {
        const result = Object.create(BaseStateCategoryResult);
        if (category === 'awards') {
            result.populate({
                name: item['Award ID'],
                amount: item['Award Amount'],
                agency_slug: item.generated_internal_id,
                category
            }, index + 1);
        }
        else {
            result.populate({ ...item, category }, index + 1);
        }

        if (resCategory === 'awarding_agency' || resCategory === 'awarding_subagency') {
            result.nameTemplate = (resCode, name) => {
                if (resCode) {
                    return `${name} (${resCode})`;
                }
                return name;
            };
        }
        else if (resCategory === 'recipient') {
            result.nameTemplate = (resCode, name) => name;
        }
        else if (resCategory === 'county' || resCategory === 'district') {
            result.nameTemplate = (resCode, name) => (name);
        }
        return result;
    });

    parsedDataResults.parsedData = parsedData;
    return parsedDataResults;
};
