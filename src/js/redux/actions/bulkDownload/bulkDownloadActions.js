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

export const updateCheckbox = (state) => ({
    type: 'UPDATE_CHECKBOX',
    filter: state.filter,
    name: state.name,
    value: state.value,
    dataType: state.dataType
});

export const setDefCodes = (downloadType, defCodes) => ({
    type: 'SET_BULK_DOWNLOAD_DEFC',
    downloadType,
    defCodes
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

export const setDownloadExpectedUrl = (state) => ({
    type: 'SET_BULK_DOWNLOAD_EXPECTED_URL',
    url: state
});

export const setDownloadExpectedFile = (state) => ({
    type: 'SET_BULK_DOWNLOAD_EXPECTED_FILE',
    file: state
});

export const setDownloadPending = (state) => ({
    state,
    type: 'SET_BULK_DOWNLOAD_PENDING'
});

export const setDownloadCollapsed = (state) => ({
    type: 'SET_BULK_DOWNLOAD_COLLAPSED',
    collapsed: state
});

export const resetDownload = () => ({
    type: 'RESET_BULK_DOWNLOAD'
});

export const handleDownloadRequest = (res) => (dispatch) => {
    dispatch(setDownloadExpectedUrl(res.file_url));
    dispatch(setDownloadExpectedFile(res.file_name));
    dispatch(setDownloadPending(true));
};

export const bulkAwardTypeChange = ({ lookupName, direction, types }) => ({
    type: 'BULK_AWARD_TYPE_CHANGE',
    lookupName,
    direction,
    awardTypes: types
});

export const toggleAwardTypeChange = ({ lookupName, value }) => ({
    type: 'TOGGLE_AWARD_TYPE_CHANGE',
    lookupName,
    awardType: value
});
