import React, { useMemo } from "react";
import { Button } from "data-transparency-ui";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { areFiltersEqual } from "helpers/searchHelper";
import {
    applyStagedFilters, resetAppliedFilters, setAppliedFilterCompletion
} from "redux/actions/search/appliedFilterActions";
import { clearAllFilters as clearStagedFilters } from "../../../../redux/actions/search/searchFilterActions";
import { resetMapLegendToggle } from "../../../../redux/actions/search/mapLegendToggleActions";

const propTypes = {
    filterCount: PropTypes.number,
    expandedFilters: PropTypes.bool,
    setExpandedFilters: PropTypes.func
};

const BarHeaderBelow = ({ filterCount, expandedFilters, setExpandedFilters }) => {
    const dispatch = useDispatch();
    const stagedFilters = useSelector((state) => state.filters);
    const appliedFilters = useSelector((state) => state.appliedFilters.filters);

    const equalFilters = areFiltersEqual(stagedFilters, appliedFilters);
    const emptyFilters = areFiltersEqual(stagedFilters);

    // TODO: change these icons to font awesome 7
    const closeIcon = useMemo(() => (<FontAwesomeIcon icon="times" />), []);
    const chevronIcon = useMemo(() => (
        <FontAwesomeIcon icon={expandedFilters ? "chevron-up" : "chevron-down"} />
    ), [expandedFilters]);

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
    };
    const removeOnKeyUp = (e) => {
        e.persist();
        if (e.key === 'Enter') removeOnClick();
    };

    const collapseOnClick = () => setExpandedFilters((prevState) => !prevState);
    const collapseOnKeyUp = (e) => {
        e.persist();
        if (e.key === 'Enter') collapseOnClick();
    };

    return (
        <div className="below-line">
            <h2
                className="header-title"
                id="top-filter-bar-title">
                {`${filterCount} Active Filter${filterCount !== 1 ? 's' : ''}:`}
            </h2>
            <div className="filter-buttons">
                { /* TODO: change this state to if filters equal */ }
                { !equalFilters && (
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
                )}
                <Button
                    onClick={collapseOnClick}
                    onKeyUp={collapseOnKeyUp}
                    copy={`${expandedFilters ? "Collapse" : "Expand"} active filters`}
                    buttonTitle="filter modal"
                    buttonSize="sm"
                    buttonType="text"
                    backgroundColor="light"
                    imageAlignment="right"
                    image={chevronIcon} />
            </div>
        </div>
    );
};

BarHeaderBelow.propTypes = propTypes;
export default BarHeaderBelow;
