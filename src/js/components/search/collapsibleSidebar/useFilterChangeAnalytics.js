/**
 * useFilterChangeAnalytics.js
 * Sends a GA event whenever a user adds, modifies, or removes a search filter
 * while a Smart Assist search is active.
 **/

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { is } from 'immutable';

import Analytics from 'helpers/analytics/Analytics';
import { unifyDateFields } from 'containers/search/helpers/searchAnalytics';

import { getLastActionType } from 'redux/middleware/lastActionMiddleware';
import { setIsSearchActive } from 'redux/actions/sidebar/sidebarActions';

const category = 'Smart Assist - Refinement';

const ignoredActions = ['RESTORE_HASHED_FILTERS', 'CLEAR_SEARCH_FILTER_ALL'];

const useFilterChangeAnalytics = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);
    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);
    const isNLSearchComplete = useSelector((state) => state.sidebar.isNLSearchComplete);
    const previous = useRef(filters);

    useEffect(() => {
        const prevFilters = previous.current;
        previous.current = filters;

        // ignore filters populated by the NL search itself; only track user edits
        if (!isSearchActive || !isNLSearchComplete || prevFilters === filters) return;
        // filters restored from the url/hash on page load, or cleared, aren't user edits
        if (ignoredActions.includes(getLastActionType())) return;

        const prev = unifyDateFields(prevFilters);
        const next = unifyDateFields(filters);

        // one event per user action, regardless of how many keys changed
        const changedKeys = Object.keys(next).filter((key) => !is(prev[key], next[key]));
        if (!changedKeys.length) return;

        Analytics.event({
            category,
            action: 'Filters Modified Manually',
            label: 'side panel'
        });

        // only the first manual modification is tracked
        dispatch(setIsSearchActive(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);
};

export default useFilterChangeAnalytics;
