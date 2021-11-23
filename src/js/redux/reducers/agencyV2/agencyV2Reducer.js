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
spendingBySubagencyTotals.populate();

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
    selectedSubcomponent: null
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
        case 'SET_SUBAGENCY_COUNT':
            return {
                ...state,
                subagencyCount: action.subagencyCount
            };
        case 'RESET_SUBAGENCY_COUNT':
            return {
                ...state,
                subagencyCount: initialState.subagencyCount
            };
        case 'SET_SUBAGENCY_TOTALS':
            return {
                ...state,
                spendingBySubagencyTotals: action.spendingBySubagencyTotals
            };
        case 'SET_AGENCY_SLUGS':
            return {
                ...state,
                agencySlugs: action.agencySlugs
            };
        case 'RESET_SUBAGENCY_TOTALS':
            return {
                ...state,
                spendingBySubagencyTotals: initialState.spendingBySubagencyTotals
            };
        case 'RESET_AGENCY':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default agencyReducer;
