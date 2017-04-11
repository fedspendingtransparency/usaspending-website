/**
 * accountReducer-test.js
 * Created by Kevin Li 3/27/17
 */

import { Set, OrderedSet } from 'immutable';

import accountReducer from 'redux/reducers/account/accountReducer';

const initialState = {
    filters: {
        dateType: 'fy',
        fy: new Set(),
        startDate: null,
        endDate: null,
        objectClass: new OrderedSet(),
        programActivity: [],
        tas: []
    },
    filterOptions: {
        objectClass: [],
        programActivity: [],
        tas: []
    },
    account: {
        id: null,
        agency_identifier: '',
        main_account_code: '',
        title: '',
        description: '',
        totals: {
            obligated: {},
            unobligated: {},
            budgetAuthority: {},
            outlay: {}
        }
    },
    tas: [],
    totalSpending: 0
};

describe('accountReducer', () => {
    describe('SET_SELECTED_ACCOUNT', () => {
        it('should set the account object to the provided value', () => {
            const action = {
                type: 'SET_SELECTED_ACCOUNT',
                account: {
                    id: 2507,
                    title: 'Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy',
                    agency_identifier: '089',
                    main_account_code: '0208',
                    description: 'Not available',
                    totals: {
                        outlay: {
                            2017: '-5505246.42'
                        },
                        budgetAuthority: {
                            2017: '201404661.47'
                        },
                        obligated: {
                            2017: '2696684.86'
                        },
                        unobligated: {
                            2017: '198707976.61'
                        }
                    }
                }
            };

            const state = accountReducer(undefined, action);
            expect(state.account).toEqual(action.account);
        });
    });

    describe('SET_ACCOUNT_TAS_ITEMS', () => {
        // we haven't implemented this feature yet, so no tests
    });

    describe('APPEND_ACCOUNT_TAS_ITEMS', () => {
        // we haven't implemented this feature yet, so no tests
    });

    describe('UPDATE_ACCOUNT_FILTER_TIME', () => {
        it('should update the time filter to the correct values when provided a set of fiscal years', () => {
            let state = accountReducer(undefined, {});

            const action = {
                type: 'UPDATE_ACCOUNT_FILTER_TIME',
                dateType: 'fy',
                fy: [
                    '2017'
                ],
                start: null,
                end: null
            };

            const expectedState = {
                dateType: 'fy',
                fy: new Set(['2017']),
                startDate: null,
                endDate: null,
                programActivity: [],
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, action);
            expect(state.filters).toEqual(expectedState);
        });

        it('should update the time filter to the correct values when provided a date range', () => {
            let state = accountReducer(undefined, {});

            const action = {
                type: 'UPDATE_ACCOUNT_FILTER_TIME',
                dateType: 'dr',
                fy: [],
                start: '2015-01-01',
                end: '2015-12-31'
            };

            const expectedState = {
                dateType: 'dr',
                fy: new Set([]),
                startDate: '2015-01-01',
                endDate: '2015-12-31',
                programActivity: [],
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, action);
            expect(state.filters).toEqual(expectedState);
        });
    });

    describe('RESET_ACCOUNT_FILTER_TIME', () => {
        it('should clear the time filter', () => {
            let state = accountReducer(undefined, {});

            const firstAction = {
                type: 'UPDATE_ACCOUNT_FILTER_TIME',
                dateType: 'dr',
                fy: ['2017'],
                start: '2015-01-01',
                end: '2015-12-31'
            };

            const firstState = {
                dateType: 'dr',
                fy: new Set(['2017']),
                startDate: '2015-01-01',
                endDate: '2015-12-31',
                programActivity: [],
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, firstAction);
            expect(state.filters).toEqual(firstState);

            const secondAction = {
                type: 'RESET_ACCOUNT_FILTER_TIME'
            };

            const secondState = {
                dateType: 'fy',
                fy: new Set([]),
                startDate: null,
                endDate: null,
                programActivity: [],
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, secondAction);
            expect(state.filters).toEqual(secondState);
        });
    });

    describe('TOGGLE_ACCOUNT_OBJECT_CLASS', () => {
        it('should add the provided object class code if it is not already selected', () => {
            let state = accountReducer(undefined, {});

            const action = {
                type: 'TOGGLE_ACCOUNT_OBJECT_CLASS',
                item: '10'
            };

            state = accountReducer(state, action);

            const expected = new OrderedSet(['10']);
            expect(state.filters.objectClass).toEqual(expected);
        });
        it('should remove the provided object class code if it is already selected', () => {
            const startingFilters = Object.assign({}, initialState.filters, {
                objectClass: new OrderedSet(['10', '20'])
            });
            const startingState = Object.assign({}, initialState, {
                filters: startingFilters
            });

            let state = accountReducer(startingState, {});

            const action = {
                type: 'TOGGLE_ACCOUNT_OBJECT_CLASS',
                item: '10'
            };

            state = accountReducer(state, action);

            const expected = new OrderedSet(['20']);
            expect(state.filters.objectClass).toEqual(expected);
        });
    });

    describe('RESET_ACCOUNT_FILTERS', () => {
        it('should reset all the filters', () => {
            let state = accountReducer(undefined, {});

            const firstAction = {
                type: 'UPDATE_ACCOUNT_FILTER_TIME',
                dateType: 'dr',
                fy: ['2017'],
                start: '2015-01-01',
                end: '2015-12-31'
            };

            const firstState = {
                dateType: 'dr',
                fy: new Set(['2017']),
                startDate: '2015-01-01',
                endDate: '2015-12-31',
                programActivity: [],
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, firstAction);
            expect(state.filters).toEqual(firstState);

            const secondAction = {
                type: 'RESET_ACCOUNT_FILTERS'
            };

            state = accountReducer(state, secondAction);
            expect(state).toEqual(initialState);
        });
    });

    describe('RESET_ACCOUNT', () => {
        it('should reset the account reducer to its initialState', () => {
            let state = accountReducer(undefined, {});

            const firstAction = {
                type: 'SET_SELECTED_ACCOUNT',
                account: {
                    id: 2507,
                    title: 'Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy',
                    agency_identifier: '089',
                    main_account_code: '0208',
                    description: 'Not available',
                    totals: {
                        outlay: {
                            2017: '-5505246.42'
                        },
                        budgetAuthority: {
                            2017: '201404661.47'
                        },
                        obligated: {
                            2017: '2696684.86'
                        },
                        unobligated: {
                            2017: '198707976.61'
                        }
                    }
                }
            };

            state = accountReducer(state, firstAction);
            expect(state.account).toEqual(firstAction.account);

            const secondAction = {
                type: 'UPDATE_ACCOUNT_FILTER_TIME',
                dateType: 'dr',
                fy: ['2017'],
                start: '2015-01-01',
                end: '2015-12-31'
            };

            const secondState = {
                dateType: 'dr',
                fy: new Set(['2017']),
                startDate: '2015-01-01',
                endDate: '2015-12-31',
                programActivity: [],
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, secondAction);
            expect(state.filters).toEqual(secondState);

            const thirdAction = {
                type: 'RESET_ACCOUNT'
            };

            state = accountReducer(state, thirdAction);
            expect(state).toEqual(initialState);
        });
    });
});
