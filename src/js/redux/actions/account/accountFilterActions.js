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

export const setAvailableObjectClasses = (state) => ({
    type: 'SET_ACCOUNT_AVAILABLE_OBJECT_CLASSES',
    objectClass: state.values,
    objectClassDefinitions: state.definitions,
    objectClassChildren: state.children
});

export const bulkObjectClassesChange = (state) => ({
    type: 'BULK_ACCOUNT_TOGGLE_OBJECT_CLASSES',
    objectClasses: state.types,
    direction: state.direction
});

export const resetObjectClass = () => ({
    type: 'RESET_ACCOUNT_OBJECT_CLASS'
});

export const setAvailableProgramActivities = (state) => ({
    type: 'SET_AVAILABLE_PROGRAM_ACTIVITIES',
    programActivities: state
});

export const toggleProgramActivity = (state) => ({
    type: 'TOGGLE_ACCOUNT_PROGRAM_ACTIVITY',
    item: state
});

export const resetProgramActivity = () => ({
    type: 'RESET_ACCOUNT_PROGRAM_ACTIVITY'
});

export const resetAccountFilters = () => ({
    type: 'RESET_ACCOUNT_FILTERS'
});
