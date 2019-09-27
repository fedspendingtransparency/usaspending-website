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
                overview: contractModel
            };

            state = awardReducer(state, action);

            expect(state.overview).toEqual(contractModel);
            expect(state.id).toEqual('6657452ew23');
            expect(state.category).toEqual('contract');
        });
    });
    describe('SET_COUNTS', () => {
        it('should set the referenced award counts to the provided object', () => {
            let state = awardReducer(undefined, {});

            const action = {
                type: 'SET_COUNTS',
                counts: {
                    idvs: 42,
                    contracts: 55
                }
            };

            state = awardReducer(state, action);

            expect(state.counts.idvs).toEqual(42);
            expect(state.counts.contracts).toEqual(55);
        });
    });
    describe('SET_TOTAL_TRANSACTION_OBLIGATED_AMOUNT', () => {
        it('should set the transaction obligated total to the provided amount', () => {
            let state = awardReducer(undefined, {});

            const action = {
                type: 'SET_TOTAL_TRANSACTION_OBLIGATED_AMOUNT',
                total: 12345678
            };

            state = awardReducer(state, action);

            expect(state.totalTransactionObligatedAmount).toEqual(12345678);
        });
    });
    describe('RESET_STATE', () => {
        it('should reset the award to its initial state', () => {
            let state = awardReducer(undefined, {
                overview: contractModel
            });

            const action = {
                type: 'RESET_STATE'
            };
            state = awardReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
