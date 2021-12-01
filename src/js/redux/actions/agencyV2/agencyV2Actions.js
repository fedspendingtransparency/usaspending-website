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

export const setAwardObligations = (awardObligations) => ({
    type: 'SET_AWARD_OBLIGATIONS',
    awardObligations
});

export const resetAwardObligations = () => ({
    type: 'RESET_AWARD_OBLIGATIONS'
});

export const setSelectedSubcomponent = (subcomponent) => ({
    type: 'SET_SUBCOMPONENT',
    subcomponent
});

export const setAgencyRecipients = (recipientDistribution) => ({
    type: 'SET_AGENCY_RECIPIENTS',
    recipientDistribution
});

export const resetAgencyRecipients = () => ({
    type: 'RESET_AGENCY_RECIPIENTS'
});

export const setSubagencyCount = (subagencyCount) => ({
    type: 'SET_SUBAGENCY_COUNT',
    subagencyCount
});

export const resetSubagencyCount = () => ({
    type: 'RESET_SUBAGENCY_COUNT'
});

export const setSubagencyTotals = (spendingBySubagencyTotals) => ({
    type: 'SET_SUBAGENCY_TOTALS',
    spendingBySubagencyTotals
});

export const setAgencySlugs = (agencySlugs) => ({
    type: 'SET_AGENCY_SLUGS',
    agencySlugs
});

export const resetSubagencyTotals = () => ({
    type: 'RESET_SUBAGENCY_TOTALS'
});

export const resetAgency = () => ({
    type: 'RESET_AGENCY'
});
