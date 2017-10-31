/**
 * downloadActions.js
 * Created by Lizzie Salita 10/31/17
 */

export const updateGenericAwardData = (state) => ({
    type: 'UPDATE_AWARD_DATA_GENERIC',
    propertyType: state.type,
    propertyValue: state.value
});

export const updateGenericAwardFilter = (state) => ({
    type: 'UPDATE_AWARD_FILTER_GENERIC',
    filterType: state.type,
    filterValue: state.value
});

export const clearAwardFilters = () => ({
    type: 'CLEAR_AWARD_FILTERS'
});
