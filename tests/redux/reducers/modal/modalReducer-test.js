/**
 * @jest-environment jsdom
 * 
 * redirectModalReducer-test.js
 * Created by Lizzie Salita 2/22/18
 */

import redirectModalReducer, { initialState } from 'redux/reducers/modal/modalReducer';

describe('redirectModalReducer', () => {
    describe('SHOW_MODAL', () => {
        it('should set the display value to true', () => {
            let state = redirectModalReducer(undefined, {});
            const mockUrl = 'www.google.com';

            expect(state.display).toBeFalsy();

            const action = {
                type: 'SHOW_MODAL',
                url: mockUrl
            };

            state = redirectModalReducer(state, action);

            expect(state.display).toBeTruthy();
        });
        it('should set the url', () => {
            let state = redirectModalReducer(undefined, {});
            const mockUrl = 'www.google.com';

            expect(state.display).toBeFalsy();

            const action = {
                type: 'SHOW_MODAL',
                url: mockUrl
            };

            state = redirectModalReducer(state, action);

            expect(state.url).toEqual(mockUrl);
        });
    });

    describe('HIDE_MODAL', () => {
        it('should set the display value to false', () => {
            const mockUrl = 'www.google.com';
            const startingState = Object.assign({}, initialState, {
                display: true,
                url: mockUrl
            });

            let state = redirectModalReducer(startingState, {});

            expect(state.display).toBeTruthy();

            const action = {
                type: 'HIDE_MODAL'
            };

            state = redirectModalReducer(state, action);

            expect(state.display).toBeFalsy();
        });
        it('should reset the url to an empty string', () => {
            const mockUrl = 'www.google.com';
            const startingState = Object.assign({}, initialState, {
                display: true,
                url: mockUrl
            });

            let state = redirectModalReducer(startingState, {});

            expect(state.url).toBeTruthy();

            const action = {
                type: 'HIDE_MODAL'
            };

            state = redirectModalReducer(state, action);

            expect(state.url).toBeFalsy();
        });
        it('should reset modal property to an empty string', () => {
            const mockUrl = 'www.google.com';
            const startingState = Object.assign({}, initialState, {
                display: true,
                url: mockUrl,
                modal: 'redirect'
            });

            let state = redirectModalReducer(startingState, {});

            expect(state.url).toBeTruthy();

            const action = {
                type: 'HIDE_MODAL'
            };

            state = redirectModalReducer(state, action);

            expect(state.modal).toBeFalsy();
        });
    });
});
