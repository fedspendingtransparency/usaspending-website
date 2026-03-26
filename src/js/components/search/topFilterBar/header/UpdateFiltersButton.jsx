import { Button } from "data-transparency-ui";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import { areFiltersEqual } from "helpers/searchHelper";
import Analytics from "helpers/analytics/Analytics";
import {
    applyStagedFilters,
    resetAppliedFilters,
    setAppliedFilterCompletion
} from "redux/actions/search/appliedFilterActions";
import { clearAllFilters as clearStagedFilters } from "redux/actions/search/searchFilterActions";
import { resetMapLegendToggle } from "redux/actions/search/mapLegendToggleActions";
import {
    convertFiltersToAnalyticEvents,
    sendAnalyticEvents,
    sendFieldCombinations
} from "containers/search/helpers/searchAnalytics";

const logUpdateEvent = () => {
    Analytics.event({
        category: "Advanced Search - Active Filters",
        action: `Update Filters`
    });
};

const propTypes = { appliedFilters: PropTypes.object };

const UpdateFiltersButton = ({ appliedFilters }) => {
    const dispatch = useDispatch();
    const stagedFilters = useSelector((state) => state.filters);

    const closeIcon = useMemo(() => (<FontAwesomeIcon icon="times" />), []);
    const emptyFilters = areFiltersEqual(stagedFilters);
    const equalFilters = areFiltersEqual(stagedFilters, appliedFilters);

    const onClick = useCallback(() => {
        dispatch(setAppliedFilterCompletion(false));

        if (emptyFilters) {
            dispatch(clearStagedFilters());
            dispatch(resetAppliedFilters());
            dispatch(resetMapLegendToggle());
        }
        else if (!equalFilters) {
            dispatch(applyStagedFilters(stagedFilters));
            dispatch(setAppliedFilterCompletion(true));
        }

        const events = convertFiltersToAnalyticEvents(stagedFilters);
        sendAnalyticEvents(events);
        sendFieldCombinations(events, "Advanced Search - Active Filters");
        logUpdateEvent();
    }, [dispatch, emptyFilters, equalFilters, stagedFilters]);

    const onKeyUp = useCallback((e) => {
        e.persist();
        if (e.key === 'Enter') onClick();
    }, [onClick]);

    if (equalFilters) return (<></>);

    return (
        <Button
            onClick={onClick}
            onKeyUp={onKeyUp}
            copy="Update selected filters"
            buttonTitle="filter modal"
            buttonSize="sm"
            buttonType="text"
            backgroundColor="light"
            imageAlignment="right"
            image={closeIcon} />
    );
};

UpdateFiltersButton.propTypes = propTypes;
export default UpdateFiltersButton;
