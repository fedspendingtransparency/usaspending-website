import { Button } from "data-transparency-ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { logExpandEvent } from 'containers/search/helpers/searchEvents';

const propTypes = {
    appliedFilters: PropTypes.object,
    expandedFilters: PropTypes.bool,
    setExpandedFilters: PropTypes.func
};

const ExpandFiltersButton = ({ appliedFilters, expandedFilters, setExpandedFilters }) => {
    const [needExpandButton, setNeedExpandButton] = useState(false);

    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);

    const chevronIcon = useMemo(() => (
        <FontAwesomeIcon icon={expandedFilters ? "chevron-up" : "chevron-down"} />
    ), [expandedFilters]);

    const onClick = useCallback(() => setExpandedFilters((prevState) => {
        logExpandEvent(!prevState ? "Expand" : "Collapse", isSearchActive);

        return !prevState;
    }), [setExpandedFilters]);

    const onKeyUp = useCallback((e) => {
        e.persist();
        if (e.key === 'Enter') onClick();
    }, [onClick]);

    useEffect(() => {
        setNeedExpandButton(
            document
                .querySelector(".search-top-filters-content")
                ?.offsetHeight > 124
        );
    }, [appliedFilters]);

    if (!needExpandButton) return (<></>);

    return (
        <Button
            onClick={onClick}
            onKeyUp={onKeyUp}
            copy={`${expandedFilters ? "Collapse" : "Expand"} active filters`}
            buttonTitle="filter modal"
            buttonSize="sm"
            buttonType="text"
            backgroundColor="light"
            imageAlignment="right"
            image={chevronIcon} />
    );
};

ExpandFiltersButton.propTypes = propTypes;
export default ExpandFiltersButton;
