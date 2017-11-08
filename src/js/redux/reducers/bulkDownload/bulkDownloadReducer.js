/**
 * bulkDownloadReducer.js
 * Created by Lizzie Salita 10/31/17
 **/

export const initialState = {
    dataType: 'awards',
    awards: {
        award_levels: [],
        filters: {
            award_types: [],
            agency: '',
            sub_agency: '',
            date_type: 'action_date',
            date_range: {
                start_date: '',
                end_date: ''
            }
        },
        columns: [],
        file_format: 'csv'
    },
    agencies: [],
    subAgencies: [],
    download: {
        expectedFile: '',
        expectedUrl: '',
        pendingDownload: false,
        showCollapsedProgress: false
    }
};

const bulkDownloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA_TYPE': {
            return Object.assign({}, state, {
                dataType: action.dataType
            });
        }
        case 'UPDATE_DOWNLOAD_PARAM': {
            const dataType = Object.assign({}, state[action.dataType], {
                [action.name]: action.value
            });

            return Object.assign({}, state, {
                [action.dataType]: dataType
            });
        }
        case 'UPDATE_DOWNLOAD_FILTER': {
            const filters = Object.assign({}, state[action.dataType].filters, {
                [action.name]: action.value
            });

            const dataType = Object.assign({}, state[action.dataType], {
                filters
            });

            return Object.assign({}, state, {
                [action.dataType]: dataType
            });
        }
        case 'UPDATE_AWARD_DATE_RANGE': {
            const dateRange = Object.assign({}, state.awards.filters.date_range, {
                [action.dateType]: action.date
            });

            const filters = Object.assign({}, state.awards.filters, {
                date_range: dateRange
            });

            const awards = Object.assign({}, state.awards, {
                filters
            });

            return Object.assign({}, state, {
                awards
            });
        }
        case 'CLEAR_DOWNLOAD_FILTERS': {
            const reset = Object.assign({}, initialState[action.dataType]);

            return Object.assign({}, state, {
                [action.dataType]: reset
            });
        }
        case 'SET_AGENCY_LIST': {
            return Object.assign({}, state, {
                agencies: action.agencies
            });
        }
        case 'SET_SUB_AGENCY_LIST': {
            return Object.assign({}, state, {
                subAgencies: action.subAgencies
            });
        }
        case 'SET_BULK_DOWNLOAD_EXPECTED_URL': {
            const download = Object.assign({}, state.download, {
                expectedUrl: action.url
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'SET_BULK_DOWNLOAD_EXPECTED_FILE': {
            const download = Object.assign({}, state.download, {
                expectedFile: action.file
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'SET_BULK_DOWNLOAD_PENDING': {
            const download = Object.assign({}, state.download, {
                pendingDownload: action.state
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'SET_BULK_DOWNLOAD_COLLAPSED': {
            const download = Object.assign({}, state.download, {
                showCollapsedProgress: action.collapsed
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'RESET_BULK_DOWNLOAD': {
            const download = Object.assign({}, initialState.download);

            return Object.assign({}, state, {
                download
            });
        }
        default:
            return state;
    }
};

export default bulkDownloadReducer;
