/**
 * bulkDownloadActions.js
 * Created by Lizzie Salita 10/31/17
 */

export const updateDownloadFilter = (state) => ({
    type: 'UPDATE_DOWNLOAD_FILTER',
    dataType: state.dataType,
    name: state.name,
    value: state.value
});

export const updateDownloadParam = (state) => ({
    type: 'UPDATE_DOWNLOAD_PARAM',
    dataType: state.dataType,
    name: state.name,
    value: state.value
});

export const setDataType = (state) => ({
    type: 'SET_DATA_TYPE',
    dataType: state
});

export const updateAwardDateRange = (state) => ({
    type: 'UPDATE_AWARD_DATE_RANGE',
    date: state.date,
    dateType: state.dateType
});

export const clearDownloadFilters = (state) => ({
    type: 'CLEAR_DOWNLOAD_FILTERS',
    dataType: state
});

export const setAgencyList = (state) => ({
    type: 'SET_AGENCY_LIST',
    agencies: state
});

export const setSubAgencyList = (state) => ({
    type: 'SET_SUB_AGENCY_LIST',
    subAgencies: state
});

export const setDownloadExpectedFile = (state) => ({
    type: 'SET_DOWNLOAD_EXPECTED_FILE',
    file: state
});

export const setDownloadPending = (state) => ({
    state,
    type: 'SET_DOWNLOAD_PENDING'
});

export const setDownloadCollapsed = (state) => ({
    type: 'SET_DOWNLOAD_COLLAPSED',
    collapsed: state
});
