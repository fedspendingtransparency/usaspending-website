/**
 * agencyReducer-test.js
 * Created by Kevin Li 6/15/17
 */

import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';

import agencyReducer, { initialState } from 'redux/reducers/agency/agencyReducer';

describe('agencyReducer', () => {
    describe('SET_AGENCY_OVERVIEW', () => {
        it('should set the agency overview to the provided value', () => {
            let state = agencyReducer(undefined, {});

            const model = new AgencyOverviewModel({
                id: '123',
                name: 'Department of Test',
                activeFY: '2017'
            });

            const action = {
                type: 'SET_AGENCY_OVERVIEW',
                overview: model
            };

            state = agencyReducer(state, action);

            expect(state.overview.toJS()).toEqual(model.toJS());
            expect(state.id).toEqual('123');
        });
    });

    describe('RESET_AGENCY', () => {
        it('should reset the agency to its initial state', () => {
            const model = new AgencyOverviewModel({
                id: '123',
                name: 'Department of Test',
                activeFY: '2017'
            });

            let state = agencyReducer(undefined, {
                overview: model,
                id: '123'
            });

            const action = {
                type: 'RESET_AGENCY'
            };
            state = agencyReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
