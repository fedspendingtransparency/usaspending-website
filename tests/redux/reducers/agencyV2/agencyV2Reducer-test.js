/**
 * agencyV2Reducer-test.js
 * Created by Lizzie Salita 5/26/20
 */

import BaseAgencyOverview from 'models/v2/agency/BaseAgencyOverview';
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';
import agencyReducer, { initialState } from 'redux/reducers/agencyV2/agencyV2Reducer';
import { mockAgency } from '../../../models/agency/BaseAgencyOverview-test';
import { mockBudgetaryResources } from '../../../models/agency/BaseAgencyBudgetaryResources-test';

const agencyOverview = Object.create(BaseAgencyOverview);
agencyOverview.populate(mockAgency);
const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources.populate(mockBudgetaryResources);

describe('agencyReducer', () => {
    describe('SET_AGENCY_OVERVIEW', () => {
        it('should set the agency overview to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_AGENCY_OVERVIEW',
                overview: agencyOverview
            };

            state = agencyReducer(state, action);

            expect(Object.getPrototypeOf(state.overview)).toEqual(BaseAgencyOverview);
            expect(state.overview.name).toEqual('Mock Agency (ABC)');
        });
    });

    describe('SET_BUDGETARY_RESOURCES', () => {
        it('should set the agency budgetary resources to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_BUDGETARY_RESOURCES',
                budgetaryResources
            };

            state = agencyReducer(state, action);

            expect(Object.getPrototypeOf(state.budgetaryResources)).toEqual(BaseAgencyBudgetaryResources);
            expect(state.budgetaryResources.dataByYear['2020']._agencyBudget).toEqual(322370908923.19);
        });
    });

    describe('SET_BUDGET_CATEGORY_COUNT', () => {
        it('should set the budgetary category count for the specified tab to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_BUDGET_CATEGORY_COUNT',
                tab: 'programActivity',
                count: 100
            };

            state = agencyReducer(state, action);

            expect(state.budgetCategoryCounts.programActivity).toEqual(100);
        });
    });

    describe('RESET_BUDGET_CATEGORY_COUNTS', () => {
        it('should reset the budget category counts to their initial state', () => {
            let state = agencyReducer(undefined, {
                budgetCategoryCounts: {
                    programActivity: 200,
                    objectClass: 300,
                    federalAccount: 25
                }
            });

            const action = {
                type: 'RESET_BUDGET_CATEGORY_COUNTS'
            };

            state = agencyReducer(state, action);

            expect(state.budgetCategoryCounts.programActivity).toEqual(null);
            expect(state.budgetCategoryCounts.objectClass).toEqual(null);
            expect(state.budgetCategoryCounts.federalAccount).toEqual(null);
        });
    });

    describe('RESET_AGENCY', () => {
        it('should reset the agency to its initial state', () => {
            let state = agencyReducer(undefined, {
                budgetaryResources
            });

            const action = {
                type: 'RESET_AGENCY'
            };
            state = agencyReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
