/**
  * searchHelper.js
  * Created by Kevin Li 11/2/16
  **/

import { is } from 'immutable';
import { isEqual, sortBy } from 'lodash';
import dayjs from "dayjs";
import { initialState } from 'redux/reducers/search/searchFiltersReducer';
import { checkboxTreeFilters } from 'dataMapping/shared/checkboxTree/checkboxTree';

import { apiRequest } from './apiRequest';
import dateRangeDropdownTimePeriods from "./search/dateRangeDropdownHelper";

// Agency search for autocomplete
export const fetchLocations = (req) => apiRequest({
    url: 'v2/autocomplete/location/',
    method: 'post',
    data: req
});

export const fetchAwardingAgencies = (req) => apiRequest({
    url: 'v2/autocomplete/awarding_agency/',
    method: 'post',
    data: req
});

export const fetchFundingAgencies = (req) => apiRequest({
    url: 'v2/autocomplete/funding_agency/',
    method: 'post',
    data: req
});

export const fetchProgramActivity = (req) => apiRequest({
    url: 'v2/autocomplete/program_activity/',
    method: 'post',
    data: req
});

// TAS search
export const fetchTas = (idString = '') => apiRequest({
    // str contains depth, prepended with agency & federal account delimited by a '/', if any.
    url: idString.length === 0
        ? `/v2/references/filter_tree/tas/`
        : `/v2/references/filter_tree/tas/${idString}`
});

// PSC search
export const fetchPsc = (paramString = '') => apiRequest({
    url: paramString === ''
        ? `/v2/references/filter_tree/psc/`
        : `/v2/references/filter_tree/psc/${paramString}`
});

// CFDA search for autocomplete
export const fetchCFDA = (req) => apiRequest({
    url: 'v2/autocomplete/cfda/',
    method: 'post',
    data: req
});


// NAICS search for autocomplete
export const fetchNAICS = (req) => apiRequest({
    url: 'v2/autocomplete/naics/',
    method: 'post',
    data: req
});

// perform search is a cancellable promise
// eslint-disable-next-line import/prefer-default-export
export const naicsRequest = (param) => apiRequest({
    url: `v2/references/naics/${param || ''}`
});

// PSC search for autocomplete
export const fetchPSC = (req) => apiRequest({
    url: 'v2/autocomplete/psc/',
    method: 'post',
    data: req
});

export const fetchAwardV2 = (awardId) => apiRequest({
    url: `v2/awards/${awardId}/`
});

export const fetchRecipients = (req) => apiRequest({
    url: 'v2/recipient/',
    method: 'post',
    data: req
});

// Recipient search for autocomplete
export const fetchRecipientsAutocomplete = (req) => apiRequest({
    url: 'v2/autocomplete/recipient/',
    method: 'post',
    data: req
});

// Fetch Individual Award's Transactions
export const fetchAwardTransaction = (params) => apiRequest({
    url: 'v2/transactions/',
    method: 'post',
    data: params
});

// Spending Over Time Visualization Endpoint
export const performSpendingOverTimeSearch = (params) => apiRequest({
    url: 'v2/search/spending_over_time/',
    method: 'post',
    data: params
});

// Spending By Category Visualization Endpoint
export const performSpendingByCategorySearch = (params) => apiRequest({
    url: `v2/search/spending_by_category/${params.category}`,
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    data: params
});

// Spending By Geography Visualization Endpoint
export const performSpendingByGeographySearch = (params) => apiRequest({
    url: 'v2/search/spending_by_geography/',
    method: 'post',
    data: params
});

// Spending By Award Tab Count Endpoint
export const performSpendingByAwardTabCountSearch = (params) => apiRequest({
    url: 'v2/search/spending_by_award_count/',
    method: 'post',
    data: params
});

// Spending By Award Table Endpoint
export const performSpendingByAwardSearch = (params) => apiRequest({
    url: 'v2/search/spending_by_award/',
    method: 'post',
    data: params
});

export const performSpendingBySubawardGrouped = (params) => apiRequest({
    url: 'v2/search/spending_by_subaward_grouped/',
    method: 'post',
    data: params
});

