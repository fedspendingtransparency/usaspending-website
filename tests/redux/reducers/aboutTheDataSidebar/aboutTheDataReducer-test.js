/**
 * @jest-environment jsdom
 * 
 * aboutTheDataReducer-test.js
 * Created by Andrea Blackwell 12/14/2022
 */

import { Map } from 'immutable';
import aboutTheDataReducer, { initialState, Entry } from 'redux/reducers/aboutTheDataSidebar/aboutTheDataReducer';

describe('aboutTheDataReducer', () => {
    describe('SHOW_ABOUT_THE_DATA', () => {
        it('should set the display value to true', () => {
            let state = aboutTheDataReducer(undefined, {});

            expect(state.display).toBeFalsy();

            const action = {
                type: 'SHOW_ABOUT_THE_DATA'
            };

            state = aboutTheDataReducer(state, action);

            expect(state.display).toBeTruthy();
        });
    });

    describe('HIDE_ABOUT_THE_DATA', () => {
        it('should set the display value to false', () => {
            const startingState = Object.assign({}, initialState, {
                display: true
            });

            let state = aboutTheDataReducer(startingState, {});

            expect(state.display).toBeTruthy();

            const action = {
                type: 'HIDE_ABOUT_THE_DATA'
            };

            state = aboutTheDataReducer(state, action);

            expect(state.display).toBeFalsy();
        });
    });

    describe('SET_ABOUT_THE_DATA_SEARCH_VALUE', () => {
        it('should set the input to the specified value', () => {
            let state =  aboutTheDataReducer(undefined, {});
            expect(state.search.input).toEqual('');

            const action = {
                type: 'SET_ABOUT_THE_DATA_SEARCH_VALUE',
                value: 'test'
            };

            state =  aboutTheDataReducer(state, action);
            expect(state.search.input).toEqual('test');
        });

        it('should clear the currently selected term', () => {
            const startingState = Object.assign({}, initialState, {
                term: new Entry({
                    name: 'test term'
                })
            });
            let state =  aboutTheDataReducer(startingState, {});
            expect(state.term.name).toEqual('test term');

            const action = {
                type: 'SET_ABOUT_THE_DATA_SEARCH_VALUE',
                value: 'test'
            };

            state =  aboutTheDataReducer(state, action);
            expect(state.term).toEqual(new Entry());
            expect(state.term.name).toEqual('');
        });
    });

    describe('SET_ABOUT_THE_DATA_SEARCH_RESULTS', () => {
        it('should set the current results to the provided values', () => {
            let state =  aboutTheDataReducer(undefined, {});
            expect(state.search.results).toEqual([]);

            const action = {
                type: 'SET_ABOUT_THE_DATA_SEARCH_RESULTS',
                results: [
                    new Entry({
                        name: "Award",
                        slug: "award"
                    }),
                    new Entry({
                        name: "Award Amount",
                        slug: "award-amount"
                    })
                ]
            };

            state =  aboutTheDataReducer(state, action);
            expect(state.search.results).toEqual(action.results);
        });
    });

    describe('SET_ABOUT_THE_DATA_TERM', () => {
        it('should set the selected term to the provided value', () => {
            let state =  aboutTheDataReducer(undefined, {});
            expect(state.term).toEqual(new Entry());

            const action = {
                type: 'SET_ABOUT_THE_DATA_TERM',
                term: {
                    name: "Award",
                    slug: "award"
                }
            };

            state =  aboutTheDataReducer(state, action);
            expect(state.term).toEqual(new Entry(action.term));
        });
    });

    describe('CLEAR_ABOUT_THE_DATA_TERM', () => {
        it('should clear the currently selected term', () => {
            const startingState = Object.assign({}, initialState, {
                term: new Entry({
                    name: "Award",
                    slug: "award"
                })
            });
            let state =  aboutTheDataReducer(startingState, {});
            expect(state.term.name).toEqual('Award');

            const action = {
                type: 'CLEAR_ABOUT_THE_DATA_TERM'
            };
            state =  aboutTheDataReducer(state, action);
            expect(state.term.name).toEqual('');
            expect(state.term).toEqual(new Entry());
        });
    });
});
