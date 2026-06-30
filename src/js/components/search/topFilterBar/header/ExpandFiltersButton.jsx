import { Button } from "data-transparency-ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Analytics from "../../../../helpers/analytics/Analytics";

const logExpandEvent = (type) => {
    Analytics.event({
        category: "Advanced Search - Active Filters",
        action: `${type} Filters`
    });
};

const propTypes = {
    appliedFilters: PropTypes.object,
    expandedFilters: PropTypes.bool,
    setExpandedFilters: PropTypes.func
};

const ExpandFiltersButton = ({ appliedFilters, expandedFilters, setExpandedFilters }) => {
    const [needExpandButton, setNeedExpandButton] = useState(false);

    const chevronIcon = useMemo(() => (
        <FontAwesomeIcon icon={expandedFilters ? "chevron-up" : "chevron-down"} />
    ), [expandedFilters]);

    const onClick = useCallback(() => setExpandedFilters((prevState) => {
        logExpandEvent(!prevState ? "Expand" : "Collapse");

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
