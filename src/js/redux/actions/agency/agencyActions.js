/**
 * agencyActions.js
 * Created by Kevin Li 6/8/17
 */

export const setAgencyOverview = (state) => ({
    type: 'SET_AGENCY_OVERVIEW',
    overview: state
});

export const resetAgency = () => ({
    type: 'RESET_AGENCY'
});
