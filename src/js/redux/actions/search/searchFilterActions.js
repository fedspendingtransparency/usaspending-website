/**
  * searchFilterActions.js
  * Created by Kevin Li 11/1/16
  **/

export const toggleAwardType = (state) => ({
    type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
    awardType: state
});

export const bulkAwardTypeChange = (state) => ({
    type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
    awardTypes: state.awardTypes,
    direction: state.direction
});

export const updateTimePeriod = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
    dateType: state.dateType,
    fy: state.fy,
    start: state.startDate,
    end: state.endDate
});

export const clearAllFilters = () => ({
    type: 'CLEAR_SEARCH_FILTER_ALL'
});
