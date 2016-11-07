/**
 * searchFiltersReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Set } from 'immutable';

const initialState = {
    awardType: new Set(),
    timePeriodFY: [],
    timePeriodStart: null,
    timePeriodEnd: null
};

const searchFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SEARCH_FILTER_AWARD_TYPE': {
            // this redux state is stored in an ImmutableJS set, which returns new instances
            // whenever it is modified; updatedAwards will hold the modified instance
            let updatedAwards;
            // check to see if the selected award type should be added or removed
            if (state.awardType.includes(action.awardType)) {
                // award type exists, so remove it
                updatedAwards = state.awardType.delete(action.awardType);
            }
            else {
                // award type does not yet exist, add it
                updatedAwards = state.awardType.add(action.awardType);
            }

            return Object.assign({}, state, {
                awardType: updatedAwards
            });
        }
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
