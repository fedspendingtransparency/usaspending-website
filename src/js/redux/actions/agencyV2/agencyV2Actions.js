/**
 * agencyV2Actions.js
 * Created by Lizzie Salita 5/26/20
 */

export const setAgencyOverview = (overview) => ({
    type: 'SET_AGENCY_OVERVIEW',
    overview
});

export const setBudgetaryResources = (budgetaryResources) => ({
    type: 'SET_BUDGETARY_RESOURCES',
    budgetaryResources
});

export const resetAgency = () => ({
    type: 'RESET_AGENCY'
});
