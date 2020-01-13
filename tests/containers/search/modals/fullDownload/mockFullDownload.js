import { initialState } from 'redux/reducers/search/downloadReducer';
import { initialState as initialFilter } from 'redux/reducers/search/searchFiltersReducer';

export const mockRedux = {
    download: Object.assign({}, initialState, {
        pendingDownload: false,
        showCollapsedProgress: false,
        expectedFile: '',
        expectedUrl: ''
    }),
    filters: initialFilter
};

export const mockActions = {
    setDownloadPending: jest.fn(),
    setDownloadCollapsed: jest.fn(),
    setDownloadExpectedFile: jest.fn(),
    setDownloadExpectedUrl: jest.fn(),
    resetDownload: jest.fn()
};

export const mockResponse = {
    total_size: 12345,
    total_columns: 19,
    total_rows: 55555,
    file_name: "transaction_123.csv",
    status: "running",
    file_url: "https://s3.amazonaws.com/award_123.zip",
    message: "Your file failed because the database crashed.",
    seconds_elapsed: 50
};
