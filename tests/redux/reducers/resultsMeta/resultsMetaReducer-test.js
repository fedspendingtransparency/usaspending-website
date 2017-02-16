/**
 * resultsMetaReducer-test.js
 * Created by Kevin Li 2/10/17
 */

import resultsMetaReducer from 'redux/reducers/resultsMeta/resultsMetaReducer';

describe('resultsMetaReducer', () => {
    describe('SET_SEARCH_RESULT_META', () => {
        it('should set the page number and total counts to the provided values', () => {
            const action = {
                type: 'SET_SEARCH_RESULT_META',
                meta: {
                    page: {
                        count: 10,
                        num_pages: 2,
                        page_number: 2
                    },
                    total: {
                        count: 10
                    }
                }
            };

            const state = resultsMetaReducer(undefined, action);
            expect(state.toJS().page.count).toEqual(10);
            expect(state.toJS().page.num_pages).toEqual(2);
            expect(state.toJS().page.page_number).toEqual(2);
        });
    });

    describe('SET_SEARCH_INFLIGHT', () => {
        it('should set the in-flight status to the provided value', () => {
            // create a default Redux state
            let state = resultsMetaReducer(undefined, { type: 'DEFAULT' });
            expect(state.toJS().inFlight).toBeFalsy();

            // update the inflight state
            const action = {
                type: 'SET_SEARCH_INFLIGHT',
                inFlight: true
            };
            state = resultsMetaReducer(state, action);
            expect(state.toJS().inFlight).toBeTruthy();
        });
    });

    describe('SET_SEARCH_TABLE_TYPE', () => {
        it('should set the table type to the provided value', () => {
            // create a default Redux state
            let state = resultsMetaReducer(undefined, { type: 'DEFAULT' });
            expect(state.toJS().tableType).toEqual('contracts');

            // update the state
            const action = {
                type: 'SET_SEARCH_TABLE_TYPE',
                tableType: 'grants'
            };
            state = resultsMetaReducer(state, action);
            expect(state.toJS().tableType).toEqual('grants');
        });
    });

    describe('SET_SEARCH_RESULT_PAGE_NUMBER', () => {
        it('should set the table page number to the provided value', () => {
            // create a default Redux state
            let state = resultsMetaReducer(undefined, { type: 'DEFAULT' });
            expect(state.toJS().page.page_number).toEqual(1);

            // update the state
            const action = {
                type: 'SET_SEARCH_RESULT_PAGE_NUMBER',
                pageNumber: 2
            };
            state = resultsMetaReducer(state, action);
            expect(state.toJS().page.page_number).toEqual(2);
        });
    });

    describe('SET_VIZ_TXN_SUM', () => {
        it('should set the visualization transaction total to the provided value', () => {
            // create a default Redux state
            let state = resultsMetaReducer(undefined, { type: 'DEFAULT' });
            expect(state.toJS().visualization.transaction_sum).toEqual(0);

            // update the state
            const action = {
                type: 'SET_VIZ_TXN_SUM',
                sum: 100
            };
            state = resultsMetaReducer(state, action);
            expect(state.toJS().visualization.transaction_sum).toEqual(100);
        });
    });
});
