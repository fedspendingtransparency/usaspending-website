/**
  * searchFilterActions.js
  * Created by Kevin Li 11/1/16
  **/

// Keyword Filter
export const updateTextSearchInput = (state) => ({
    type: 'UPDATE_TEXT_SEARCH',
    textInput: state
});

// Award Type Filter
export const toggleAwardType = (state) => ({
    type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
    awardType: state
});

export const bulkAwardTypeChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
    awardTypes: state.awardTypes,
    direction: state.direction
});

// Time Period Filter
export const updateTimePeriod = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
    dateType: state.dateType,
    fy: state.fy,
    start: state.startDate,
    end: state.endDate
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

// Budget Category Filter

export const updateSelectedBudgetFunctions = (state) => ({
    type: 'UPDATE_SELECTED_BUDGET_FUNCTIONS',
    budgetFunction: state
});

export const updateSelectedFederalAccounts = (state) => ({
    type: 'UPDATE_SELECTED_FEDERAL_ACCOUNTS',
    federalAccount: state
});

export const updateSelectedObjectClasses = (state) => ({
    type: 'UPDATE_SELECTED_OBJECT_CLASSES',
    objectClass: state
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

export const updateRecipientLocations = (state) => ({
    type: 'UPDATE_RECIPIENT_LOCATIONS',
    location: state
});

// Award ID Filter
export const updateAwardIDs = (state) => ({
    type: 'UPDATE_SELECTED_AWARD_IDS',
    awardID: state.awardID
});

// Award Amount Filter

export const updateAwardAmounts = (state) => ({
    type: 'UPDATE_AWARD_AMOUNTS',
    awardAmounts: state
});

// Generic

export const setSearchOrder = (state) => ({
    type: 'SET_SEARCH_ORDER',
    field: state.field,
    direction: state.direction
});

export const resetSearchOrder = () => ({
    type: 'RESET_SEARCH_ORDER'
});
