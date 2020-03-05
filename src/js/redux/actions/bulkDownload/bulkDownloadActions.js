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

export const bulkPrimeAwardTypeChange = (state) => ({
    type: 'BULK_PRIME_AWARD_TYPE_CHANGE',
    awardTypes: state.types,
    direction: state.direction
});

export const bulkSubAwardTypeChange = (state) => ({
    type: 'BULK_SUB_AWARD_TYPE_CHANGE',
    awardTypes: state.types,
    direction: state.direction
});

export const togglePrimeAwardTypeChange = (state) => ({
    type: 'TOGGLE_PRIME_AWARD_TYPE_CHANGE',
    awardType: state
});

export const toggleSubAwardTypeChange = (state) => ({
    type: 'TOGGLE_SUB_AWARD_TYPE_CHANGE',
    awardType: state
});
