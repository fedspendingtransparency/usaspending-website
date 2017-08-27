import { List } from 'immutable';
import explorerReducer, { initialState, ActiveScreen } from 'redux/reducers/explorer/explorerReducer';

jest.mock('helpers/fiscalYearHelper', () => require('./mockCurrentFiscalYear'));

describe('explorerReducer', () => {
    describe('SET_EXPLORER_FY', () => {
        it('should update the FY to the given value', () => {
            const action = {
                type: 'SET_EXPLORER_FY',
                fy: 1984
            };
            const state = explorerReducer(undefined, action);
            expect(state.fy).toEqual(1984);
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

    describe('RESET_EXPLORER', () => {
        it('should reset the explorer state to its initial state', () => {
            const state = {
                root: 'agency',
                active: new ActiveScreen({
                    within: 'agency',
                    subdivision: 'federal_account',
                    total: 12345
                }),
                fy: 1984,
                trail: new List(['a', 'b', 'c'])
            };

            const action = {
                type: 'RESET_EXPLORER'
            };

            const newState = explorerReducer(state, action);

            expect(newState.fy).toEqual(1984);
            expect(newState.root).toEqual('object_class');
            expect(newState.active).toEqual(new ActiveScreen());
            expect(newState.trail.count()).toEqual(0);
        });
    });
});
