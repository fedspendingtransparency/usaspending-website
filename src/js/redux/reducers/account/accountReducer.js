/**
 * accountReducer.js
 * Created by Kevin Li 3/17/17
 */

import { Set, OrderedSet, List } from 'immutable';

import * as ObjectClassFuncs from './filters/accountObjectClassFunctions';
import * as ProgramActivityFuncs from './filters/accountProgramActivityFunctions';

export const initialState = {
    filters: {
        dateType: 'fy',
        fy: new Set(),
        startDate: null,
        endDate: null,
        objectClass: new OrderedSet(),
        programActivity: new OrderedSet(),
        tas: []
    },
    filterOptions: {
        objectClass: [],
        programActivity: [],
        tas: [],
        objectClassDefinitions: {},
        objectClassChildren: {}
    },
    account: {
        id: null,
        agency_identifier: '',
        main_account_code: '',
        title: '',
        totals: {
            available: false,
            obligated: 0,
            unobligated: 0,
            budgetAuthority: 0,
            outlay: 0,
            balanceBroughtForward: 0,
            otherBudgetaryResources: 0,
            appropriations: 0
        }
    },
    totalSpending: 0,
    submissionPeriods: new List()
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ACCOUNT': {
            return Object.assign({}, state, {
                account: action.account
            });
        }
        case 'UPDATE_ACCOUNT_FILTER_TIME': {
            const filters = Object.assign({}, state.filters, {
                dateType: action.dateType,
                startDate: action.start,
                endDate: action.end,
                fy: new Set(action.fy)
            });

            return Object.assign({}, state, {
                filters
            });
        }
        case 'RESET_ACCOUNT_FILTER_TIME': {
            const filters = Object.assign({}, initialState.filters);
            return Object.assign({}, state, {
                filters
            });
        }

        // Object Classes
        case 'TOGGLE_ACCOUNT_OBJECT_CLASS': {
            const updatedOC = ObjectClassFuncs.toggleItem(state.filters.objectClass, action.item);
            const updatedFilters = Object.assign({}, state.filters, {
                objectClass: updatedOC
            });

            return Object.assign({}, state, {
                filters: updatedFilters
            });
        }
        case 'BULK_ACCOUNT_TOGGLE_OBJECT_CLASSES': {
            const updatedFilters = Object.assign({}, state.filters, {
                objectClass: ObjectClassFuncs.bulkObjectClassesChange(
                    state.filters.objectClass, action.objectClasses, action.direction)
            });
            return Object.assign({}, state, {
                filters: updatedFilters
            });
        }
        case 'SET_ACCOUNT_AVAILABLE_OBJECT_CLASSES': {
            const updatedFilterOptions = Object.assign({}, state.filterOptions, {
                objectClass: action.objectClass,
                objectClassDefinitions: action.objectClassDefinitions,
                objectClassChildren: action.objectClassChildren
            });
            return Object.assign({}, state, {
                filterOptions: updatedFilterOptions
            });
        }
        case 'RESET_ACCOUNT_OBJECT_CLASS': {
            const updatedFilters = Object.assign({}, state.filters, {
                objectClass: initialState.filters.objectClass
            });

            return Object.assign({}, state, {
                filters: updatedFilters
            });
        }

        // Program Activities
        case 'SET_AVAILABLE_PROGRAM_ACTIVITIES': {
            const updatedFilterOptions = Object.assign({}, state.filterOptions, {
                programActivity: action.programActivities
            });

            return Object.assign({}, state, {
                filterOptions: updatedFilterOptions
            });
        }
        case 'TOGGLE_ACCOUNT_PROGRAM_ACTIVITY': {
            const updatedPA = ProgramActivityFuncs.toggleItem(
                state.filters.programActivity, action.item);
            const updatedFilters = Object.assign({}, state.filters, {
                programActivity: updatedPA
            });

            return Object.assign({}, state, {
                filters: updatedFilters
            });
        }
        case 'RESET_ACCOUNT_PROGRAM_ACTIVITY': {
            const updatedFilters = Object.assign({}, state.filters, {
                programActivity: initialState.filters.programActivity
            });

            return Object.assign({}, state, {
                filters: updatedFilters
            });
        }

        case 'RESET_ACCOUNT_FILTERS': {
            return Object.assign({}, state, {
                filters: initialState.filters
            });
        }
        case 'RESET_ACCOUNT': {
            return Object.assign({}, initialState);
        }
        case 'SET_SUBMISSION_PERIODS': {
            return {
                ...state,
                submissionPeriods: new List(action.submissionPeriods)
            };
        }
        default:
            return state;
    }
};

export default accountReducer;
