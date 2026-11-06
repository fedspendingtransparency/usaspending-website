/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';

import Analytics from 'helpers/analytics/Analytics';
import useTrackNLFilterEdits from 'components/search/collapsibleSidebar/useTrackNLFilterEdits';

jest.mock('helpers/analytics/Analytics', () => ({
    __esModule: true,
    default: { event: jest.fn() }
}));

let mockState;
jest.mock('react-redux', () => ({
    useSelector: (selector) => selector(mockState)
}));

const buildState = (filters, nlSearchHash = 'hash-1') => ({
    filters,
    sidebar: { nlSearchHash }
});

// renders the hook, then re-renders with each subsequent state
const setup = (initialState) => {
    mockState = initialState;
    const view = renderHook(() => useTrackNLFilterEdits());
    return {
        update: (nextState) => {
            mockState = nextState;
            view.rerender();
        }
    };
};

const eventParams = (callIndex) => Analytics.event.mock.calls[callIndex][0].params;

describe('useTrackNLFilterEdits', () => {
    beforeEach(() => {
        Analytics.event.mockClear();
    });

    it('does not fire when there is no smart assist search', () => {
        const { update } = setup(buildState({ keyword: ['a'] }, null));
        update(buildState({ keyword: ['a', 'b'] }, null));

        expect(Analytics.event).not.toHaveBeenCalled();
    });

    it('does not count the initial smart assist population as an edit', () => {
        const { update } = setup(buildState({ keyword: [] }, null));
        update(buildState({ keyword: ['a'] }, 'hash-1'));

        expect(Analytics.event).not.toHaveBeenCalled();
    });

    it('does not fire when filters are unchanged after the baseline', () => {
        const filters = { keyword: ['a'] };
        const { update } = setup(buildState(filters));
        update(buildState(filters));

        expect(Analytics.event).not.toHaveBeenCalled();
    });

    it('fires an event with the full payload when a filter value is added', () => {
        const awardType = [];
        const { update } = setup(buildState({ keyword: ['a'], awardType }));
        update(buildState({ keyword: ['a', 'b'], awardType }));

        expect(Analytics.event).toHaveBeenCalledTimes(1);
        expect(Analytics.event).toHaveBeenCalledWith({
            category: 'Smart Assist - Refinement',
            action: 'Filters Modified Manually',
            label: 'side panel',
            params: {
                filter_type: 'keyword',
                change_type: 'added',
                nl_search_hash: 'hash-1',
                edit_sequence: 1
            }
        });
    });

    it('reports removed when a filter value is removed', () => {
        const { update } = setup(buildState({ keyword: ['a', 'b'] }));
        update(buildState({ keyword: ['a'] }));

        expect(eventParams(0).change_type).toBe('removed');
    });

    it('reports modified when the size is unchanged', () => {
        const { update } = setup(buildState({ keyword: ['a'] }));
        update(buildState({ keyword: ['b'] }));

        expect(eventParams(0).change_type).toBe('modified');
    });

    it('reports modified when the filter shape is not comparable', () => {
        const { update } = setup(buildState({ time: { start: 1 } }));
        update(buildState({ time: { start: 2 } }));

        expect(eventParams(0).change_type).toBe('modified');
    });

    it('measures size for Set/Map-like values', () => {
        const { update } = setup(buildState({ selected: new Set(['a']) }));
        update(buildState({ selected: new Set(['a', 'b', 'c']) }));

        expect(eventParams(0).change_type).toBe('added');
    });

    it('measures size for require/exclude values', () => {
        const { update } = setup(buildState({ location: { require: ['a'], exclude: [] } }));
        update(buildState({ location: { require: ['a'], exclude: ['b'] } }));

        expect(eventParams(0).change_type).toBe('added');

        update(buildState({ location: { require: [], exclude: [] } }));
        expect(eventParams(1).change_type).toBe('removed');
    });

    it('treats null/undefined as empty and booleans as 0/1', () => {
        const { update } = setup(buildState({ a: null, flag: false }));
        update(buildState({ a: ['x'], flag: true }));

        expect(Analytics.event).toHaveBeenCalledTimes(2);
        expect(eventParams(0)).toMatchObject({ filter_type: 'a', change_type: 'added' });
        expect(eventParams(1)).toMatchObject({ filter_type: 'flag', change_type: 'added' });
    });

    it('measures string length', () => {
        const { update } = setup(buildState({ keyword: 'ab' }));
        update(buildState({ keyword: 'a' }));

        expect(eventParams(0).change_type).toBe('removed');
    });

    it('fires one event per changed filter and only for changed keys', () => {
        const same = ['x'];
        const { update } = setup(buildState({ a: ['1'], b: ['1'], c: same }));
        update(buildState({ a: ['1', '2'], b: [], c: same }));

        expect(Analytics.event).toHaveBeenCalledTimes(2);
        expect(eventParams(0).filter_type).toBe('a');
        expect(eventParams(1).filter_type).toBe('b');
    });

    it('increments edit_sequence across edits', () => {
        const { update } = setup(buildState({ keyword: [] }));
        update(buildState({ keyword: ['a'] }));
        update(buildState({ keyword: ['a', 'b'] }));
        update(buildState({ keyword: ['a'] }));

        expect(Analytics.event).toHaveBeenCalledTimes(3);
        expect([0, 1, 2].map((i) => eventParams(i).edit_sequence)).toEqual([1, 2, 3]);
    });

    it('re-baselines and resets the sequence when a new smart assist search runs', () => {
        const { update } = setup(buildState({ keyword: [] }, 'hash-1'));
        update(buildState({ keyword: ['a'] }, 'hash-1'));
        expect(eventParams(0).edit_sequence).toBe(1);

        // new search replaces the filters: not an edit
        update(buildState({ keyword: ['z'] }, 'hash-2'));
        expect(Analytics.event).toHaveBeenCalledTimes(1);

        update(buildState({ keyword: ['z', 'y'] }, 'hash-2'));
        expect(Analytics.event).toHaveBeenCalledTimes(2);
        expect(eventParams(1)).toMatchObject({ nl_search_hash: 'hash-2', edit_sequence: 1 });
    });

    it('stops tracking and resets when the smart assist hash is cleared', () => {
        const { update } = setup(buildState({ keyword: [] }, 'hash-1'));
        update(buildState({ keyword: ['a'] }, 'hash-1'));
        update(buildState({ keyword: ['a', 'b'] }, null));
        expect(Analytics.event).toHaveBeenCalledTimes(1);

        // same hash returning is treated as a fresh search: baseline only
        update(buildState({ keyword: ['c'] }, 'hash-1'));
        expect(Analytics.event).toHaveBeenCalledTimes(1);
    });
});
