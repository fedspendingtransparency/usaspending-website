/**
 * agencyReducer.js
 * Created by Lizzie Salita 5/26/20
 */

import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';
import BaseAgencySubagencyCount from 'models/v2/agency/BaseAgencySubagencyCount';
import BaseSubagencySpendingRow from 'models/v2/agency/BaseSubagencySpendingRow';

// Create an empty recipient object for the initial state
const recipientDistribution = Object.create(BaseAgencyRecipients);
recipientDistribution.populate();

const subagencyCount = Object.create(BaseAgencySubagencyCount);
subagencyCount.populate();

const spendingBySubagencyTotals = Object.create(BaseSubagencySpendingRow);
spendingBySubagencyTotals.populateCore();

export const initialState = {
    overview: {
        name: '',
        covidDefCodes: []
    },
    budgetaryResources: {},
    _awardObligations: null,
    recipientDistribution,
    subagencyCount,
    spendingBySubagencyTotals,
    agencySlugs: {},
    topTierCodes: {},
    agencyOutlays: {},
    agencyIds: {},
    selectedSubcomponent: null,
    selectedFederalAccount: null,
    selectedTas: null,
    selectedPrgActivityOrObjectClass: null,
    currentLevelNameAndId: null,
    level4ApiResponse: null,
    awardSpendingDataThroughDate: null,
    isStatusOfFundsChartLoaded: false
};

const agencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AGENCY_OVERVIEW':
            return {
                ...state,
                overview: action.overview
            };
        case 'SET_BUDGETARY_RESOURCES':
            return {
                ...state,
                budgetaryResources: action.budgetaryResources
            };
        case 'SET_AWARD_OBLIGATIONS':
            return {
                ...state,
                _awardObligations: action.awardObligations
            };
        case 'RESET_AWARD_OBLIGATIONS':
            return {
                ...state,
                _awardObligations: initialState._awardObligations
            };
        case 'SET_SUBCOMPONENT':
            return {
                ...state,
                selectedSubcomponent: action.subcomponent
            };
        case 'SET_FEDERAL_ACCOUNT':
            return {
                ...state,
                selectedFederalAccount: action.federalAccount
            };
        case 'SET_TAS':
            return {
                ...state,
                selectedTas: action.tas
            };
        case 'SET_PA_OR_OC':
            return {
                ...state,
                selectedPrgActivityOrObjectClass: action.prgActivityOrObjectClass
            };
        case 'SET_CURRENT_LEVEL_NAME_AND_ID':
            return {
                ...state,
                currentLevelNameAndId: action.nameAndId
            };
        case 'SET_LEVEL_4_API_RESPONSE':
            return {
                ...state,
                level4ApiResponse: action.resObject
            };
        case 'SET_AGENCY_RECIPIENTS':
            return {
                ...state,
                recipientDistribution: action.recipientDistribution
            };
        case 'RESET_AGENCY_RECIPIENTS':
            return {
                ...state,
                recipientDistribution: initialState.recipientDistribution
            };
        case 'SET_SUBAGENCY_TOTALS':
            return {
                ...state,
                spendingBySubagencyTotals: action.spendingBySubagencyTotals
            };
        case 'RESET_SUBAGENCY_TOTALS':
            return {
                ...state,
                spendingBySubagencyTotals: initialState.spendingBySubagencyTotals
            };
        case 'SET_AGENCY_SLUGS':
            return {
                ...state,
                agencySlugs: action.agencySlugs,
                topTierCodes: action.topTierCodes,
                agencyIds: action.agencyIds,
                agencyOutlays: action.agencyOutlays
            };
        case 'SET_DATA_THROUGH_DATES':
            return {
                ...state,
                dataThroughDates: {
                    ...state.dataThroughDates,
                    ...action.dates
                }
            };
        case 'SET_IS_SOF_CHART_LOADED': {
            return Object.assign({}, state, { isStatusOfFundsChartLoaded: action.payload });
        }
        case 'RESET_AGENCY':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default agencyReducer;
