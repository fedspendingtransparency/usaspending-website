/**
 * @jest-environment jsdom
 *
 * agencyReducer-test.js
 * Created by Lizzie Salita 5/26/20
 */

import dayjs from "dayjs";
import BaseAgencyOverview from 'models/v2/agency/BaseAgencyOverview';
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';
import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';
import BaseSubagencySpendingRow from 'models/v2/agency/BaseSubagencySpendingRow';
import BaseStatusOfFundsLevel from 'models/v2/agency/BaseStatusOfFundsLevel';
import agencyReducer, { initialState } from 'redux/reducers/agency/agencyReducer';
import { mockAgency } from '../../../models/agency/BaseAgencyOverview-test';
import { mockBudgetaryResources } from '../../../models/agency/BaseAgencyBudgetaryResources-test';
import { mockSubcomponent } from '../../../models/agency/BaseStatusOfFundsLevel-test';

const agencyOverview = Object.create(BaseAgencyOverview);
agencyOverview.populate(mockAgency);
const budgetaryResources20 = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources20.populate(mockBudgetaryResources.agency_data_by_year[1]);

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
                budgetaryResources: { 2020: budgetaryResources20 }
            };

            state = agencyReducer(state, action);

            expect(Object.getPrototypeOf(state.budgetaryResources[2020])).toEqual(BaseAgencyBudgetaryResources);
            expect(state.budgetaryResources[2020]._agencyBudget).toEqual(322370908923.19);
        });
    });

    describe('SET_AWARD_OBLIGATIONS', () => {
        it('should set the agency obligated amount to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_AWARD_OBLIGATIONS',
                awardObligations: 123456789.01
            };

            state = agencyReducer(state, action);

            expect(state._awardObligations).toEqual(123456789.01);
        });
    });

    describe('RESET_AWARD_OBLIGATIONS', () => {
        it('should reset award obligations to its initial state', () => {
            let state = agencyReducer({
                _awardObligations: 123456789.01
            }, {});

            const action = {
                type: 'RESET_AWARD_OBLIGATIONS'
            };

            state = agencyReducer(state, action);

            expect(state._awardObligations).toEqual(null);
        });
    });

    describe('SET_SUBCOMPONENT', () => {
        it('should set the selected subcomponent to the provided object', () => {
            const subcomponent = Object.create(BaseStatusOfFundsLevel);
            subcomponent.populate(mockSubcomponent);

            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_SUBCOMPONENT',
                subcomponent
            };

            state = agencyReducer(state, action);

            expect(Object.getPrototypeOf(state.selectedSubcomponent)).toEqual(BaseStatusOfFundsLevel);
            expect(state.selectedSubcomponent.name).toEqual(mockSubcomponent.name);
        });
    });

    describe('SET_FEDERAL_ACCOUNT', () => {
        it('should set federalAccount to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_FEDERAL_ACCOUNT',
                federalAccount: 'account'
            };

            state = agencyReducer(state, action);

            expect(state.selectedFederalAccount).toEqual('account');
        });
    });

    describe('SET_TAS', () => {
        it('should set selectedTas to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_TAS',
                tas: 'TAS'
            };

            state = agencyReducer(state, action);

            expect(state.selectedTas).toEqual('TAS');
        });
    });

    describe('SET_PA_OR_OC', () => {
        it('should set selectedPrgActivityOrObjectClass to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_PA_OR_OC',
                prgActivityOrObjectClass: 'Program Activity'
            };

            state = agencyReducer(state, action);

            expect(state.selectedPrgActivityOrObjectClass).toEqual('Program Activity');
        });
    });

    describe('SET_CURRENT_LEVEL_NAME_AND_ID', () => {
        it('should set currentLevelNameAndId to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_CURRENT_LEVEL_NAME_AND_ID',
                nameAndId: { name: 'name', id: 'id' }
            };

            state = agencyReducer(state, action);

            expect(state.currentLevelNameAndId).toEqual({ name: 'name', id: 'id' });
        });
    });

    describe('SET_LEVEL_4_API_RESPONSE', () => {
        it('should set level4ApiResponse to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_LEVEL_4_API_RESPONSE',
                resObject: { one: 'one', two: 'two' }
            };

            state = agencyReducer(state, action);

            expect(state.level4ApiResponse).toEqual({ one: 'one', two: 'two' });
        });
    });

    describe('SET_AGENCY_RECIPIENTS', () => {
        it('should set recipientDistribution to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_AGENCY_RECIPIENTS',
                recipientDistribution: { test: 'hello' }
            };

            state = agencyReducer(state, action);

            expect(state.recipientDistribution.test).toEqual('hello');
        });
    });

    describe('RESET_AGENCY_RECIPIENTS', () => {
        it('should reset award obligations to its initial state', () => {
            let state = agencyReducer({
                recipientDistribution: { test: 'hello' }
            }, {});

            const action = {
                type: 'RESET_AGENCY_RECIPIENTS'
            };

            state = agencyReducer(state, action);

            expect(state.recipientDistribution).toEqual(initialState.recipientDistribution);
            expect(Object.getPrototypeOf(state.recipientDistribution)).toEqual(BaseAgencyRecipients);
        });
    });

    describe('SET_SUBAGENCY_TOTALS', () => {
        it('should set spendingBySubagencyTotals to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_SUBAGENCY_TOTALS',
                spendingBySubagencyTotals: 'totals'
            };

            state = agencyReducer(state, action);

            expect(state.spendingBySubagencyTotals).toEqual('totals');
        });
    });

    describe('RESET_SUBAGENCY_TOTALS', () => {
        it('should reset spendingBySubagencyTotals to its initial state', () => {
            let state = agencyReducer({
                spendingBySubagencyTotals: 'totals'
            }, {});

            const action = {
                type: 'RESET_SUBAGENCY_TOTALS'
            };

            state = agencyReducer(state, action);

            expect(state.spendingBySubagencyTotals).toEqual(initialState.spendingBySubagencyTotals);
            expect(Object.getPrototypeOf(state.spendingBySubagencyTotals)).toEqual(BaseSubagencySpendingRow);
        });
    });

    describe('SET_AGENCY_SLUGS', () => {
        it('should set agencySlugs, topTierCodes, agencyIds, agencyOutlays to the provided values', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_AGENCY_SLUGS',
                agencySlugs: { slugs: 'slugs' },
                topTierCodes: { codes: 'codes' },
                agencyIds: { ids: 'ids' },
                agencyOutlays: { outlays: 'outlays' }
            };

            state = agencyReducer(state, action);

            expect(state.agencySlugs).toEqual({ slugs: 'slugs' });
            expect(state.topTierCodes).toEqual({ codes: 'codes' });
            expect(state.agencyIds).toEqual({ ids: 'ids' });
            expect(state.agencyOutlays).toEqual({ outlays: 'outlays' });
        });
    });

    describe('SET_DATA_THROUGH_DATES', () => {
        it('should set dataThroughDates to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const today = dayjs();

            const action = {
                type: 'SET_DATA_THROUGH_DATES',
                dates: today
            };

            state = agencyReducer(state, action);

            expect(state.dataThroughDates).toEqual(today);
        });
    });

    describe('SET_IS_SOF_CHART_LOADED', () => {
        it('should set isStatusOfFundsChartLoaded to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const action = {
                type: 'SET_IS_SOF_CHART_LOADED',
                payload: 'chart status'
            };

            state = agencyReducer(state, action);

            expect(state.isStatusOfFundsChartLoaded).toEqual('chart status');
        });
    });

    describe('RESET_AGENCY', () => {
        it('should reset the agency to its initial state', () => {
            let state = agencyReducer(undefined, {
                budgetaryResources: { 2020: budgetaryResources20 }
            });

            const action = {
                type: 'RESET_AGENCY'
            };
            state = agencyReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
