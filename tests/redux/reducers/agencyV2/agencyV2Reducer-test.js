/**
 * agencyV2Reducer-test.js
 * Created by Lizzie Salita 5/26/20
 */

import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';
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
            expect(state.budgetaryResources._agencyTotalObligated).toEqual(580584099.03);
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
