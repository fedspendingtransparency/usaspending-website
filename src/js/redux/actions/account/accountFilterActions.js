/**
 * accountFilterActions.js
 * Created by Kevin Li 3/17/17
 */

export const updateTimePeriod = (state) => ({
    type: 'UPDATE_ACCOUNT_FILTER_TIME',
    dateType: state.dateType,
    fy: state.fy,
    start: state.startDate,
    end: state.endDate
});

export const resetTimeFilters = () => ({
    type: 'RESET_ACCOUNT_FILTER_TIME'
});

export const toggleObjectClass = (state) => ({
    type: 'TOGGLE_ACCOUNT_OBJECT_CLASS',
    item: state
});

export const resetAccountFilters = () => ({
    type: 'RESET_ACCOUNT_FILTERS'
});
