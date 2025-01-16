/**
 * SearchSidebarSubmitContainer.jsx
 * Created by Kevin Li 12/21/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { areFiltersEqual } from 'helpers/searchHelper';
import SearchSidebarSubmit from 'components/search/SearchSidebarSubmit';
import { initialState, initialStateFY } from 'redux/reducers/search/searchFiltersReducer';
import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';
import { clearAllFilters as clearStagedFilters } from 'redux/actions/search/searchFilterActions';
import { resetMapLegendToggle } from 'redux/actions/search/mapLegendToggleActions';
import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from './helpers/searchAnalytics';
import { usePrevious } from "../../helpers";

const combinedActions = Object.assign(
    {},
    appliedFilterActions,
    { clearStagedFilters },
    { resetMapLegendToggle }
);

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    requestsComplete: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    clearStagedFilters: PropTypes.func,
    resetNaicsTree: PropTypes.func,
    resetMapLegendToggle: PropTypes.func,
    setAppliedFilterCompletion: PropTypes.func,
    resetAppliedFilters: PropTypes.func,
    setShowMobileFilters: PropTypes.func
};

const SearchSidebarSubmitContainer = (props) => {
    const [filtersChanged, setFiltersChanged] = useState(false);
    const prevProps = usePrevious(props);

    const areStagedFiltersEmpty = () => areFiltersEqual(props.stagedFilters, initialState) || areFiltersEqual(props.stagedFilters, initialStateFY);

    const compareStores = () => {
    // we need to do a deep equality check by comparing every store key
        const storeKeys = Object.keys(props.stagedFilters);
        if (storeKeys.length !== Object.keys(props.appliedFilters).length) {
            // key lengths do not match, there's a difference so fail immediately
            return false;
        }
        return areFiltersEqual(props.stagedFilters, props.appliedFilters);
    };

    const resetFilters = () => {
        props.clearStagedFilters();
        props.resetAppliedFilters();
        props.resetMapLegendToggle();
    };

    const stagingChanged = () => {
    // do a deep equality check between the staged filters and applied filters
        if (!compareStores()) {
            setFiltersChanged(true);
        }
        else if (filtersChanged) {
            setFiltersChanged(false);
        }
    };

    const applyStagedFilters = () => {
        props.setAppliedFilterCompletion(false);

        if (areFiltersEqual(props.stagedFilters)) {
            resetFilters();
        }
        else {
            props.applyStagedFilters(props.stagedFilters);
            props.setAppliedFilterCompletion(true);
        }
        setFiltersChanged(false);

        const events = convertFiltersToAnalyticEvents(props.stagedFilters);
        sendAnalyticEvents(events);
        sendFieldCombinations(events);
    };

    useEffect(() => {
        const areStagedAndAppliedFiltersEquivalent = (
            areFiltersEqual(props.stagedFilters, prevProps?.stagedFilters) &&
            areFiltersEqual(props.appliedFilters, prevProps?.appliedFilters)
        );
        if (!areStagedAndAppliedFiltersEquivalent) {
            stagingChanged();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.stagedFilters, props.appliedFilters]);

    return (
        <SearchSidebarSubmit
            stagedFiltersAreEmpty={areStagedFiltersEmpty()}
            filtersChanged={filtersChanged}
            requestsComplete={props.requestsComplete}
            applyStagedFilters={applyStagedFilters}
            resetFilters={resetFilters}
            setShowMobileFilters={props.setShowMobileFilters} />
    );
};

SearchSidebarSubmitContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        requestsComplete: state.appliedFilters._complete,
        isEmpty: state.appliedFilters._empty,
        stagedFilters: state.filters,
        appliedFilters: state.appliedFilters.filters
    }),
    (dispatch) => ({
        ...bindActionCreators(Object.assign(
            {},
            combinedActions
        ),
        dispatch)
    })
)(SearchSidebarSubmitContainer);

