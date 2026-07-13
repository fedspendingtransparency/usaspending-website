/**
 * SearchSidebarSubmitContainer.jsx
 * Created by Kevin Li 12/21/17
 */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { areFiltersEqual } from 'helpers/searchHelper';
import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';
import { initialState, initialStateDR } from 'redux/reducers/search/searchFiltersReducer';
import { clearAllFilters as clearStagedFilters } from 'redux/actions/search/searchFilterActions';
import { resetMapLegendToggle } from 'redux/actions/search/mapLegendToggleActions';
import {
    applyStagedFilters,
    resetAppliedFilters, setAppliedFilterCompletion
} from "redux/actions/search/appliedFilterActions";
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

    const filtersChanged = !areFiltersEqual(stagedFilters, appliedFilters);
    const areStagedFiltersEmpty = areFiltersEqual(stagedFilters, initialState) ||
            areFiltersEqual(stagedFilters, initialStateDR);

    const resetFilters = useCallback(() => {
        dispatch(clearStagedFilters());
        dispatch(resetAppliedFilters());
        dispatch(resetMapLegendToggle());
    }, [dispatch]);


    const applyFilters = useCallback(() => {
        dispatch(setAppliedFilterCompletion(false));

        if (areFiltersEqual(stagedFilters)) {
            resetFilters();
        }
        else {
            dispatch(applyStagedFilters(stagedFilters));
            dispatch(setAppliedFilterCompletion(true));
        }

        const events = convertFiltersToAnalyticEvents(stagedFilters);
        sendAnalyticEvents(events);
        sendFieldCombinations(events);
    }, [dispatch, resetFilters, stagedFilters]);

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
