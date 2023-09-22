/**
 * @jest-environment jsdom
 * 
 * recipientReducer-test.js
 * Created by Lizzie Salita 6/26/18
 */

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';

import recipientReducer, { initialState } from 'redux/reducers/recipient/recipientReducer';

import { mockRecipientOverview } from '../../../models/recipient/mockRecipientApi';


const model = Object.create(BaseRecipientOverview);
model.populate(mockRecipientOverview);

describe('recipientReducer', () => {
    describe('SET_RECIPIENT_OVERVIEW', () => {
        it('should set the recipient profile overview to the provided value', () => {
            let state = recipientReducer(undefined, {});

            const action = {
                type: 'SET_RECIPIENT_OVERVIEW',
                overview: model
            };

            state = recipientReducer(state, action);

            expect(state.overview).toEqual(model);
            expect(state.id).toEqual('0123456-ABC-P');
        });
    });
    describe('SET_RECIPIENT_FY', () => {
        it('should set the fiscal year to the provided value', () => {
            let state = recipientReducer(undefined, {});

            const action = {
                type: 'SET_RECIPIENT_FY',
                fy: 'all'
            };

            state = recipientReducer(state, action);

            expect(state.fy).toEqual('all');
        });
    });
    describe('SET_RECIPIENT_CHILDREN', () => {
        it('should set the fiscal year to the provided value', () => {
            let state = recipientReducer(undefined, {});

            const mockChild = {
                duns: '1',
                name: 'Mock Child'
            };

            const action = {
                type: 'SET_RECIPIENT_CHILDREN',
                children: [mockChild]
            };

            state = recipientReducer(state, action);

            expect(state.children).toEqual([mockChild]);
        });
    });
    describe('RESET_RECIPIENT', () => {
        it('should reset the recipient profile to its initial state', () => {
            let state = recipientReducer(undefined, {
                overview: model,
                id: '123',
                fy: 'all'
            });

            const action = {
                type: 'RESET_RECIPIENT'
            };
            state = recipientReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
