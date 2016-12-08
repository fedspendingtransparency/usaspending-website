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
    fy: state.fy,
    start: state.startDate,
    end: state.endDate
});

export const setLocationList = (state) => ({
    type: 'SET_LOCATION_LIST',
    locations: state.locationArray
});

export const updateLocation = (state) => ({
    type: 'UPDATE_SEARCH_FILTER_LOCATION',
    locationSelected: state.selectedLocation
});
