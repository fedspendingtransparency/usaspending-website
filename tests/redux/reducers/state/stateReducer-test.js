/**
 * @jest-environment jsdom
 * 
 * stateReducer-test.js
 * Created by Lizzie Salita 5/7/18
 */

import BaseStateProfile from 'models/v2/state/BaseStateProfile';

import stateReducer, { initialState } from 'redux/reducers/state/stateReducer';

const data = {
    fips: '123',
    name: 'Mock State',
    fy: 1992,
    totalAmount: 12345,
    totalAwards: 9876
};
const model = Object.create(BaseStateProfile);
model.populate(data);

describe('stateReducer', () => {
    describe('SET_STATE_OVERVIEW', () => {
        it('should set the state profile overview to the provided value', () => {
            let state = stateReducer(undefined, {});

            const action = {
                type: 'SET_STATE_OVERVIEW',
                overview: model
            };

            state = stateReducer(state, action);

            expect(state.overview).toEqual(model);
            expect(state.id).toEqual('123');
        });
    });
    describe('SET_STATE_FY', () => {
        it('should set the fiscal year to the provided value', () => {
           let state = stateReducer(undefined, {});

           const action = {
               type: 'SET_STATE_FY',
               fy: 'all'
           };

           state = stateReducer(state, action);

           expect(state.fy).toEqual('all');
        });
    });
    describe('SET_STATE_CENTER', () => {
        it('should set the center coordinates to the provided value', () => {
            let state = stateReducer(undefined, {});

            const action = {
                type: 'SET_STATE_CENTER',
                center: [1.23, -4.56]
            };

            state = stateReducer(state, action);

            expect(state.center).toEqual([1.23, -4.56]);
        });
    });
    describe('RESET_STATE', () => {
        it('should reset the state profile to its initial state', () => {
            let state = stateReducer(undefined, {
                overview: model,
                id: '123',
                fy: 'all'
            });

            const action = {
                type: 'RESET_STATE'
            };
            state = stateReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
