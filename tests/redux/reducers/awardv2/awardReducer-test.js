/**
 * awardReducer-test.js
 * Created by Lizzie Salita 12/4/18
 */

import BaseContract from 'models/v2/awardsV2/BaseContract';

import awardReducer, { initialState } from 'redux/reducers/awardV2/awardReducer';

import { mockContract } from '../../../models/awardsV2/mockAwardApi';

const contractModel = Object.create(BaseContract);
contractModel.populate(mockContract);

describe('awardReducer', () => {
    describe('SET_AWARD', () => {
        it('should set the award overview, id, and category to the provided values', () => {
            let state = awardReducer(undefined, {});

            const action = {
                type: 'SET_AWARD',
                overview: contractModel,
                id: '123'
            };

            state = awardReducer(state, action);

            expect(state.overview).toEqual(contractModel);
            expect(state.id).toEqual('123');
            expect(state.category).toEqual('contract');
        });
    });
    describe('RESET_STATE', () => {
        it('should reset the award to its initial state', () => {
            let state = awardReducer(undefined, {
                overview: contractModel,
                id: '123',
                category: 'contract'
            });

            const action = {
                type: 'RESET_STATE'
            };
            state = awardReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
