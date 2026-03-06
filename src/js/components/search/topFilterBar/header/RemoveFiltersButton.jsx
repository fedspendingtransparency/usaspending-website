import { Button } from "data-transparency-ui";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import { areFiltersEqual } from "helpers/searchHelper";
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

const propTypes = { appliedFilters: PropTypes.object };

const RemoveFiltersButton = ({ appliedFilters }) => {
    const dispatch = useDispatch();
    const stagedFilters = useSelector((state) => state.filters);

    // TODO: change these icons to font awesome 7
    const closeIcon = useMemo(() => (<FontAwesomeIcon icon="times" />), []);
    const emptyFilters = areFiltersEqual(stagedFilters);
    const equalFilters = areFiltersEqual(stagedFilters, appliedFilters);

    if (equalFilters) return (<></>);

    const removeOnClick = () => {
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
    };
    const removeOnKeyUp = (e) => {
        e.persist();
        if (e.key === 'Enter') removeOnClick();
    };

    return (
        <Button
            onClick={removeOnClick}
            onKeyUp={removeOnKeyUp}
            copy="Remove elected filters"
            buttonTitle="filter modal"
            buttonSize="sm"
            buttonType="text"
            backgroundColor="light"
            imageAlignment="right"
            image={closeIcon} />
    );
};

RemoveFiltersButton.propTypes = propTypes;
export default RemoveFiltersButton;
