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
    }
};

const bulkDownloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AWARD_DATA_GENERIC': {
            const awardData = Object.assign({}, state.awardData, {
                [action.propertyType]: action.propertyValue
            });

            return Object.assign({}, state, {
                awardData
            });
        }
        case 'UPDATE_AWARD_FILTER_GENERIC': {
            const filters = Object.assign({}, state.awardData.filters, {
                [action.filterType]: action.filterValue
            });

            const awardData = Object.assign({}, state.awardData, {
                filters
            });

            return Object.assign({}, state, {
                awardData
            });
        }
        case 'CLEAR_AWARD_FILTERS': {
            const awardData = Object.assign({}, initialState.awardData);

            return Object.assign({}, state, {
                awardData
            });
        }
        default:
            return state;
    }
};

export default bulkDownloadReducer;
