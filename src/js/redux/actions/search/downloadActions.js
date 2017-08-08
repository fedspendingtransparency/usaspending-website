/**
 * downloadActions.js
 * Created by Kevin Li 8/8/17
 */

export const setDownloadType = (state) => ({
    type: 'SET_DOWNLOAD_TYPE',
    downloadType: state
});

export const setDownloadColumns = (state) => ({
    type: 'SET_DOWNLOAD_COLUMNS',
    columns: state
});

export const setDownloadExpectedFile = (state) => ({
    type: 'SET_DOWNLOAD_EXPECTED_FILE',
    file: state
});

export const resetDownload = () => ({
    type: 'RESET_DOWNLOAD'
});
