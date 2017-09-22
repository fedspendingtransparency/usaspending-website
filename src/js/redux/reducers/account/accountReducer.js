/**
 * accountReducer.js
 * Created by Kevin Li 3/17/17
 */

import { uniqueId, concat } from 'lodash';

import { Set, OrderedSet } from 'immutable';

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
        description: '',
        totals: {
            obligated: {},
            unobligated: {},
            budgetAuthority: {},
            outlay: {},
            balanceBroughtForward1: {},
            balanceBroughtForward2: {},
            otherBudgetaryResources: {},
            appropriations: {}
        }
    },
    awards: new OrderedSet(),
    awardsMeta: {
        batch: {
            queryId: uniqueId(),
            searchId: uniqueId()
        },
        page: 1,
        hasNext: false,
        type: 'contracts'
    },
    awardsOrder: {
        field: 'total_obligation',
        direction: 'desc'
    },
    totalSpending: 0
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ACCOUNT': {
            return Object.assign({}, state, {
                account: action.account
            });
        }
        case 'SET_ACCOUNT_AWARD_ITEMS': {
            const meta = Object.assign({}, state.awardsMeta, {
                batch: {
                    queryId: uniqueId(),
                    searchId: uniqueId()
                },
                page: 1,
                hasNext: action.hasNext
            });

            return Object.assign({}, state, {
                awards: new OrderedSet(action.awards),
                awardsMeta: meta
            });
        }
        case 'APPEND_ACCOUNT_AWARD_ITEMS': {
            const meta = Object.assign({}, state.awardsMeta, {
                batch: {
                    queryId: uniqueId(),
                    searchId: state.awardsMeta.batch.searchId
                },
                page: action.page,
                hasNext: action.hasNext
            });

            return Object.assign({}, state, {
                awards: new OrderedSet(concat(state.awards.toArray(), action.awards)),
                awardsMeta: meta
            });
        }
        case 'SET_ACCOUNT_AWARD_TYPE': {
            const meta = Object.assign({}, state.awardsMeta, {
                batch: {
                    queryId: uniqueId(),
                    searchId: uniqueId()
                },
                type: action.awardType
            });

            return Object.assign({}, state, {
                awardsMeta: meta
            });
        }
        case 'SET_ACCOUNT_AWARD_ORDER': {
            const order = Object.assign({}, state.awardsOrder, action.order);

            return Object.assign({}, state, {
                awardsOrder: order
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
        default:
            return state;
    }
};

export default accountReducer;
