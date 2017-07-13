/**
 * agencyLandingActions.js
 * Created by Lizzie Salita 7/10/17
 */

export const setAgencies = (state) => ({
    type: 'SET_AGENCIES',
    agencies: state
});

export const setAgenciesOrder = (state) => ({
    type: 'SET_AGENCIES_ORDER',
    order: state
});
