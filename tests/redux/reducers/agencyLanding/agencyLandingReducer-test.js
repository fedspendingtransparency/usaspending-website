/**
 * @jest-environment jsdom
 * 
 * agencyLandingReducer-test.js
 * Created by Lizzie Salita 7/26/17
 */

import agencyLandingReducer, { initialState } from 'redux/reducers/agencyLanding/agencyLandingReducer';

describe('agencyLandingReducer', () => {
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
