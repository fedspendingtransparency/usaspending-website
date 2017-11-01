/**
 * bulkDownloadReducer.js
 * Created by Lizzie Salita 10/31/17
 **/

export const initialState = {
    awardData: {
        award_levels: [],
        filters: {
            award_types: [],
            agency: '',
            sub_agency: '',
            date_type: '',
            date_range: {
                start_date: '',
                end_date: ''
            }
        },
        columns: [],
        file_format: ''
    },
    agencies: [],
    subAgencies: []
};

const bulkDownloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DOWNLOAD_FILTERS': {
            return Object.assign({}, state, {
                [action.dataType]: action.filterObject
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
        default:
            return state;
    }
};

export default bulkDownloadReducer;
