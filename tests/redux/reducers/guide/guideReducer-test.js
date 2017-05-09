/**
 * guideReducer-test.js
 * Created by Kevin Li 5/3/17
 */

import guideReducer, { initialState, Definition } from 'redux/reducers/guide/guideReducer';

describe('guideReducer', () => {
    describe('SHOW_GUIDE', () => {
        it('should set the display value to true', () => {
            let state = guideReducer(undefined, {});

            expect(state.display).toBeFalsy();

            const action = {
                type: 'SHOW_GUIDE'
            };

            state = guideReducer(state, action);

            expect(state.display).toBeTruthy();
        });
    });

    describe('HIDE_GUIDE', () => {
        it('should set the display value to false', () => {
            const startingState = Object.assign({}, initialState, {
                display: true
            });

            let state = guideReducer(startingState, {});

            expect(state.display).toBeTruthy();

            const action = {
                type: 'HIDE_GUIDE'
            };

            state = guideReducer(state, action);

            expect(state.display).toBeFalsy();
        });
    });

    describe('TOGGLE_GUIDE', () => {
        it('should set the display to true when it is currently false', () => {
            const startingState = Object.assign({}, initialState, {
                display: false
            });
            let state = guideReducer(startingState, {});
            expect(state.display).toBeFalsy();

            const action = {
                type: 'TOGGLE_GUIDE'
            };
            state = guideReducer(state, action);
            expect(state.display).toBeTruthy();
        });

        it('should set the display to false when it is currentl true', () => {
            const startingState = Object.assign({}, initialState, {
                display: true
            });
            let state = guideReducer(startingState, {});
            expect(state.display).toBeTruthy();

            const action = {
                type: 'TOGGLE_GUIDE'
            };
            state = guideReducer(state, action);
            expect(state.display).toBeFalsy();
        });
    });

    describe('SET_GUIDE_SEARCH_VALUE', () => {
        it('should set the input to the specified value', () => {
            let state = guideReducer(undefined, {});
            expect(state.search.input).toEqual('');

            const action = {
                type: 'SET_GUIDE_SEARCH_VALUE',
                value: 'test'
            };

            state = guideReducer(state, action);
            expect(state.search.input).toEqual('test');
        });

        it('should clear the currently selected term', () => {
            const startingState = Object.assign({}, initialState, {
                term: new Definition({
                    term: 'test term'
                })
            });
            let state = guideReducer(startingState, {});
            expect(state.term.term).toEqual('test term');

            const action = {
                type: 'SET_GUIDE_SEARCH_VALUE',
                value: 'test'
            };

            state = guideReducer(state, action);
            expect(state.term).toEqual(new Definition());
            expect(state.term.term).toEqual('');
        });
    });

    describe('SET_GUIDE_SEARCH_RESULTS', () => {
        it('should set the current results to the provided values', () => {
            let state = guideReducer(undefined, {});
            expect(state.search.results).toEqual([]);

            const action = {
                type: 'SET_GUIDE_SEARCH_RESULTS',
                results: [
                    new Definition({
                        term: "Award",
                        slug: "award",
                        plain: "Money the federal government has promised to pay a recipient. Funding may be awarded to a company, organization, government entity (i.e., state, local, tribal, federal, or foreign), or individual. It may be obligated (promised) in the form of a contract, grant, loan, insurance, or direct payment."
                    }),
                    new Definition({
                        term: "Award Amount",
                        slug: "award-amount",
                        data_act_term: "Amount of Award",
                        plain: "The amount that the federal government has promised to pay (is obligated to pay) a recipient, because it has signed a contract, awarded a grant, etc. \n\nFor contracts, “award amount” ( or “current award amount”) includes the initial amount promised upon signing the contract (base) and any additional installments (options) subsequently approved (exercised) based on satisfactory performance.",
                        official: "The cumulative amount obligated by the federal government for an award, calculated by USAspending.gov or a successor site. For procurement and financial assistance awards except loans, this is the sum of Federal Action Obligations. For loans or loan guarantees, this is the Original Subsidy Cost.\n\nA Federal Action Obligation is the amount of the federal government’s obligation, de-obligation, or liability, in dollars, for an award transaction."
                    })
                ]
            };

            state = guideReducer(state, action);
            expect(state.search.results).toEqual(action.results);
        });
    });

    describe('SET_GUIDE_TERM', () => {
        it('should set the selected term to the provided value', () => {
            let state = guideReducer(undefined, {});
            expect(state.term).toEqual(new Definition());

            const action = {
                type: 'SET_GUIDE_TERM',
                term: {
                    term: "Award",
                    slug: "award",
                    plain: "Hello"
                }
            };

            state = guideReducer(state, action);
            expect(state.term).toEqual(new Definition(action.term));
        });
    });

    describe('CLEAR_GUIDE_TERM', () => {
        it('should clear the currently selected term', () => {
            const startingState = Object.assign({}, initialState, {
                term: new Definition({
                    term: "Award",
                    slug: "award",
                    plain: "Hello"
                })
            });
            let state = guideReducer(startingState, {});
            expect(state.term.term).toEqual('Award');

            const action = {
                type: 'CLEAR_GUIDE_TERM'
            };
            state = guideReducer(state, action);
            expect(state.term.term).toEqual('');
            expect(state.term).toEqual(new Definition());
        });
    });
});