export const performSpendingByTransactionsGrouped = (params) => apiRequest({
    url: 'v2/search/spending_by_transaction_grouped',
    method: 'post',
    data: params
});

export const performSubawardSearch = (data) => apiRequest({
    url: 'v2/subawards/',
    method: 'post',
    data
});

export const generateUrlHash = (data) => apiRequest({
    url: 'v2/references/filter/',
    method: 'post',
    data
});

export const restoreUrlHash = (data) => apiRequest({
    url: 'v2/references/hash/',
    method: 'post',
    data
});

export const fetchLastUpdate = () => apiRequest({
    url: 'v2/awards/last_updated/'
});

const areCheckboxSelectionsEqual = ({ exclude: exclude1, require: require1 }, { exclude: exclude2, require: require2 }) => {
    if (!isEqual(sortBy(require1), sortBy(require2))) return false;
    if (!isEqual(sortBy(exclude1), sortBy(exclude2))) return false;
    return true;
};

/**
 * Equality Comparison of two objects:
 * @param {Object} filters object to be measured for equality
 * @param {Object} filterReference object by which equality is measured  against
 * @returns {boolean}
 */
export const areFiltersEqual = (filters = initialState, filterReference = initialState) => {
    if (!filterReference && filters) return false;
    const referenceObject = Object.assign({}, filterReference);
    const comparisonObject = Object.assign({}, filters);
    if (referenceObject.timePeriodType === 'fy') {
    // if the time period is fiscal year, we don't care about the date range values, even
    // if they're provided because the date range tab isn't selected
        delete comparisonObject.time_period;
        delete referenceObject.time_period;
        delete comparisonObject.filterNewAwardsOnlyActive;
        delete referenceObject.filterNewAwardsOnlyActive;
        delete comparisonObject.filterNaoActiveFromFyOrDateRange;
        delete referenceObject.filterNaoActiveFromFyOrDateRange;
    }
    else if (referenceObject.timePeriodType === 'dr') {
    // if the time period is date range, we don't care about the fiscal year values, even
    // if they're provided because the fiscal year tab isn't selected
        delete comparisonObject.timePeriodFY;
        delete referenceObject.timePeriodFY;
        delete comparisonObject.filterNewAwardsOnlyActive;
        delete referenceObject.filterNewAwardsOnlyActive;
        delete comparisonObject.filterNaoActiveFromFyOrDateRange;
        delete referenceObject.filterNaoActiveFromFyOrDateRange;
    }
    // we need to iterate through each of the filter Redux keys in order to perform equality
    // comparisons on Immutable children (via the Immutable is() function)
    const immutableFilterKeys = Object
        .keys(comparisonObject)
        .filter((k) => !checkboxTreeFilters.includes(k));

    for (const value of immutableFilterKeys) {
        const key = value;
        const unfilteredValue = comparisonObject[key];
        const currentValue = referenceObject[key];
        if (!is(unfilteredValue, currentValue)) {
            return false;
        }
    }

    for (let i = 0; i < checkboxTreeFilters.length; i++) {
        const key = checkboxTreeFilters[i];
        const unfilteredValue = comparisonObject[key].toObject();
        const currentValue = referenceObject[key].toObject();
        if (!areCheckboxSelectionsEqual(unfilteredValue, currentValue)) return false;
    }

    return true;
};

export const areFiltersEmpty = (filters) => areFiltersEqual(filters);
export const areFiltersSelected = (filters) => !areFiltersEqual(filters);

export const areFiltersDifferent = (a, b) => !areFiltersEqual(a, b);

export const isSearchHashReady = ({ search }) => {
    if (search) {
        const params = new URLSearchParams(search);
        for (const [key, value] of params.entries()) {
            if (key === 'hash' && value) {
                return true;
            }
        }
        return false;
    }
    return false;
};

export const getObjFromQueryParams = (str) => {
    const params = new URLSearchParams(str);
    const obj = {};
    for (const [key, value] of params.entries()) {
        obj[key] = value;
    }
    return obj;
};

