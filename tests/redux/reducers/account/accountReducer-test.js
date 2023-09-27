/**
 * @jest-environment jsdom
 * 
 * accountReducer-test.js
 * Created by Kevin Li 3/27/17
 */

import { Set, OrderedSet, List } from 'immutable';

import accountReducer, { initialState } from 'redux/reducers/account/accountReducer';
import { mockOCAPI } from './mockResponses';
import { mockSubmissions } from '../../../mockData';

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
                        },
                        balanceBroughtForward1: {
                            2017: '2696684.86'
                        },
                        balanceBroughtForward2: {
                            2017: '2696684.86'
                        },
                        otherBudgetaryResources: {
                            2017: '2696684.86'
                        },
                        appropriations: {
                            2017: '2696684.86'
                        }
                    }
                }
            };

            const state = accountReducer(undefined, action);
            expect(state.account).toEqual(action.account);
        });
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
                programActivity: new OrderedSet(),
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
                programActivity: new OrderedSet(),
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
                programActivity: new OrderedSet(),
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
                programActivity: new OrderedSet(),
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

    describe('SET_ACCOUNT_AVAILABLE_OBJECT_CLASSES', () => {
        const mockActionState = {
            objectClass: mockOCAPI.results,
            objectClassDefinitions: {
                '1': 'First Major',
                '2': 'First Major Minor'
            },
            objectClassChildren: {
                '1': ['2']
            }
        };

        it('should populate the objectClass key in filterOptions with the major/minor structure', () => {
            let state = accountReducer(undefined, {});
            expect(state.filterOptions.objectClass).toEqual([]);
            const action = Object.assign({}, mockActionState, {
                type: 'SET_ACCOUNT_AVAILABLE_OBJECT_CLASSES'
            });

            state = accountReducer(state, action);
            expect(state.filterOptions.objectClass).toEqual(mockOCAPI.results);
        });
        it('should populate the objectClassDefinitions key in filterOptions with an object mapping IDs to names', () => {
            let state = accountReducer(undefined, {});
            expect(state.filterOptions.objectClassDefinitions).toEqual({});
            const action = Object.assign({}, mockActionState, {
                type: 'SET_ACCOUNT_AVAILABLE_OBJECT_CLASSES'
            });

            state = accountReducer(state, action);
            expect(state.filterOptions.objectClassDefinitions).toEqual(mockActionState.objectClassDefinitions);
        });
        it('should populate the objectClassChildren key in filterOptions with an object associating minor IDs to major IDs', () => {
            let state = accountReducer(undefined, {});
            expect(state.filterOptions.objectClassChildren).toEqual({});
            const action = Object.assign({}, mockActionState, {
                type: 'SET_ACCOUNT_AVAILABLE_OBJECT_CLASSES'
            });

            state = accountReducer(state, action);
            expect(state.filterOptions.objectClassChildren).toEqual(mockActionState.objectClassChildren);
        });
    });

    describe('BULK_ACCOUNT_TOGGLE_OBJECT_CLASSES', () => {
        it('should add all child IDs to the filter when the direction is "add"', () => {
            let state = accountReducer(undefined, {});
            expect(state.filters.objectClass).toEqual(new OrderedSet([]));

            const action = {
                type: 'BULK_ACCOUNT_TOGGLE_OBJECT_CLASSES',
                objectClasses: ['1', '2', '3'],
                direction: 'add'
            };
            state = accountReducer(state, action);
            expect(state.filters.objectClass).toEqual(new OrderedSet(['1', '2', '3']));
        });
        it('should add only those currently unselected child IDs to the filter when the direction is "add"', () => {
            const startingFilters = Object.assign({}, initialState.filters, {
                objectClass: new OrderedSet(['1'])
            });
            const startingState = Object.assign({}, initialState, {
                filters: startingFilters
            });
            let state = accountReducer(startingState, {});
            expect(state.filters.objectClass).toEqual(new OrderedSet(['1']));

            const action = {
                type: 'BULK_ACCOUNT_TOGGLE_OBJECT_CLASSES',
                objectClasses: ['1', '2', '3'],
                direction: 'add'
            };
            state = accountReducer(state, action);
            expect(state.filters.objectClass).toEqual(new OrderedSet(['1', '2', '3']));
        });
        it('should remove all child IDs from the filter when the direction is "remove"', () => {
            const startingFilters = Object.assign({}, initialState.filters, {
                objectClass: new OrderedSet(['1', '2', '3'])
            });
            const startingState = Object.assign({}, initialState, {
                filters: startingFilters
            });
            let state = accountReducer(startingState, {});
            expect(state.filters.objectClass).toEqual(new OrderedSet(['1', '2', '3']));

            const action = {
                type: 'BULK_ACCOUNT_TOGGLE_OBJECT_CLASSES',
                objectClasses: ['1', '2'],
                direction: 'remove'
            };
            state = accountReducer(state, action);
            expect(state.filters.objectClass).toEqual(new OrderedSet(['3']));
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
                programActivity: new OrderedSet(),
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, firstAction);
            expect(state.filters).toEqual(firstState);

            const secondAction = {
                type: 'RESET_ACCOUNT_FILTERS'
            };

            state = accountReducer(state, secondAction);
            expect(state.filters).toEqual(initialState.filters);
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
                programActivity: new OrderedSet(),
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, secondAction);
            expect(state.filters).toEqual(secondState);

            const thirdAction = {
                type: 'RESET_ACCOUNT'
            };

            state = accountReducer(state, thirdAction);
            expect(state.filters).toEqual(initialState.filters);
        });
    });

    describe('SET_AVAILABLE_PROGRAM_ACTIVITIES', () => {
        it('should set the program activities of the filter options object', () => {
            let state = accountReducer(initialState, {});

            const action = {
                type: 'SET_AVAILABLE_PROGRAM_ACTIVITIES',
                programActivities: [{
                    id: '810',
                    code: '0002',
                    name: 'Child support incentive payments'
                },
                {
                    id: '161',
                    code: '0001',
                    name: 'Court of Appeals for Veterans Claims Retirement Fund'
                }]
            };

            state = accountReducer(state, action);
            expect(state.filterOptions.programActivity).toEqual(action.programActivities);
        });
    });

    describe('TOGGLE_ACCOUNT_PROGRAM_ACTIVITY', () => {
        it('should add the provided program activity if it is not already selected', () => {
            let state = accountReducer(undefined, {});

            const action = {
                type: 'TOGGLE_ACCOUNT_PROGRAM_ACTIVITY',
                item: '810'
            };

            state = accountReducer(state, action);

            const expected = new OrderedSet(['810']);
            expect(state.filters.programActivity).toEqual(expected);
        });

        it('should remove the provided program activity if it is already selected', () => {
            const startingFilters = Object.assign({}, initialState.filters, {
                programActivity: new OrderedSet(['810', '161'])
            });

            const startingState = Object.assign({}, initialState, {
                filters: startingFilters
            });

            let state = accountReducer(startingState, {});

            const action = {
                type: 'TOGGLE_ACCOUNT_PROGRAM_ACTIVITY',
                item: '810'
            };

            state = accountReducer(state, action);

            const expected = new OrderedSet(['161']);
            expect(state.filters.programActivity).toEqual(expected);
        });
    });

    describe('RESET_ACCOUNT_PROGRAM_ACTIVITY', () => {
        it('should reset the selected program activities', () => {
            let state = accountReducer(initialState, {});

            const firstAction = {
                type: 'TOGGLE_ACCOUNT_PROGRAM_ACTIVITY',
                item: '810'
            };

            const firstState = {
                dateType: 'fy',
                fy: new Set(),
                startDate: null,
                endDate: null,
                objectClass: new OrderedSet(),
                programActivity: new OrderedSet(["810"]),
                tas: []
            };

            state = accountReducer(state, firstAction);
            expect(state.filters).toEqual(firstState);

            const secondAction = {
                type: 'RESET_ACCOUNT_PROGRAM_ACTIVITY'
            };

            const secondState = {
                dateType: 'fy',
                fy: new Set([]),
                startDate: null,
                endDate: null,
                programActivity: new OrderedSet(),
                tas: [],
                objectClass: new OrderedSet()
            };

            state = accountReducer(state, secondAction);
            expect(state.filters).toEqual(secondState);
        });
    });
    it('should SET_SUBMISSION_PERIODS', () => {
        const action = {
            type: 'SET_SUBMISSION_PERIODS',
            submissionPeriods: mockSubmissions
        };
        const state = accountReducer(undefined, action);
        const newList = new List(action.submissionPeriods);
        expect(state.submissionPeriods).toEqual(newList);
    });
});
