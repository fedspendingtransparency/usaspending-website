/**
 * searchFiltersReducer.js
 * Created by Kevin Li 11/1/16
 **/

const initialState = {
    awardType: [],
    timePeriodFY: [],
    timePeriodStart: null,
    timePeriodEnd: null
};

const searchFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_FILTER_AWARD_TYPE':
            return Object.assign({}, state, {
                awardType: action.awardType
            });
        case 'SET_SEARCH_FILTER_TIME_PERIOD_FY':
            return Object.assign({}, state, {
                timePeriodStart: null,
                timePeriodEnd: null,
                timePeriodFY: action.fy
            });
        case 'SET_SEARCH_FILTER_TIME_PERIOD_START':
            return Object.assign({}, state, {
                timePeriodStart: action.start,
                timePeriodFY: []
            });
        case 'SET_SEARCH_FILTER_TIME_PERIOD_END':
            return Object.assign({}, state, {
                timePeriodEnd: action.end,
                timePeriodFY: []
            });
        default:
            return state;
    }
};

export default searchFiltersReducer;
