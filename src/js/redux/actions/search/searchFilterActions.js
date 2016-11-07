/**
  * searchFilterActions.js
  * Created by Kevin Li 11/1/16
  **/

export const toggleAwardType = (state) => ({
    type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
    awardType: state
});

export const updateTimePeriodFY = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD_FY',
    fy: state
});

export const setTimePeriodStart = (state) => ({
    type: 'SET_SEARCH_FILTER_TIME_PERIOD_START',
    start: state
});

export const setTimePeriodEnd = (state) => ({
    type: 'SET_SEARCH_FILTER_TIME_PERIOD_END',
    end: state
});
