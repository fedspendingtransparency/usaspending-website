/**
 * SearchSidebarSubmitContainer.jsx
 * Created by Kevin Li 12/21/17
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { areFiltersEqual } from 'helpers/searchHelper';
import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';
import { initialState, initialStateFY } from 'redux/reducers/search/searchFiltersReducer';
import { clearAllFilters as clearStagedFilters } from 'redux/actions/search/searchFilterActions';
import { resetMapLegendToggle } from 'redux/actions/search/mapLegendToggleActions';
import {
    applyStagedFilters,
    resetAppliedFilters, setAppliedFilterCompletion
} from "redux/actions/search/appliedFilterActions";
import usePrevious from "hooks/usePrevious";
import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from './helpers/searchAnalytics';

const propTypes = { setShowMobileFilters: PropTypes.func };

const SearchSidebarSubmitContainer = ({ setShowMobileFilters }) => {
    const {
        _complete: requestsComplete,
        filters: appliedFilters
    } = useSelector((state) => state.appliedFilters);
    const stagedFilters = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const [filtersChanged, setFiltersChanged] = useState(false);
    const prevStagedFilters = usePrevious(stagedFilters);
    const prevAppliedFilters = usePrevious(appliedFilters);

    const areStagedFiltersEmpty = areFiltersEqual(stagedFilters, initialState) ||
            areFiltersEqual(stagedFilters, initialStateFY);

    const compareStores = () => {
    // we need to do a deep equality check by comparing every store key
        const storeKeys = Object.keys(stagedFilters);
        if (storeKeys.length !== Object.keys(appliedFilters).length) {
            // key lengths do not match, there's a difference so fail immediately
            return false;
        }
        return areFiltersEqual(stagedFilters, appliedFilters);
    };

    const resetFilters = useCallback(() => {
        dispatch(clearStagedFilters());
        dispatch(resetAppliedFilters());
        dispatch(resetMapLegendToggle());
    }, [dispatch]);

    const stagingChanged = () => {
    // do a deep equality check between the staged filters and applied filters
        if (!compareStores()) {
            setFiltersChanged(true);
        }
        else if (filtersChanged) {
            setFiltersChanged(false);
        }
    };

    const applyFilters = useCallback(() => {
        dispatch(setAppliedFilterCompletion(false));

        if (areFiltersEqual(stagedFilters)) {
            resetFilters();
        }
        else {
            dispatch(applyStagedFilters(stagedFilters));
            dispatch(setAppliedFilterCompletion(true));
        }
        setFiltersChanged(false);

        const events = convertFiltersToAnalyticEvents(stagedFilters);
        sendAnalyticEvents(events);
        sendFieldCombinations(events);
    }, [dispatch, resetFilters, stagedFilters]);

    useEffect(() => {
        const areStagedAndAppliedFiltersEquivalent = (
            areFiltersEqual(stagedFilters, prevStagedFilters) &&
            areFiltersEqual(appliedFilters, prevAppliedFilters)
        );
        if (!areStagedAndAppliedFiltersEquivalent) {
            stagingChanged();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stagedFilters, appliedFilters]);

    return (
        <SearchSidebarSubmit
            stagedFiltersAreEmpty={areStagedFiltersEmpty}
            filtersChanged={filtersChanged}
            requestsComplete={requestsComplete}
            applyStagedFilters={applyFilters}
            resetFilters={resetFilters}
            setShowMobileFilters={setShowMobileFilters} />
    );
};

SearchSidebarSubmitContainer.propTypes = propTypes;

export default SearchSidebarSubmitContainer;
