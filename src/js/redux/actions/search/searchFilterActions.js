/**
  * searchFilterActions.js
  * Created by Kevin Li 11/1/16
  **/

import { removePlaceholderString } from "helpers/checkboxTreeHelper";
import { CheckboxTreeSelections } from "redux/reducers/search/searchFiltersReducer";

// Keyword Filter
export const updateTextSearchInput = (textInput) => ({
    type: 'UPDATE_TEXT_SEARCH',
    textInput
});

// Time Period Filter
export const updateTimePeriod = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
    dateType: state.dateType,
    fy: state.fy,
    start: state.startDate,
    end: state.endDate
});

// New Time Period Filter
export const updateTimePeriodArray = (state) => ({
    type: 'ADD_TIME_PERIOD_OBJECT',
    dateType: state.dateType,
    fy: state.fy,
    start: state.startDate,
    end: state.endDate,
    removeFilter: state.removeFilter,
    event: state.event
});

export const updateNewAwardsOnlySelected = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_SELECTED',
    filterValue: state
});

export const updateNewAwardsOnlyActive = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_ACTIVE',
    filterValue: state
});

export const updateNaoActiveFromFyOrDateRange = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_NAO_FROM_FY_OR_DATE_RANGE',
    filterValue: state
});

export const updateGenericFilter = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_GENERIC',
    filterType: state.type,
    filterValue: state.value
});

export const resetTimeFilters = () => ({
    type: 'RESET_SEARCH_TIME_FILTER'
});

export const clearFilterType = (state) => ({
    type: 'CLEAR_SEARCH_FILTER_TYPE',
    filterType: state
});

export const clearAllFilters = () => ({
    type: 'CLEAR_SEARCH_FILTER_ALL'
});

// Location Filter
export const updateSelectedLocations = (state) => ({
    type: 'UPDATE_SELECTED_LOCATIONS',
    location: state.location
});

export const updateDomesticForeignSelection = (state) => ({
    type: 'UPDATE_DOMESTIC_FOREIGN',
    selection: state
});

export const addPOPLocationObject = (state) => ({
    type: 'ADD_POP_LOCATION_OBJECT',
    location: state
});

export const addRecipientLocationObject = (state) => ({
    type: 'ADD_RECIPIENT_LOCATION_OBJECT',
    location: state
});

// Agency Filter
export const updateSelectedAwardingAgencies = (state) => ({
    type: 'UPDATE_SELECTED_AWARDING_AGENCIES',
    agency: state.agency
});

export const updateSelectedFundingAgencies = (state) => ({
    type: 'UPDATE_SELECTED_FUNDING_AGENCIES',
    agency: state.agency
});

// Recipient Filter
export const updateSelectedRecipients = (state) => ({
    type: 'UPDATE_SELECTED_RECIPIENTS',
    recipient: state
});

export const updateRecipientDomesticForeignSelection = (state) => ({
    type: 'UPDATE_RECIPIENT_DOMESTIC_FORIEGN',
    selection: state
});

export const toggleRecipientType = ({ value }) => ({
    type: 'TOGGLE_SEARCH_FILTER_RECIPIENT_TYPE',
    recipientType: value
});

export const bulkRecipientTypeChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_RECIPIENT_TYPES',
    recipientTypes: state.types,
    direction: state.direction
});

export const updateRecipientLocations = (state) => ({
    type: 'UPDATE_RECIPIENT_LOCATIONS',
    location: state
});

// Award Type Filter
export const toggleAwardType = ({ value }) => ({
    type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
    awardType: value
});

export const bulkAwardTypeChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
    awardTypes: state.types,
    direction: state.direction
});

// Contract Award Type Filter
export const toggleContractAwardType = ({ value }) => ({
    type: 'TOGGLE_SEARCH_FILTER_CONTRACT_AWARD_TYPE',
    contractAwardType: value
});

export const bulkContractAwardTypeChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_CONTRACT_AWARD_TYPE',
    contractAwardTypes: state.types,
    direction: state.direction
});

// Financial Assistance Award Type Filter
export const toggleFinancialAssistanceAwardType = ({ value }) => ({
    type: 'TOGGLE_SEARCH_FILTER_FINANCIAL_ASSISTANCE_AWARD_TYPE',
    financialAssistanceAwardType: value
});

export const bulkFinancialAssistanceAwardTypeChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_FINANCIAL_ASSISTANCE_AWARD_TYPE',
    financialAssistanceAwardTypes: state.types,
    direction: state.direction
});

// Award Amount Filter
export const updateAwardAmounts = ({ value }) => ({
    type: 'UPDATE_AWARD_AMOUNTS',
    awardAmounts: value
});

// CFDA Filter
export const updateSelectedCFDA = (state) => ({
    type: 'UPDATE_SELECTED_CFDA',
    cfda: state.cfda
});

// NAICS Filter
export const updateNaics = (require, exclude, counts) => ({
    type: 'UPDATE_NAICS',
    payload: {
        exclude,
        require: require.map((code) => removePlaceholderString(code)),
        counts
    }
});

// TAS Filter
export const updateTreasuryAccountComponents = (source) => ({
    type: 'UPDATE_TREASURY_ACCOUNT_COMPONENTS',
    source
});

export const updateTAS = (require, exclude, counts) => ({
    type: 'UPDATE_TAS',
    payload: new CheckboxTreeSelections({
        exclude,
        require: require.map((code) => removePlaceholderString(code)),
        counts
    })
});

// PSC Filter
export const updateSelectedPSC = (state) => ({
    type: 'UPDATE_SELECTED_PSC',
    psc: state.psc
});

export const updatePSC = (require, exclude, counts) => ({
    type: 'UPDATE_PSC',
    payload: new CheckboxTreeSelections({
        exclude,
        require: require.map((code) => removePlaceholderString(code)),
        counts
    })
});

// Contract Pricing Type Filter
export const updatePricingType = ({ value }) => ({
    type: 'UPDATE_PRICING_TYPE',
    pricingType: value
});

// Contract Set-Aside Filter
export const updateSetAside = ({ value }) => ({
    type: 'UPDATE_SET_ASIDE',
    setAside: value
});

// Contract Extent Competed Filter
export const updateExtentCompeted = ({ value }) => ({
    type: 'UPDATE_EXTENT_COMPETED',
    extentCompeted: value
});

// Generic
export const setSearchOrder = (state) => ({
    type: 'SET_SEARCH_ORDER',
    field: state.field,
    direction: state.direction
});

// Update DEF Codes
export const updateDefCodes = (require, exclude, counts) => ({
    type: 'UPDATE_DEF_CODES',
    payload: new CheckboxTreeSelections({
        exclude,
        require,
        counts
    })
});

export const toggleCovidDefCode = ({ value }) => ({
    type: 'TOGGLE_COVID_DEF_CODES',
    covidDefCode: value
});

export const bulkCovidDefCodeChange = (state) => ({
    type: 'BULK_UPDATE_COVID_DEF_CODES',
    covidDefCodes: state.types,
    direction: state.direction
});

export const toggleInfraDefCode = ({ value }) => ({
    type: 'TOGGLE_INFRA_DEF_CODES',
    infraDefCode: value
});

export const bulkInfraDefCodeChange = (state) => ({
    type: 'BULK_UPDATE_INFRA_DEF_CODES',
    infraDefCodes: state.types,
    direction: state.direction
});

export const resetSearchOrder = () => ({
    type: 'RESET_SEARCH_ORDER'
});

