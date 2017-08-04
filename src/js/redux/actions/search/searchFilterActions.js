/**
  * searchFilterActions.js
  * Created by Kevin Li 11/1/16
  **/

// Keyword Filter
export const updateTextSearchInput = (state) => ({
    type: 'UPDATE_TEXT_SEARCH',
    textInput: state
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

export const bulkObjectClassesChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_OBJECT_CLASSES',
    objectClasses: state.types,
    direction: state.direction
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

export const toggleRecipientType = (state) => ({
    type: 'TOGGLE_SEARCH_FILTER_RECIPIENT_TYPE',
    recipientType: state
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
export const toggleAwardType = (state) => ({
    type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
    awardType: state
});

export const bulkAwardTypeChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
    awardTypes: state.types,
    direction: state.direction
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

// CFDA Filter

export const updateSelectedCFDA = (state) => ({
    type: 'UPDATE_SELECTED_CFDA',
    cfda: state.cfda
});

// NAICS Filter

export const updateSelectedNAICS = (state) => ({
    type: 'UPDATE_SELECTED_NAICS',
    naics: state.naics
});

// PSC Filter

export const updateSelectedPSC = (state) => ({
    type: 'UPDATE_SELECTED_PSC',
    psc: state.psc
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

export const toggleColumnVisibility = (state) => ({
    type: 'TOGGLE_COLUMN_VISIBILITY',
    column: state.column,
    tableType: state.tableType
});

export const resetColumnVisibility = () => ({
    type: 'RESET_COLUMN_VISIBILITY'
});

export const reorderColumns = (state) => ({
    type: 'REORDER_COLUMNS',
    tableType: state.tableType,
    dragIndex: state.dragIndex,
    hoverIndex: state.hoverIndex
});
