/**
 * searchFiltersReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Set } from 'immutable';

import * as AwardFilterFunctions from './filters/awardFilterFunctions';

const initialState = {
    awardType: new Set(),
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null
};

const searchFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SEARCH_FILTER_AWARD_TYPE': {
            // this redux state is stored in an ImmutableJS set, which returns new instances
            // whenever it is modified
            return Object.assign({}, state, {
                awardType: AwardFilterFunctions.immutableSetToggle(
                    state.awardType, action.awardType)
            });
        }
        case 'BULK_SEARCH_FILTER_AWARD_TYPE': {
            return Object.assign({}, state, {
                awardType: AwardFilterFunctions.bulkAwardTypeChange(
                    state.awardType, action.awardTypes, action.direction)
            });
        }
        case 'UPDATE_SEARCH_FILTER_TIME_PERIOD_FY': {
            // FY time period is stored as an ImmutableJS set
            return Object.assign({}, state, {
                timePeriodStart: null,
                timePeriodEnd: null,
                timePeriodFY: AwardFilterFunctions.immutableSetToggle(
                    state.timePeriodFY, action.fy)
            });
        }
        case 'SET_SEARCH_FILTER_TIME_PERIOD_START':
            return Object.assign({}, state, {
                timePeriodStart: action.start,
                timePeriodFY: state.timePeriodFY.clear()
            });
        case 'SET_SEARCH_FILTER_TIME_PERIOD_END':
            return Object.assign({}, state, {
                timePeriodEnd: action.end,
                timePeriodFY: state.timePeriodFY.clear()
            });
        default:
            return state;
    }
};

export default searchFiltersReducer;
