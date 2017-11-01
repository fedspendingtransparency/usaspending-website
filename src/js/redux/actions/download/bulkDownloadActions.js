/**
 * bulkDownloadActions.js
 * Created by Lizzie Salita 10/31/17
 */

export const updateDownloadFilters = (state) => ({
    type: 'UPDATE_DOWNLOAD_FILTERS',
    dataType: state.dataType,
    filterObject: state.filters
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