export const convertToTitleCase = (str) => {
    if (!str) {
        return "";
    }

    return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

export const locationChipLabel = (label, location) => {
    switch (label) {
        case 'County': {
            const countySplit = location.display.title.split(', ');

            if (countySplit[1]?.length === 2) {
                return `${convertToTitleCase(countySplit[0])}, ${countySplit[1]}`;
            }

            return convertToTitleCase(location?.display?.title);
        }
        case 'City':
            if (location.filter?.state) {
                return `${convertToTitleCase(location.filter.city)}, ${
                    location.filter.state.length === 2 ?
                        location.filter.state :
                        convertToTitleCase(location.filter.state)
                }`;
            }
            return `${convertToTitleCase(location.filter.city)}, ${location.filter.country}`;
        case 'State':
            return convertToTitleCase(location.display.title);
        case 'Country':
            return convertToTitleCase(location.display.title);
        case 'Current congressional district':
            return `Current ${location.display.title}`;
        case 'Original congressional district':
            return `Original ${location.display.title}`;
        default:
            // zip codes
            return location.display.title;
    }
};

export const dateRangeChipLabel = (timeInput) => {
    let start = null;
    let end = null;
    let dateLabel;

    if (timeInput.start_date) {
        start = dayjs(timeInput.start_date, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }
    if (timeInput.end_date) {
        end = dayjs(timeInput.end_date, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }

    if (dayjs().isSame(timeInput.end_date, 'day')) {
        switch (timeInput.start_date) {
            // current-month
            case dateRangeDropdownTimePeriods[5].startDate:
                dateLabel = dateRangeDropdownTimePeriods[5].label;
                break;
            // last-three-months
            case dateRangeDropdownTimePeriods[6].startDate:
                dateLabel = dateRangeDropdownTimePeriods[6].label;
                break;
            // last-six-months
            case dateRangeDropdownTimePeriods[7].startDate:
                dateLabel = dateRangeDropdownTimePeriods[7].label;
                break;
            // last-twelve-months
            case dateRangeDropdownTimePeriods[8].startDate:
                dateLabel = dateRangeDropdownTimePeriods[8].label;
                break;
            // year-to-date
            case dateRangeDropdownTimePeriods[10].startDate:
                dateLabel = dateRangeDropdownTimePeriods[10].label;
                break;
            // last-seven-days
            case dateRangeDropdownTimePeriods[1].startDate:
                dateLabel = dateRangeDropdownTimePeriods[1].label;
                break;
            // last-fifteen-days
            case dateRangeDropdownTimePeriods[2].startDate:
                dateLabel = dateRangeDropdownTimePeriods[2].label;
                break;
            // last-thirty-days
            case dateRangeDropdownTimePeriods[3].startDate:
                dateLabel = dateRangeDropdownTimePeriods[3].label;
                break;
            // last-sixty-days
            case dateRangeDropdownTimePeriods[4].startDate:
                dateLabel = dateRangeDropdownTimePeriods[4].label;
                break;
            default:
                dateLabel = `${start} to ${end}`;
        }
    }
    else if (
        dayjs()
            .subtract(1, 'day')
            .isSame(timeInput.start_date, 'day') &&
        dayjs()
            .subtract(1, 'day')
            .isSame(timeInput.end_date, 'day')
    ) {
        dateLabel = dateRangeDropdownTimePeriods[0].label;
    }
    else if (
        dayjs()
            .subtract(1, 'year')
            .startOf('year')
            .isSame(timeInput.start_date, 'day') &&
        dayjs()
            .subtract(1, 'year')
            .endOf('year')
            .isSame(timeInput.end_date, 'day')
    ) {
        dateLabel = dateRangeDropdownTimePeriods[9].label;
    }
    else if (start && end) {
        dateLabel = `${start} - ${end}`;
    }
    else if (start) {
        dateLabel = `${start} - present`;
    }
    else if (end) {
        dateLabel = `Start of data - ${end}`;
    }

    return dateLabel;
};
