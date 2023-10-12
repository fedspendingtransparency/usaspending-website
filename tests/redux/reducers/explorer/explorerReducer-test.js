/**
 * @jest-environment jsdom
 */
import { List } from 'immutable';
import explorerReducer, { initialState, ActiveScreen } from 'redux/reducers/explorer/explorerReducer';

jest.mock('helpers/fiscalYearHelper', () => require('./mockCurrentFiscalYear'));
jest.mock('containers/explorer/detail/helpers/explorerQuarters', () => require('./mockQuarterHelper'));

describe('explorerReducer', () => {
    describe('SET_EXPLORER_TIME_PERIOD', () => {
        it('should update the FY and quarter to the given value', () => {
            const action = {
                type: 'SET_EXPLORER_TIME_PERIOD',
                fy: '1984',
                quarter: '3',
                period: null
            };
            const state = explorerReducer(undefined, action);
            expect(state.fy).toEqual('1984');
            expect(state.quarter).toEqual('3');
            expect(state.period).toEqual(null);
        });
    });

    describe('SET_EXPLORER_PERIOD', () => {
        it('should update the FY and period to the given value', () => {
            const action = {
                type: 'SET_EXPLORER_TIME_PERIOD',
                fy: '1984',
                period: '3',
                quarter: null
            };
            const state = explorerReducer(undefined, action);
            expect(state.fy).toEqual('1984');
            expect(state.period).toEqual('3');
            expect(state.quarter).toEqual(null);
        });
    });

    describe('SET_EXPLORER_ROOT', () => {
        it('should set the root to the given value', () => {
            const action = {
                type: 'SET_EXPLORER_ROOT',
                root: 'fake_root'
            };

            const state = explorerReducer(undefined, action);
            expect(state.root).toEqual('fake_root');
        });
    });

    describe('ADD_EXPLORER_TRAIL', () => {
        it('should append a new trail item to the existing trail list', () => {
            const state = Object.assign({}, initialState, {
                trail: new List(['a', 'b'])
            });

            const action = {
                type: 'ADD_EXPLORER_TRAIL',
                item: 'c'
            };

            const newState = explorerReducer(state, action);
            expect(newState.trail.toJS()).toEqual(['a', 'b', 'c']);
        });
    });

    describe('OVERWRITE_EXPLORER_TRAIL', () => {
        it('should overwrite the existing trail list with a new list', () => {
            const state = Object.assign({}, initialState, {
                trail: new List(['a', 'b'])
            });

            const action = {
                type: 'OVERWRITE_EXPLORER_TRAIL',
                trail: ['x', 'y', 'z']
            };

            const newState = explorerReducer(state, action);
            expect(newState.trail.toJS()).toEqual(['x', 'y', 'z']);
        });
    });

    describe('SET_EXPLORER_ACTIVE', () => {
        it('should update set the active value to the provided value', () => {
            const action = {
                type: 'SET_EXPLORER_ACTIVE',
                active: {
                    within: 'within_unit',
                    subdivision: 'subdivide_by_this',
                    total: 12345
                }
            };

            const state = explorerReducer(undefined, action);
            expect(state.active).toEqual(new ActiveScreen({
                within: 'within_unit',
                subdivision: 'subdivide_by_this',
                total: 12345
            }));
        });
    });

    describe('SET_EXPLORER_TABLE_ORDER', () => {
        it('should update set the table order to the provided field and direction' +
            'and reset the page number to 1', () => {
            const action = {
                type: 'SET_EXPLORER_TABLE_ORDER',
                order: {
                    field: 'sort_field',
                    direction: 'dir'
                }
            };

            const state = explorerReducer(undefined, action);
            expect(state.table).toEqual({
                order: {
                    field: 'sort_field',
                    direction: 'dir'
                },
                pageNumber: 1
            });
        });
    });

    describe('SET_EXPLORER_TABLE_PAGE', () => {
        it('should update set the table page number to the provided value', () => {
            const action = {
                type: 'SET_EXPLORER_TABLE_PAGE',
                number: 3
            };

            const state = explorerReducer(undefined, action);
            expect(state.table.pageNumber).toEqual(3);
        });
    });

    describe('RESET_EXPLORER_TABLE', () => {
        it('should reset the table to its initial state', () => {
            const state = {
                root: 'agency',
                active: new ActiveScreen({
                    within: 'agency',
                    subdivision: 'federal_account',
                    total: 12345
                }),
                fy: '1984',
                quarter: '1',
                trail: new List(['a', 'b', 'c']),
                table: {
                    order: {
                        field: 'fake_field',
                        direction: 'dir'
                    },
                    pageNumber: 4
                }
            };

            const action = {
                type: 'RESET_EXPLORER_TABLE'
            };

            const newState = explorerReducer(state, action);

            expect(newState.table.order.field).toEqual('obligated_amount');
            expect(newState.table.order.direction).toEqual('desc');
            expect(newState.table.pageNumber).toEqual(1);
        });
    });

    describe('RESET_EXPLORER', () => {
        it('should reset the explorer state to its initial state', () => {
            const state = {
                root: 'agency',
                active: new ActiveScreen({
                    within: 'agency',
                    subdivision: 'federal_account',
                    total: 12345
                }),
                fy: '1985',
                quarter: '1',
                trail: new List(['a', 'b', 'c']),
                table: {
                    order: {
                        field: 'fake_field',
                        direction: 'dir'
                    },
                    pageNumber: 4
                }
            };

            const action = {
                type: 'RESET_EXPLORER'
            };

            const newState = explorerReducer(state, action);

            expect(newState.fy).toEqual(null);
            expect(newState.quarter).toEqual(null);
            expect(newState.period).toEqual(null);
            expect(newState.root).toEqual('object_class');
            expect(newState.active).toEqual(new ActiveScreen());
            expect(newState.trail.count()).toEqual(0);
            expect(newState.table.order.field).toEqual('obligated_amount');
            expect(newState.table.pageNumber).toEqual(1);
        });
    });
});
