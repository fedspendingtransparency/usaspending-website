/**
 * searchFiltersReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Set, OrderedMap } from 'immutable';

import * as AwardFilterFunctions from './filters/awardFilterFunctions';
import * as LocationFilterFunctions from './filters/locationFilterFunctions';

const initialState = {
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all'
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
                timePeriodType: action.dateType,
                timePeriodStart: action.start,
                timePeriodEnd: action.end,
                timePeriodFY: new Set(action.fy)
            });
        }
        case 'UPDATE_SELECTED_LOCATIONS': {
            return Object.assign({}, state, {
                selectedLocations: LocationFilterFunctions.updateSelectedLocations(
                    state.selectedLocations, action.location)
            });
        }
        case 'UPDATE_DOMESTIC_FOREIGN': {
            return Object.assign({}, state, {
                locationDomesticForeign: action.selection
            });
        }
        case 'UPDATE_SEARCH_FILTER_GENERIC': {
            return Object.assign({}, state, {
                [action.filterType]: action.filterValue
            });
        }
        case 'RESET_SEARCH_TIME_FILTER': {
            return Object.assign({}, state, {
                timePeriodType: initialState.timePeriodType,
                timePeriodFY: initialState.timePeriodFY,
                timePeriodStart: initialState.timePeriodStart,
                timePeriodEnd: initialState.timePeriodEnd
            });
        }
        case 'CLEAR_SEARCH_FILTER_TYPE': {
            return Object.assign({}, state, {
                [action.filterType]: initialState[action.filterType]
            });
        }
        case 'CLEAR_SEARCH_FILTER_ALL': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default searchFiltersReducer;
