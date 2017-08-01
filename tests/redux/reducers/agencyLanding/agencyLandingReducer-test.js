/**
 * agencyLandingReducer-test.js
 * Created by Lizzie Salita 7/26/17
 */

import agencyLandingReducer, { initialState, Agency } from 'redux/reducers/agencyLanding/agencyLandingReducer';
import Immutable from 'immutable';

describe('agencyLandingReducer', () => {
    describe('SET_AGENCIES', () => {
        it('should add Agency objects to the Redux store', () => {
            let state = agencyLandingReducer(initialState, {});

            const model = [
                new Agency({
                        agency_id: 1,
                        agency_name: 'Test 1',
                        budget_authority_amount: '1234567',
                        percentage_of_total_budget_authority: '0.012'
                    }),
                    new Agency ({
                        agency_id: 2,
                        agency_name: 'Test 2',
                        budget_authority_amount: '2345678',
                        percentage_of_total_budget_authority: '0.023'
                    })
            ];
            const action = {
              type: 'SET_AGENCIES',
              agencies: model
            };

            state = agencyLandingReducer(state, action);

            const expectedState = new Immutable.OrderedSet([
                new Agency({
                    agency_id: 1,
                    agency_name: 'Test 1',
                    budget_authority_amount: '1234567',
                    percentage_of_total_budget_authority: '0.012'
                }),
                new Agency ({
                    agency_id: 2,
                    agency_name: 'Test 2',
                    budget_authority_amount: '2345678',
                    percentage_of_total_budget_authority: '0.023'
                })
            ]);
            expect(state.agencies).toEqual(expectedState);
        });
    });

    describe('SET_AUTOCOMPLETE_AGENCIES', () => {
        it('should add Autocomplete Agency Ids to the Redux store', () => {
            let state = agencyLandingReducer(initialState, {});

            const model = [1, 2];

            const action = {
                type: 'SET_AUTOCOMPLETE_AGENCIES',
                agencies: model
            };

            state = agencyLandingReducer(state, action);

            expect(state.autocompleteAgencies).toEqual(model);
        });
    });

    describe('SET_AGENCIES_ORDER', () => {
        it('should add Autocomplete Agency Ids to the Redux store', () => {
            let state = agencyLandingReducer(initialState, {});

            const model = {
                direction: 'asc',
                field: 'budget_authority_amount'
            };

            const action = {
                type: 'SET_AGENCIES_ORDER',
                order: model
            };

            state = agencyLandingReducer(state, action);

            expect(state.agenciesOrder).toEqual(model);
        });
    });
});
