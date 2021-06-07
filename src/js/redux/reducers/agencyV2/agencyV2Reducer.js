/**
 * agencyReducer.js
 * Created by Lizzie Salita 5/26/20
 */

import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';

// Create an empty budgetary resources object for the initial state
const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources.populate();

export const initialState = {
    overview: {
        name: '',
        covidDefCodes: []
    },
    budgetaryResources,
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
