/**
 * agencyActions.js
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

export const setSelectedFederalAccount = (federalAccount) => ({
    type: 'SET_FEDERAL_ACCOUNT',
    federalAccount
});

export const setSelectedTas = (tas) => ({
    type: 'SET_TAS',
    tas
});

export const setSelectedPrgActivityOrObjectClass = (prgActivityOrObjectClass) => ({
    type: 'SET_PA_OR_OC',
    prgActivityOrObjectClass
});

export const setCurrentLevelNameAndId = (nameAndId) => ({
    type: 'SET_CURRENT_LEVEL_NAME_AND_ID',
    nameAndId
});

export const setLevel4ApiResponse = (resObject) => ({
    type: 'SET_LEVEL_4_API_RESPONSE',
    resObject
});

export const setAgencyRecipients = (recipientDistribution) => ({
    type: 'SET_AGENCY_RECIPIENTS',
    recipientDistribution
});

export const resetAgencyRecipients = () => ({
    type: 'RESET_AGENCY_RECIPIENTS'
});

export const setSubagencyTotals = (spendingBySubagencyTotals) => ({
    type: 'SET_SUBAGENCY_TOTALS',
    spendingBySubagencyTotals
});

export const resetSubagencyTotals = () => ({
    type: 'RESET_SUBAGENCY_TOTALS'
});

export const setAgencySlugs = (agencySlugs, topTierCodes, agencyIds, agencyOutlays) => ({
    type: 'SET_AGENCY_SLUGS',
    agencySlugs,
    topTierCodes,
    agencyIds,
    agencyOutlays
});

export const setDataThroughDates = (dates) => ({
    type: 'SET_DATA_THROUGH_DATES',
    dates
});

export const setIsSofChartLoaded = (bool) => ({
    type: 'SET_IS_SOF_CHART_LOADED',
    payload: bool
});

export const resetAgency = () => ({
    type: 'RESET_AGENCY'
});
