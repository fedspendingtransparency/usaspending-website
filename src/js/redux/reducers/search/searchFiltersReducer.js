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
    timePeriodEnd: null,
    locations: []
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
        case 'UPDATE_SEARCH_FILTER_TIME_PERIOD': {
            // FY time period is stored as an ImmutableJS set
            return Object.assign({}, state, {
                timePeriodStart: action.start,
                timePeriodEnd: action.end,
                timePeriodFY: new Set(action.fy)
            });
        }
        case 'SET_LOCATION_LIST': {
            return Object.assign({}, state, {
                locations: action.locations
            });
        }
        default:
            return state;
    }
};

export default searchFiltersReducer;
