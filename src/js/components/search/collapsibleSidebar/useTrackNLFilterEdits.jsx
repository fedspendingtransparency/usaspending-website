/**
 * useTrackNLFilterEdits.jsx
 * Sends a GA event whenever the user manually changes search filters after a smart assist search
 **/

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Analytics from 'helpers/analytics/Analytics';

// number of selected values in a filter, used to tell whether a value was added or removed
const getFilterSize = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value.size === 'number') return value.size;
    if (value.require || value.exclude) {
        return (value.require?.length || 0) + (value.exclude?.length || 0);
    }
    if (typeof value === 'string' || Array.isArray(value)) return value.length;
    if (typeof value === 'boolean') return value ? 1 : 0;
    return null;
};

const getChangeType = (prev, next) => {
    const prevSize = getFilterSize(prev);
    const nextSize = getFilterSize(next);
    if (prevSize === null || nextSize === null || prevSize === nextSize) return 'modified';
    return nextSize > prevSize ? 'added' : 'removed';
};

const useTrackNLFilterEdits = () => {
    const filters = useSelector((state) => state.filters);
    const nlSearchHash = useSelector((state) => state.sidebar.nlSearchHash);

    const baseline = useRef(null);
    const trackedSearchHash = useRef(null);
    const editSequence = useRef(0);

    useEffect(() => {
        if (!nlSearchHash) {
            baseline.current = null;
            trackedSearchHash.current = null;
            editSequence.current = 0;
            return;
        }

        // first render after a smart assist search populated the filters: snapshot them so the
        // programmatic update isn't counted as a manual edit
        if (trackedSearchHash.current !== nlSearchHash) {
            trackedSearchHash.current = nlSearchHash;
            baseline.current = filters;
            editSequence.current = 0;
            return;
        }

        if (baseline.current === filters) return;

        const previous = baseline.current;
        baseline.current = filters;

        Object.keys(filters)
            .filter((key) => previous[key] !== filters[key])
            .forEach((key) => {
                editSequence.current += 1;
                Analytics.event({
                    category: 'Smart Assist - Refinement',
                    action: 'Filters Modified Manually',
                    label: 'side panel',
                    params: {
                        filter_type: key,
                        change_type: getChangeType(previous[key], filters[key]),
                        nl_search_hash: nlSearchHash,
                        edit_sequence: editSequence.current
                    }
                });
            });
    }, [filters, nlSearchHash]);
};

export default useTrackNLFilterEdits;
