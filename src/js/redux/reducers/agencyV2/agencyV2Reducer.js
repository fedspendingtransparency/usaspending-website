/**
 * agencyReducer.js
 * Created by Lizzie Salita 5/26/20
 */

import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';

// Create an empty recipient object for the initial state
const recipientDistribution = Object.create(BaseAgencyRecipients);
recipientDistribution.populate();

export const initialState = {
    overview: {
        name: '',
        covidDefCodes: []
    },
    budgetaryResources: {},
    _awardObligations: null,
    recipientDistribution,
    budgetCategoryCounts: {
        objectClass: null,
        programActivity: null,
        federalAccount: null
    }
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
        case 'SET_BUDGET_CATEGORY_COUNT':
            return {
                ...state,
                budgetCategoryCounts: {
                    ...state.budgetCategoryCounts,
                    [action.tab]: action.count
                }
            };
        case 'RESET_BUDGET_CATEGORY_COUNTS':
            return {
                ...state,
                budgetCategoryCounts: initialState.budgetCategoryCounts
            };
        case 'RESET_AGENCY':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default agencyReducer;
