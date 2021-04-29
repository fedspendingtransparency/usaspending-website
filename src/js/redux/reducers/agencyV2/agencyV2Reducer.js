/**
 * agencyReducer.js
 * Created by Lizzie Salita 5/26/20
 */

import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';

// Create an empty budgetary resources object for the initial state
const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);

export const initialState = {
    overview: {
        name: '',
        covidDefCodes: []
    },
    budgetaryResources
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
        case 'RESET_AGENCY':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default agencyReducer;
