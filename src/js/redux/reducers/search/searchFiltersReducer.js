/**
 * searchFiltersReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Set } from 'immutable';

const initialState = {
    awardType: new Set(),
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null
};

const immutableSetToggle = (set, value) => {
    // as an ImmutableJS set, any modifications to the set creates a new instance
    // this will hold the new instance
    let updatedSet;
    // check to see if the value currently exists within the set
    if (set.includes(value)) {
        // it exists, so remove it from the set
        updatedSet = set.delete(value);
    }
    else {
        // it doesn't exist, so add it to the set
        updatedSet = set.add(value);
    }
    // return the new instance with updated values
    return updatedSet;
};

const searchFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SEARCH_FILTER_AWARD_TYPE': {
            // this redux state is stored in an ImmutableJS set, which returns new instances
            // whenever it is modified; updatedAwards will hold the modified instance
            return Object.assign({}, state, {
                awardType: immutableSetToggle(state.awardType, action.awardType)
            });
        }
        case 'UPDATE_SEARCH_FILTER_TIME_PERIOD_FY': {
            // FY time period is stored as an ImmutableJS set
            return Object.assign({}, state, {
                timePeriodStart: null,
                timePeriodEnd: null,
                timePeriodFY: immutableSetToggle(state.timePeriodFY, action.fy)
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
