/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */
import { convertFYToDateRange, currentFiscalYear, earliestFiscalYear } from "../../helpers/fiscalYearHelper";

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
    ?.split(' ')
    .map((s) => s.split('').filter((s2) => acceptableChars.includes(s2.toLowerCase())).join('').toLowerCase())
    .join('-');

/**
 * parseStateDataFromUrl
 * @param {string} state the fragment of the url containing either state name or fips id
 * @param {object} fipsIdByStateName mapping of state name to fips id
 * @param {object} stateNameByFipsId mapping of fips id to state name
 * @returns {array} [isName, urlName, fipsId]; isName indicating if the input is the state name
*/
export const parseStateDataFromUrl = (state, fipsIdByStateName, stateNameByFipsId) => {
    const isName = Number.isNaN(parseInt(state, 10));
    if (isName) {
        const parsedName = state?.split('-').join(' ').toLowerCase();
        if (fipsIdByStateName?.[parsedName]) {
            return [
                isName,
                state.toLowerCase(),
                fipsIdByStateName[parsedName]
            ];
        }
    }
    if (state?.length === 1 && stateNameByFipsId?.[`0${state}`]) {
        return [
            isName,
            URLifyStateName(stateNameByFipsId[`0${state}`]),
            `0${state}`
        ];
    }
    if (stateNameByFipsId?.[`${state}`]) {
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

